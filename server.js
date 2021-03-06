/**
 * Module imports
 */

var express = require('express');
var app = express();

var Sequelize = require('sequelize');

var models = require('./models');
var ensure = require('./routes/ensure.js');

app.set('views', __dirname + '/site');

/**
 * Routes
 */

require('./routes/auth.js')(app);
require('./routes/profile.js')(app);
require('./routes/clan.js')(app);
require('./routes/season.js')(app);
require('./routes/elevated.js')(app);

/**
 * Views
 */

app.get('/', function (req, res) {
    var msg = req.session.message;
    req.session.message = null;
    res.render('index.jade', {user: req.user, path: req.path, message: msg, personal: null});
});

app.get('/login', function (req, res) {
    res.render('login.jade', {user: req.user, path: req.path});
});

app.get('/help', function (req, res) {
    res.render('help.jade', {user: req.user, path: req.path});
});

app.get('/register', function (req, res) {
    res.render('register.jade', {user: req.user, path: req.path});
});


/**
 * Static views
 */

app.use('/', express.static(__dirname + '/site'));

/**
 * Initialize server
 */
var server = app.listen(3000, function () {
    console.log('Listening on port %d', server.address().port);
});
server.timeout = 120000;
app.timeout = 120000;

process.on('uncaughtException', function (err) {
    console.error(err.stack);
    console.log("Node NOT Exiting...");
});