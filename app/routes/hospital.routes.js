
var express = require('express');
var router = express.Router();
const Hospital = require("../models/hospital.model.js");
var md5 = require('md5');

router.post('/hospital_login', function(req, res, next) {
  Hospital.login(req.body.user_name,md5(req.body.password),(err, data) => {
    if (err){
      res.redirect('/login');
    } else {
      req.session.loggedin = true;
			req.session.username = req.body.user_name;
      res.redirect('/corona_order_web');
    }
    res.end();

  });
});

router.post('/hospital_register', function(req, res, next) {
  const newHospital = new Hospital({
    password: md5(req.body.password) ,
    user_name: req.body.user_name,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
  });
  Hospital.register(newHospital,(err, data) => {
    if (err)
    res.redirect('/register');
    else
    res.redirect('/login');
  });
  res.end();

});
module.exports = router;
