
var express = require('express');
var router = express.Router();
const Hospital = require("../models/hospital.model.js");
var md5 = require('md5');

router.post('/hospital_login', function(req, res, next) {
  // console.log(req.body.user_name);
  Hospital.login(req.body.user_name,md5(req.body.password),(err, data) => {
    if (err){
      req.flash('error', "username and password wrong");
      res.redirect('/login');
    } else {
      req.session.loggedin = true;
      req.session.user_id = data.id;
			req.session.username = req.body.user_name;
			req.session.isAdmin = data.isAdmin;
      res.locals.isAdmin = data.isAdmin;
      res.locals.user = req.session.username;

      req.flash('success', "Login Successfully");

      res.redirect('/corona_order_web');
    }
    res.end();
  //
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
router.get('/', function(req, res, next) {
  Hospital.getAll((err, data) => {
    if (err)
      res.render('hospitals',{data:err});
    else
     res.render('hospitals',{data:data});
  });

});
router.get('/add', function(req, res, next) {
  res.render('add_hospital');
  res.end();

});
router.post('/store_hospital', function(req, res, next) {
  const newHospital = new Hospital({
    password: md5(req.body.password) ,
    user_name: req.body.user_name,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
  });
  Hospital.add(newHospital,(err, data) => {
    // res.send(err)
    if (err)
    res.render('add_hospital',{data:err});
    else
    req.flash('success', 'hospital successfully added');
    res.redirect('/hospital');
  });
});
router.get('/delete_hospital/(:id)', function(req, res, next) {
  let id = req.params.id;

  Hospital.remove(id,(err, data) => {
    // res.send(err)
    if (err)
    res.render('add_hospital',{data:err});
    else
    req.flash('success', 'hospital successfully deleted');
    res.redirect('/hospital');
  });
});
module.exports = router;
