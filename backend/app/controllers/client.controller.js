const Client = require("../models/client.model.js");

// Create and Save a new Client
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Client
    const client = new Client({
      email: req.body.email,
      name: req.body.name,
      active: req.body.active,
      phone : req.body.phone,
      adresse : req.body.adresse
    });
  
    // Save Client in the database
    Client.create(client, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Client."
        });
      else res.send(data);
    });
};

// Retrieve all Clients from the database.
exports.findAll = (req, res) => {
  Client.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving clients."
      });
    else res.send(data);
  });
};

// Find a single Client with a ClientId
exports.findOne = (req, res) => {
  Client.findById(req.params.clientId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found client with id ${req.params.clientId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving client with id " + req.params.clientId
        });
      }
    } else res.send(data);
  });
};

// Update a Client identified by the ClientId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Client.updateById(
    req.params.clientId,
    new client(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found client with id ${req.params.clientId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating client with id " + req.params.clientId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Client with the specified ClientId in the request
exports.delete = (req, res) => {
  Client.remove(req.params.clientId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found client with id ${req.params.clientId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete client with id " + req.params.clientId
        });
      }
    } else res.send({ message: `client was deleted successfully!` });
  });
};

// Delete all Clients from the database.
exports.deleteAll = (req, res) => {
  Client.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Clients."
      });
    else res.send({ message: `All Clients were deleted successfully!` });
  });
};