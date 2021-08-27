module.exports = app => {
  const client = require("../controllers/client.controller.js");

  // Create a new client
  app.post("/client", client.create);

  // Retrieve all client
  app.get("/client", client.findAll);

  // Retrieve a single client with clientId
  app.get("/client/:clientId", client.findOne);

  // Update a client with clientId
  app.put("/client/:clientId", client.update);

  // Delete a client with clientId
  app.delete("/client/:clientId", client.delete);

  // Create a new client
  app.delete("/client", client.deleteAll);
};