const Commande = require("../models/commande.model.js");

// Create and Save a new commande
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a commande
    const commande = new Commande({
      email: req.body.email,
      name: req.body.name,
      active: req.body.active
    });
  
    // Save commande in the database
    Commande.create(commande, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the commande."
        });
      else res.send(data);
    });
  };

// Retrieve all commandes from the database.
exports.findAll = (req, res) => {
    Commande.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Commandes."
        });
      else res.send(data);
    });
  };

// Find a single commande with a commandeId
exports.findOne = (req, res) => {
    Commande.findById(req.params.commandeId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found commande with id ${req.params.commandeId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving commande with id " + req.params.commandeId
          });
        }
      } else res.send(data);
    });
  };

// Update a commande identified by the commandeId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    Commande.updateById(
      req.params.commandeId,
      new Commande(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found commande with id ${req.params.commandeId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating commande with id " + req.params.commandeId
            });
          }
        } else res.send(data);
      }
    );
  };

// Delete a commande with the specified commandeId in the request
exports.delete = (req, res) => {
    Commande.remove(req.params.commandeId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found commande with id ${req.params.commandeId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete commande with id " + req.params.commandeId
          });
        }
      } else res.send({ message: `commande was deleted successfully!` });
    });
  };

// Delete all commandes from the database.
exports.deleteAll = (req, res) => {
  Commande.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Commandes."
      });
    else res.send({ message: `All Commandes were deleted successfully!` });
  });
};