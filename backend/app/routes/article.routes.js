module.exports = app => {
    const articles = require("../controllers/article.controller.js");
  
    // Create a new Customer
    app.post("/articles", articles.create);
  
    // Retrieve all articles
    app.get("/articles", articles.findAll);
  
    // Retrieve a single Customer with customerId
    app.get("/articles/:customerId", articles.findOne);
  
    // Update a Customer with customerId
    app.put("/articles/:customerId", articles.update);
  
    // Delete a Customer with customerId
    app.delete("/articles/:customerId", articles.delete);
  
    // Create a new Customer
    app.delete("/articles", articles.deleteAll);
  };