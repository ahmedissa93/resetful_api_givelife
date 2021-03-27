const sql = require("./dbConnection.js");
// constructor
const BloodDonations = function(blood) {
  this.user_id = blood.user_id;
  this.hospital_id = blood.hospital_id;
  this.date = blood.date;
  this.time = blood.time;
  this.blood_type = blood.blood_type;
};
//new order
BloodDonations.add = (newBlood, result) => {
  sql.query("INSERT INTO bloodـdonations SET ?", newBlood, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created BloodDonations: ", { id: res.insertId, ...newBlood });
    result(null, { id: res.insertId, ...newBlood });
  });
};
//get all order
BloodDonations.getAll = result => {
  sql.query("SELECT users.id , bloodـdonations.id as order_id ,bloodـdonations.blood_type,bloodـdonations.date,bloodـdonations.time ,name , age , phone , national_id  FROM bloodـdonations join users on users.id = bloodـdonations.user_id", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("BloodDonations: ", res);
    result(null, res);
  });
};
BloodDonations.updateById = (id, blood, result) => {
  console.log(BloodDonations);
  sql.query(
    "UPDATE bloodـdonations SET status = ? WHERE id = ?",
    [order.status, id],
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

      console.log("updated BloodDonations status: ", { id: id, ...blood });
      result(null, { id: id, ...order });
    }
  );
};

BloodDonations.remove = (id, result) => {
  sql.query("DELETE FROM bloodـdonations WHERE id = ?", id, (err, res) => {
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

    console.log("deleted order with id: ", id);
    result(null, res);
  });
};
//get all order
BloodDonations.statistics_count = result => {
  sql.query("SELECT COUNT(*) as count_donations FROM bloodـdonations", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("statistics: ", res);
    result(null, res);
  });
};

//get all order
BloodDonations.statisticsTopDonation = result => {
  sql.query("SELECT COUNT(bloodـdonations.user_id) as count_donations , bloodـdonations.blood_type , users.name  FROM bloodـdonations join users on users.id = bloodـdonations.user_id GROUP BY bloodـdonations.user_id", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("statistics: ", res);
    result(null, res);
  });
};

//get all order
BloodDonations.findByAllId = (id,result) => {
  sql.query("SELECT users.id , bloodـdonations.id as order_id ,bloodـdonations.blood_type,bloodـdonations.date,bloodـdonations.time ,name , age , phone , national_id  FROM bloodـdonations join users on users.id = bloodـdonations.user_id WHERE bloodـdonations.hospital_id = ? ",id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("BloodDonations: ", res);
    result(null, res);
  });
};
module.exports = BloodDonations;
