module.exports = app => {
  const users = require("../controllers/user.controller.js");

  // login
  app.post("/login", users.login);

  //register
  app.post("/register", users.register);
};
