const sql = require("./dbConnection.js");
// constructor
const Order = function(order) {
  this.user_id = order.user_id;
  this.hospital_id = order.hospital_id;
  this.longitude = order.longitude;
  this.latitude = order.latitude;
  this.status = order.status;
};
//new order
Order.add = (newOrder, result) => {
  sql.query("INSERT INTO corona_orders SET ?", newOrder, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created order: ", { id: res.insertId, ...newOrder });
    result(null, { id: res.insertId, ...newOrder });
  });
};
//get all order
Order.getAll = result => {
  sql.query("SELECT users.id , corona_orders.id as order_id ,name , age , phone , national_id , status  FROM corona_orders join users on users.id = corona_orders.user_id", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }


    result(null, res);
  });
};
Order.updateById = (id, order, result) => {
  console.log(order);
  sql.query(
    "UPDATE corona_orders SET status = ? WHERE id = ?",
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

      console.log("updated order status: ", { id: id, ...order });
      result(null, { id: id, ...order });
    }
  );
};

Order.remove = (id, result) => {
  sql.query("DELETE FROM corona_orders WHERE id = ?", id, (err, res) => {
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
Order.findByAllId = (id, result) => {
  sql.query("SELECT users.id , corona_orders.id as order_id ,name , age , phone , national_id , status  FROM corona_orders join users on users.id = corona_orders.user_id WHERE corona_orders.hospital_id = ?", id, (err, res) => {
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

    console.log("successful order with id: ", id);
    result(null, res);
  });
};
Order.findByUserId = (id, result) => {
  sql.query("SELECT users.id , corona_orders.id as order_id ,name , age , phone , national_id , status  FROM corona_orders join users on users.id = corona_orders.user_id WHERE corona_orders.user_id = ?", id, (err, res) => {
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

    console.log("successful order with id: ", id);
    result(null, res);
  });
};
Order.changeStatus = (id, status, result) => {
  sql.query(
    "UPDATE corona_orders SET status = ? WHERE id = ?",
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
module.exports = Order;
