const sql = require("./dbConnection.js");
// constructor
const Donor = function(donor) {
  this.name = donor.name;
  this.file_number = donor.file_number;
  this.phone = donor.phone;
  this.blood_type = donor.blood_type;
  this.status = donor.status;
  this.hospital_id = donor.hospital_id;
};
Donor.add = (newDonor, result) => {
  sql.query("INSERT INTO donors SET ?", newDonor, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created donors: ", { id: res.insertId, ...newDonor });
    result(null, { id: res.insertId, ...newDonor });
  });
};
Donor.getAll = result => {
  sql.query("SELECT  donors.id , .donors.name ,  donors.phone , donors.file_number , donors.blood_type ,hospitals.name as hospital_name  FROM donors join hospitals on hospitals.id = donors.hospital_id where status ='approve' ", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }


    result(null, res);
  });
};
Donor.getAllForAdmin = result => {
  sql.query("SELECT  donors.id , .donors.name ,  donors.phone , donors.file_number , donors.blood_type , donors.status ,hospitals.name as hospital_name  FROM donors join hospitals on hospitals.id = donors.hospital_id", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }


    result(null, res);
  });
};
Donor.getAllByHospital = (id,result) =>{
  sql.query("SELECT  donors.id , .donors.name ,  donors.phone , donors.file_number , donors.status , donors.blood_type ,hospitals.name as hospital_name  FROM donors join hospitals on hospitals.id = donors.hospital_id where donors.hospital_id = ?",id ,(err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }


    result(null, res);
  });
};
Donor.changeStatus = (id, status, result) => {
  sql.query(
    "UPDATE donors SET status = ? WHERE id = ?",
    [status, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated order status: ", { id: id });
      result(null, { id: id});
    }
  );
};
module.exports = Donor;
