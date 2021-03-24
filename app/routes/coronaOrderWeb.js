var express = require('express');
var router = express.Router();
const Order = require("../models/corona_order.model.js");

router.get('/', function(req, res, next) {
  Order.getAll((err, data) => {
    if (err)
      res.render('corona_order',{data:err});
    else
     res.render('corona_order',{data:data,'status':200});
  });
});

module.exports = router;
