const Article = require("../models/article.model.js");

// Create and Save a new Article
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a article
    const article = new Article({
      email: req.body.email,
      name: req.body.name,
      active: req.body.active
    });
  
    // Save article in the database
    Article.create(article, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the article."
        });
      else res.send(data);
    });
  };

// Retrieve all Articles from the database.
exports.findAll = (req, res) => {
    Article.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Articles."
        });
      else res.send(data);
    });
  };

// Find a single Article with a ArticleId
exports.findOne = (req, res) => {
    Article.findById(req.params.articleId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found article with id ${req.params.articleId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving article with id " + req.params.articleId
          });
        }
      } else res.send(data);
    });
  };

// Update a Article identified by the ArticleId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    Article.updateById(
      req.params.articleId,
      new Article(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found article with id ${req.params.articleId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating article with id " + req.params.articleId
            });
          }
        } else res.send(data);
      }
    );
  };

// Delete a Article with the specified ArticleId in the request
exports.delete = (req, res) => {
    Article.remove(req.params.articleId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found article with id ${req.params.articleId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete article with id " + req.params.articleId
          });
        }
      } else res.send({ message: `article was deleted successfully!` });
    });
  };

// Delete all Articles from the database.
exports.deleteAll = (req, res) => {
    Article.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Articles."
        });
      else res.send({ message: `All Articles were deleted successfully!` });
    });
  };