const express = require("express");
const bodyParser = require("body-parser");
const expressLayouts = require('express-ejs-layouts')
var session = require('express-session');
var flash = require('express-flash');
var cookieParser = require('cookie-parser');

const app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// Static Files
// app.use(express.static('public'))
app.use('/css', express.static(__dirname + '/app/public/css'))// Example for other folders - not required
app.use('/img', express.static(__dirname + '/app/public/img'))// Example for other folders - not required
app.use('/js', express.static(__dirname + '/app/public/js'))// Example for other folders - not required
// app.use('/css', express.static(__dirname + 'public/css'))

// Set Templating Engine
// app.use(expressLayouts)
app.set('layouts', '/app/views/layouts/default')
app.set('view engine', 'ejs')

app.set('views', __dirname + '/app/views');

// simple route
app.get("/", (req, res) => {
  res.render('index',{ title: 'index', layouts: '/app/views/layouts/default' });
});
app.get("/login", (req, res) => {
  res.render('login');
});
app.get("/register", (req, res) => {
  res.render('register');
});
var coronaOrderRouter = require('./app/routes/coronaOrderWeb');
var bloodDonationWebRouter = require('./app/routes/bloodDonationWeb');
var hospitalWebRouter = require('./app/routes/hospital.routes');
app.use('/corona_order_web', coronaOrderRouter);
app.use('/bloodDonations', bloodDonationWebRouter);
app.use('/hospital', hospitalWebRouter);
app.use(session({
    cookie: { maxAge: 60000 },
    store: new session.MemoryStore,
    saveUninitialized: true,
    resave: 'true',
    secret: 'secret'
}))

app.use(flash());
// catch 404 and forward to error handler


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.use(cookieParser())




//api
require("./app/routes/user.routes.js")(app);
require("./app/routes/corona_order.routes.js")(app);
require("./app/routes/bloodDonations.routes.js")(app);

// set port, listen for requests
app.listen(3000,'192.168.100.6');
console.log("Server is running on port 3000.");
