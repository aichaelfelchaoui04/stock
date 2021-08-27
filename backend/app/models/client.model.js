const sql = require("./db.js");

// constructor
const Client = function(client) {
  this.email = client.email;
  this.name = client.name;
  this.phone = client.phone;
  this.adresse = client.adresse;
};

Client.create = (newClient, result) => {
  sql.query("INSERT INTO client SET ?", newClient, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created client: ", { id: res.insertId, ...newClient });
    result(null, { id: res.insertId, ...newClient });
  });
};

Client.findById = (clientId, result) => {
  sql.query(`SELECT * FROM client WHERE id = ${clientId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found client: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found client with the id
    result({ kind: "not_found" }, null);
  });
};

Client.getAll = result => {
  sql.query("SELECT * FROM client", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("clients: ", res);
    result(null, res);
  });
};

Client.updateById = (id, client, result) => {
  sql.query(
    "UPDATE client SET name = ?, adresse = ?, email = ?, phone = ? WHERE id = ?",
    [client.name, client.adresse, client.email, client.phone, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found client with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated client: ", { id: id, ...client });
      result(null, { id: id, ...client });
    }
  );
};

Client.remove = (id, result) => {
  sql.query("DELETE FROM client WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found client with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted client with id: ", id);
    result(null, res);
  });
};

Client.removeAll = result => {
  sql.query("DELETE FROM client", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} clients`);
    result(null, res);
  });
};

module.exports = Client;