const Hospital = require("../models/hospital.model.js");
var md5 = require('md5');

// Create and Save a new Customer
exports.login = (req, res) => {
  if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    const hospital = new Hospital({
      password: md5(req.body.password) ,
      user_name: req.body.user_name,
    });
    // exports.findOne = (req, res) => {
      Hospital.login(req.body.user_name,md5(req.body.password), (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while login."
          });

        else
        res.redirect('/');

        res.end();

        // res.send({'data':data,'status':200});
      });
  // };
};
