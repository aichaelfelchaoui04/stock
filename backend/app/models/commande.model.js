const sql = require("./db.js");

// constructor
const Commande = function(commande) {
  this.desc_fact = commande.desc_fact;
  this.date = commande.date;
  this.qte = commande.qte;
  this.Num_Article = commande.Num_Article;

};

Commande.create = (newCommande, result) => {
  sql.query("INSERT INTO commande SET ?", newCommande, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created commande: ", { id: res.insertId, ...newCommande });
    result(null, { id: res.insertId, ...newCommande });
  });
};

Commande.findById = (commandeId, result) => {
  sql.query(`SELECT * FROM commande WHERE id = ${commandeId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found commande: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found commande with the id
    result({ kind: "not_found" }, null);
  });
};

Commande.getAll = result => {
  sql.query("SELECT * FROM commande", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("commande: ", res);
    result(null, res);
  });
};

Commande.updateById = (id, commande, result) => {
  sql.query(
    "UPDATE commande SET desc_fact = ?, date = ?, qte = ? ,Num_Article = ? WHERE id = ?",
    [commande.desc_fact, commande.date, commande.qte, commande.Num_Article, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found commande with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated commande: ", { id: id, ...commande });
      result(null, { id: id, ...commande });
    }
  );
};

Commande.remove = (id, result) => {
  sql.query("DELETE FROM commande WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found commande with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted commande with id: ", id);
    result(null, res);
  });
};

Commande.removeAll = result => {
  sql.query("DELETE FROM commande", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} commande`);
    result(null, res);
  });
};

module.exports = Commande;