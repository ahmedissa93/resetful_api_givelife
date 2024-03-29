var express = require('express');
var router = express.Router();
const BloodDonations = require("../models/BloodDonations.model.js");

router.get('/', function(req, res, next) {
  if (req.session.isAdmin){
    BloodDonations.getAll((err, data) => {
      if (err)
        res.render('blood_donations',{data:err});
      else
      res.render('blood_donations',{data:data,'status':200});
    });
  }else{
    BloodDonations.findByAllId(req.session.user_id,(err, data) => {
      if (err)
        res.render('blood_donations',{data:err});
      else
      res.render('blood_donations',{data:data,'status':200});
    });
  }

});
router.get('/approve/(:id)', function(req, res, next) {
  let id = req.params.id;
  BloodDonations.changeStatus(id,'approve',(err, data) => {
    if (err)
    res.redirect('/bloodDonations')
    else
     req.flash('success', "Approve Successfully");
     res.redirect('/bloodDonations')
  });

});
module.exports = router;
