const Order = require("../models/corona_order.model.js");

// Create and Save a new order
exports.add = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Customer
  const order = new Order({
    user_id: req.body.user_id,
    hospital_id: req.body.hospital_id,
    location: req.body.location,
    status:"pending"
  });
  // Save User in the database
  Order.add(order, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    else res.send({'data':data,'status':200});
  });
};
