module.exports = app => {
  const orders = require("../controllers/conronaOrder.controller.js");

  // login
  app.post("/corona_order/add", orders.add);

};
