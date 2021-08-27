const Fournisseur = require("../models/fournisseur.model.js");

// Create and Save a new fournisseur
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a fournisseur
    const fournisseur = new Fournisseur({
      code: req.body.code,
      societe: req.body.societe,
      ICE: req.body.ICE,
      contact_num: req.body.contact_num,
      contact_email: req.body.contact_emailE

    });
  
    // Save fournisseur in the database
    Fournisseur.create(fournisseur, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the fournisseur."
        });
      else res.send(data);
    });
  };

// Retrieve all fournisseurs from the database.
exports.findAll = (req, res) => {
    Fournisseur.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving fournisseurs."
        });
      else res.send(data);
    });
  };

// Find a single fournisseur with a fournisseurId
exports.findOne = (req, res) => {
    Fournisseur.findById(req.params.fournisseurId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found fournisseur with id ${req.params.fournisseurId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving fournisseur with id " + req.params.fournisseurId
          });
        }
      } else res.send(data);
    });
  };

// Update a fournisseur identified by the fournisseurId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    Fournisseur.updateById(
      req.params.fournisseurId,
      new Fournisseur(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found fournisseur with id ${req.params.fournisseurId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating fournisseur with id " + req.params.fournisseurId
            });
          }
        } else res.send(data);
      }
    );
  };

// Delete a fournisseur with the specified fournisseurId in the request
exports.delete = (req, res) => {
    Fournisseur.remove(req.params.fournisseurId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found fournisseur with id ${req.params.fournisseurId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete fournisseur with id " + req.params.fournisseurId
          });
        }
      } else res.send({ message: `fournisseur was deleted successfully!` });
    });
  };

// Delete all fournisseurs from the database.
exports.deleteAll = (req, res) => {
  Fournisseur.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all fournisseurs."
      });
    else res.send({ message: `All fournisseurs were deleted successfully!` });
  });
};