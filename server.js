// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var configDB = require('./config/database.js');
var server = require('http').Server(app);
var io = require('socket.io')(server);

var runningMode=1;
//1 for production
//0 for testing
// configuration ===============================================================
configDB.connect(runningMode); // connect to our database


// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms
app.set('view engine', 'ejs'); // set up ejs for templating
app.use(express.static(__dirname + '/public'));
// required for passport
app.use(session({ secret: 'dkfhbsdhgSDHDFighaifa' })); // session secret
app.use(flash()); // use connect-flash for flash messages stored in session

  		require('./app/routes.js')(app);

io.on('connection', function (socket) {
  socket.on('stockIdAdd', function (data) {
  		require('./app/insertstock.js')(socket,data);
  });
  socket.on('stockIdRem', function (data) {
  		require('./app/removestock.js')(socket,data);
  });

});


// launch ======================================================================

server.listen(port);
//app.listen(port);
console.log('The magic happens on port ' + port);