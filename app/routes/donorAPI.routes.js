module.exports = app => {
  const donors = require("../controllers/donors.controller.js");
  // create New Order
  app.post("/donors/add", donors.add);

  //get all
  app.get("/donors", donors.findAll);

};
