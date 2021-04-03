var express = require('express');
var router = express.Router();
const Donor = require("../models/Donors.model.js");
router.get('/', function(req, res, next) {
  if (req.session.isAdmin){
    Donor.getAllForAdmin((err, data) => {
      // res.send(err);
      if (err)
        res.render('donorsList',{data:err});
      else
       res.render('donorsList',{data:data,'status':200});
    });
  }else{
    Donor.getAllByHospital(req.session.user_id,(err, data) => {
      if (err)
        res.render('donorsList',{data:err});
      else
       res.render('donorsList',{data:data,'status':200});
    });
  }

});
router.get('/approve/(:id)', function(req, res, next) {
  let id = req.params.id;
  Donor.changeStatus(id,'approve',(err, data) => {
    if (err)
    res.redirect('/getDonors')
    else
     req.flash('success', "Approve Successfully");
     res.redirect('/getDonors')
  });
});
module.exports = router;
