module.exports = app => {
  const orders = require("../controllers/conronaOrder.controller.js");
  // create New Order
  app.post("/corona_order/add", orders.add);

  // Retrieve all Order 
  app.get("/corona_orders", orders.findAll);

  // Retrieve a single Order with orderId
  app.get("/corona_orders/:orderId", orders.findOne);

  // Update a Customer with orderId
  app.put("/corona_orders/:orderId", orders.update);

  // Delete a Order with orderId
  app.delete("/corona_orders/:orderId", orders.delete);

};
