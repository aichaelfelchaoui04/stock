const sql = require("./db.js");

// constructor
const Article = function(article) {
  this.Desc_Art = article.Desc_Art;
  this.unite = article.unite;
  this.PU_HT = article.PU_HT;
  this.TVA = article.TVA;
  this.PU_TTC = article.PU_TTC;
  this.Nom_Cat = article.Nom_Cat;
};

Article.create = (newArticle, result) => {
  sql.query("INSERT INTO article SET ?", newArticle, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created article: ", { id: res.insertId, ...newArticle });
    result(null, { id: res.insertId, ...newArticle });
  });
};

Article.findById = (articleId, result) => {
  sql.query(`SELECT * FROM article WHERE id = ${articleId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found article: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found article with the id
    result({ kind: "not_found" }, null);
  });
};

Article.getAll = result => {
  sql.query("SELECT * FROM article", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("article: ", res);
    result(null, res);
  });
};

Article.updateById = (id, article, result) => {
  sql.query(
    "UPDATE article SET Desc_Art = ?, unite = ?, PU_HT = ?, TVA = ?, PU_TTC = ?, Nom_Cat = ? WHERE id = ?",
    [article.Desc_Art, article.unite, article.PU_HT,article.TVA,article.PU_TTC,article.Nom_Cat, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found article with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated article: ", { id: id, ...article });
      result(null, { id: id, ...article });
    }
  );
};

Article.remove = (id, result) => {
  sql.query("DELETE FROM article WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found article with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted article with id: ", id);
    result(null, res);
  });
};

Article.removeAll = result => {
  sql.query("DELETE FROM article", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} article`);
    result(null, res);
  });
};

module.exports = Article;