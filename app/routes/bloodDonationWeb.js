var express = require('express');
var router = express.Router();
const BloodDonations = require("../models/BloodDonations.model.js");

router.get('/', function(req, res, next) {
  BloodDonations.getAll((err, data) => {
    if (err)
      res.render('blood_donations',{data:err});
    else
    res.render('blood_donations',{data:data,'status':200});
  });
});

module.exports = router;