var express = require('express');
var router = express.Router();
const Order = require("../models/corona_order.model.js");
router.get('/', function(req, res, next) {
  if (req.session.isAdmin){
    Order.getAll((err, data) => {
      // res.send(err);
      if (err)
        res.render('corona_order',{data:err});
      else
       res.render('corona_order',{data:data,'status':200});
    });
  }else{
    Order.findByAllId(req.session.user_id,(err, data) => {
      // res.send(err);
      if (err)
        res.render('corona_order',{data:err});
      else
       res.render('corona_order',{data:data,'status':200});
    });
  }
});
router.get('/approve/(:id)', function(req, res, next) {
  let id = req.params.id;
  Order.changeStatus(id,'approve',(err, data) => {
    if (err)
    res.redirect('/corona_order_web')
    else
     req.flash('success', "Approve Successfully");
     res.redirect('/corona_order_web')
  });

});
module.exports = router;
