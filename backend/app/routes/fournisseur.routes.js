module.exports = app => {
    const fournisseur = require("../controllers/fournisseur.controller.js");
  
    // Create a new Customer
    app.post("/fournisseur", fournisseur.create);
  
    // Retrieve all fournisseur
    app.get("/fournisseur", fournisseur.findAll);
  
    // Retrieve a single Customer with customerId
    app.get("/fournisseur/:customerId", fournisseur.findOne);
  
    // Update a Customer with customerId
    app.put("/fournisseur/:customerId", fournisseur.update);
  
    // Delete a Customer with customerId
    app.delete("/fournisseur/:customerId", fournisseur.delete);
  
    // Create a new Customer
    app.delete("/fournisseur", fournisseur.deleteAll);
  };