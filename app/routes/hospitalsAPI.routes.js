module.exports = app => {
  const Hospital = require("../models/hospital.model.js");
  app.get('/getHospitals', function(req, res, next) {
    Hospital.getHospitals((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving customers."
        });
      else res.send({'data':data,'status':200});
    });

  });
};
