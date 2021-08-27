module.exports = app => {
    const commande = require("../controllers/commande.controller.js");
  
    // Create a new commande
    app.post("/commande", commande.create);
  
    // Retrieve all commande
    app.get("/commande", commande.findAll);
  
    // Retrieve a single commande with commandeId
    app.get("/commande/:commandeId", commande.findOne);
  
    // Update a commande with commandeId
    app.put("/commande/:commandeId", commande.update);
  
    // Delete a commande with commandeId
    app.delete("/commande/:commandeId", commande.delete);
  
    // Create a new commande
    app.delete("/commande", commande.deleteAll);
  };