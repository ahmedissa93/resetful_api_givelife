const User = require("../models/user.model.js");
var md5 = require('md5');

// Create and Save a new Customer
exports.login = (req, res) => {
  if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    // Create a Customer
    const user = new User({
      password: md5(req.body.password) ,
      national_id: req.body.national_id,
    });
    // exports.findOne = (req, res) => {
      // login user in the database
      User.login(req.body.national_id,md5(req.body.password), (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while login."
          });

        else
        res.send({'data':data,'status':200});
      });
  // };
};
exports.getUsers = (req, res) => {
  if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
};
// Create and Save a new User
exports.register = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Customer
  const user = new User({
    password: md5(req.body.password) ,
    national_id: req.body.national_id,
    age: req.body.age,
    name: req.body.name,
    phone: req.body.phone,
    group_id: 2,
  });
  // Save User in the database
  User.register(user, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    else res.send({'data':data,'status':200});
  });
};
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  console.log(req.body)
  User.updateById(
    req.body.id,
    req.body.name,
    req.body.phone,
    req.body.age,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Order Status with id ${req.body.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Status with id " + req.body.id
          });
        }
      } else res.send({"data":data,"status":200});
    }
  );
};
