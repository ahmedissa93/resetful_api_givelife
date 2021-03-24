const sql = require("./dbConnection.js");
// constructor
const hospitals = function(hospital) {
  this.name = hospital.name;
  this.user_name = hospital.user_name;
  this.email = hospital.email;
  this.password = hospital.password;
  this.phone = hospital.phone;
  this.location = hospital.location;
};
//new order
hospitals.add = (newHospital, result) => {
  sql.query("INSERT INTO hospitals SET ?", newHospital, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created hospitals: ", { id: res.insertId, ...newHospital });
    result(null, { id: res.insertId, ...newHospital });
  });
};
//get all order
hospitals.login = (user_name,password, result)  => {
  sql.query(`SELECT * FROM hospitals WHERE user_name='${user_name}' and password='${password}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }
    if (res.length == 0 )
        console.log("not found user");
        result("user:", "not found user");
        return;
  });
};
hospitals.updateById = (id, blood, result) => {
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

hospitals.remove = (id, result) => {
  sql.query("DELETE FROM hospitals WHERE id = ?", id, (err, res) => {
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

//register
hospitals.register = (newhowpitcal, result) => {
  sql.query("INSERT INTO hospitals SET ?", newhowpitcal, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created hospitals: ", { id: res.insertId, ...newhowpitcal });
    result(null, { id: res.insertId, ...newhowpitcal });
  });
};
module.exports = hospitals;
