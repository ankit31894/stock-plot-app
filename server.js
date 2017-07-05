var express  = require('express');
var app      = express();
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var configDB = require('./config/database.js');
var server = require('http').Server(app);
var io = require('socket.io')(server);
var config = {}
if (process.argv[2]) {
  config = require(process.argv[2]);
}
configDB.connect(config);
var port = process.env.PORT || config.PORT;
app.use(morgan('dev'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(cookieParser()); 
app.set('view engine', 'ejs'); 
app.use(express.static(__dirname + '/public'));
app.use(session({
  secret: 'dkfhbsdhgSDHDFighaifa',
  saveUninitialized: false,
  resave: false
}));
app.use(flash());
require('./app/routes.js')(app);

io.on('connection', function (socket) {
  socket.on('stockIdAdd', function (data) {
    require('./app/insertstock.js')(socket,data);
  });
  socket.on('stockIdRem', function (data) {
    require('./app/removestock.js')(socket,data);
  });
});
server.listen(port);
console.log('The magic happens on port ' + port);