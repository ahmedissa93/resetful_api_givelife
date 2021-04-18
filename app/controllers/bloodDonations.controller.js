const BloodDonations = require("../models/BloodDonations.model.js");

// Create and Save a new order
exports.add = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Customer
  const bloodDonations = new BloodDonations({
    user_id: req.body.user_id,
    hospital_id: req.body.hospital_id,
    time: req.body.time,
    date: req.body.date,
    blood_type: req.body.blood_type,
  });
  console.log(bloodDonations);
  // Save User in the database
  BloodDonations.add(bloodDonations, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the bloodDonations."
      });
    else res.send({'data':data,'status':200});
  });
};
// Retrieve all Order from the database.
exports.findAll = (req, res) => {
  BloodDonations.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving bloodDonations."
      });
    else res.send({'data':data,'status':200});
  });
};
// Find a single Order with a orderId
exports.findOne = (req, res) => {
  BloodDonations.findByUserId(req.params.orderId, (err, data) => {
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
    } else res.send({"data":data,"status":200});;
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
  BloodDonations.updateById(
    req.params.orderId,
    new bloodDonations(req.body),
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
  BloodDonations.remove(req.params.orderId, (err, data) => {
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
// Retrieve all Order from the database.
exports.statistics_count = (req, res) => {
  BloodDonations.statistics_count((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving bloodDonations."
      });
    else res.send({'data':data[0],'status':200});
  });
};
// Retrieve all Order from the database.
exports.statisticsTopDonation = (req, res) => {
  BloodDonations.statisticsTopDonation((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving bloodDonations."
      });
    else res.send({'data':data,'status':200});
  });
};
