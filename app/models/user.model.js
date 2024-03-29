const sql = require("./dbConnection.js");
// constructor
const User = function(user) {
  this.password = user.password;
  this.national_id = user.national_id;
  this.name = user.name;
  this.age = user.age;
  this.phone = user.phone;
  this.group_id = user.group_id;
};

//login
User.login = (national_id,password, result) => {
  sql.query(`SELECT * FROM users WHERE national_id='${national_id}' and password='${password}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
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

//register
User.register = (newUser, result) => {
  sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created user: ", { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });
};
User.updateById = (id, name , phone , age, result) => {
  sql.query(
    "UPDATE users SET name = ?  , phone = ? , age = ? WHERE id = ?",
    [name , phone , age , id],
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
module.exports = User;
