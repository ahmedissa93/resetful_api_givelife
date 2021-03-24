module.exports = app => {
  const bloodDonations = require("../controllers/bloodDonations.controller.js");
  // create New Order
  app.post("/blood_donations/add", bloodDonations.add);

  // Retrieve all Order
  app.get("/blood_donations", bloodDonations.findAll);

  // Retrieve a single Order with orderId
  app.get("/blood_donations/:orderId", bloodDonations.findOne);

  // Update a Customer with orderId
  app.put("/blood_donations/:orderId", bloodDonations.update);

  // Delete a Order with orderId
  app.delete("/blood_donations/:orderId", bloodDonations.delete);

  // Retrieve statistics_count
  app.get("/statistics_count", bloodDonations.statistics_count);

  // Retrieve statisticsTopDonation

  app.get("/statisticsTopDonation", bloodDonations.statisticsTopDonation);
};
