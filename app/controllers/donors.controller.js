const Donor = require("../models/Donors.model.js");

// Create and Save a new order
exports.add = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Customer
  const donor = new Donor({
    name: req.body.name,
    hospital_id: req.body.hospital_id,
    blood_type: req.body.blood_type,
    phone: req.body.phone,
    file_number: req.body.file_number,
    status:"pending"
  });
  // Save User in the database
  Donor.add(donor, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    else res.send({'data':data,'status':200});
  });
};
// Retrieve all Order from the database.
exports.findAll = (req, res) => {
  Donor.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    else res.send({'data':data,'status':200});
  });
};
// Find a single Order with a orderId
exports.findOne = (req, res) => {
  Order.findByUserId(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Order with id ${req.params.orderId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Order with id " + req.params.orderId
        });
      }
    } else res.send({'data':data,'status':200});
  });
};
// Update a Order Status identified by the orderId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  console.log(req.body)
  Order.updateById(
    req.params.orderId,
    new Order(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Order Status with id ${req.params.orderId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Status with id " + req.params.orderId
          });
        }
      } else res.send({"data":data,"status":200});
    }
  );
};

// Delete a Order with the specified OrderId in the request
exports.delete = (req, res) => {
  Order.remove(req.params.orderId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Order with id ${req.params.orderId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Order with id " + req.params.orderId
        });
      }
    } else res.send({ message: `Customer was deleted successfully!` });
  });
};
