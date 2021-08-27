const sql = require("./db.js");

// constructor
const Category = function(category) {
  this.desc_cat = category.desc_cat;
  this.nom_cat = category.nom_cat;
};

Category.create = (newCategory, result) => {
  sql.query("INSERT INTO categorie SET ?", newCategory, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created category: ", { id: res.insertId, ...newCategory });
    result(null, { id: res.insertId, ...newcategory });
  });
};

Category.findById = (categoryId, result) => {
  sql.query(`SELECT * FROM categorie WHERE id = ${categoryId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found category: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found category with the id
    result({ kind: "not_found" }, null);
  });
};

Category.getAll = result => {
  sql.query("SELECT * FROM categorie", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("category: ", res);
    result(null, res);
  });
};

Category.updateById = (id, category, result) => {
  sql.query(
    "UPDATE category SET desc_cat = ?, nom_cat = ?WHERE id = ?",
    [category.desc_cat, category.nom_cat, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found category with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated category: ", { id: id, ...category });
      result(null, { id: id, ...category });
    }
  );
};

Category.remove = (id, result) => {
  sql.query("DELETE FROM categorie WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found category with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted category with id: ", id);
    result(null, res);
  });
};

Category.removeAll = result => {
  sql.query("DELETE FROM categorie", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} categories`);
    result(null, res);
  });
};

module.exports = Category;