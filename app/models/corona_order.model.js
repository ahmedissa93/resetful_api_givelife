const sql = require("./dbConnection.js");
// constructor
const Order = function(order) {
  this.user_id = order.user_id;
  this.hospital_id = order.hospital_id;
  this.location = order.location;
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
module.exports = Order;
