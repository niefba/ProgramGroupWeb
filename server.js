
/**
 * Module dependencies.
 */
var express = require('express')
  , util = require('util')
  , app = require('express')()
  , server = require('http').createServer(app)
  , jwt = require('jwt-simple');

var io = require('socket.io')(server);

var config = require('./config');
var Transaction = require('./modules/transaction.js');

// Start server
server.listen(config.server.port, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

app.use(require('body-parser').json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use('/angular', express.static(__dirname + '/node_modules/angular'));
app.use('/angular-route', express.static(__dirname + '/node_modules/angular-route'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap'));
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/img', express.static(__dirname + '/public/img'));
app.use('/js', express.static(__dirname + '/public/js'));
app.use('/partials', express.static(__dirname + '/public/partials'));

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYmYiOjE0NTg2MDA4NzksImlhdCI6MTQ1ODYwMDg3OSwiZXhwIjoxNDU4Njg3Mjc5LCJ0cmFuc2FjdGlvbk51bWJlciI6IjIyMTExNyIsInJlc29ydCI6IkNsdWIgTWVkIFR3byIsInNhbGVQZXJzb24iOiJOYXRoYWxpZSBMRU1BSVJFLVNUUk9VQkFOVEUiLCJldmVudE1hbmFnZXIiOiJTYW1pYSBTTk9VU1NJIiwiZXhlY3V0aXZlUGVyc29uIjoiIiwiY29tcGFueSI6IlRPVEFMIExVQlJJRklBTlRTIiwiZGF0ZUZyb20iOiIxMy8xMS8yMDE1IiwiZGF0ZVRvIjoiMjEvMTEvMjAxNSIsIm5iUGF4SW5pdCI6MzAxLCJuYlBheFJlYWxOYSI6IiJ9.2pjhBSLtDu8vtp-bEgZLih4KxgtmN0ekJSbL-TH1Ass
app.get('/token/:key', function(req, res, next) {
  // Handle the get for this route
  res.sendFile(__dirname + '/public/index.html');
});
app.get('/', function(req, res, next) {
  // Handle the get for this route
  res.sendFile(__dirname + '/public/index.html');
});

// Manage socket authorization
io.use(function(socket, next) {
  console.log("Manage socket authorization");

  try {
    // Decode the json from an encoded string with double quote
    var decoded = require('jwt-simple').decode(socket.handshake.query.token, config.app.secret, "HS256");
    if (decoded.transactionNumber) {
      Transaction.findByNumber(decoded.transactionNumber, function(err, transactions) {
        if (err) {
          return console.error(err);
        }
        // New transaction
        console.dir(decoded.dateTo);
        var dateToArray = decoded.dateTo.split('/')
        decoded.dateTo = new Date(dateToArray[2], dateToArray[1], dateToArray[0]);
        var dateFromArray = decoded.dateFrom.split('/')
        decoded.dateFrom = new Date(dateFromArray[2], dateFromArray[1], dateFromArray[0]);
        if (transactions.length == 0) {
          console.log('New transaction');
          var transaction = new Transaction({
            number: decoded.transactionNumber,
            resort: decoded.resort,
            salePerson: decoded.salePerson,
            eventManager: decoded.eventManager,
            executivePerson: decoded.executivePerson,
            company: decoded.company,
            dateFrom: decoded.dateFrom,
            dateTo: decoded.dateTo,
            nbPaxRealNa: Number(decoded.nbPaxRealNa),
            services: [],
            comments: []
          });
          transaction.save(function(err) {
            if (err) return console.error(err);
            //res.status(200).json(transaction);
            // Emit transaction
            socket.emit('transaction', transaction);
             next();
          });
        }
        else {
          console.log('Existing transaction');
          console.dir(transactions);
          //res.status(200).json(transactions[0]);
          // Emit transaction
            socket.emit('transaction', transactions[0]);
            next();
        }
        //console.log(transaction);
      })
    }
  }
  catch (err) {
    //res.status(403).json({ error: 'Invalid token'});
    next(new Error('Invalid token'));
  }
/*
  // Decode token
  var decoded = require('jwt-simple').decode(socket.handshake.query.token, secret);
  // Check if token is not older than 24 heures
  if (new Date().getTime() - decoded.timestamp < 86400000) {
    // Retrieve role
    socket.handshake.role = decoded.role;

    // Retrieve permission
    socket.handshake.permission = decoded.permission;  

    // Emit user informations
    socket.emit('user', {login: decoded.login, role: decoded.role, groups: decoded.groups, permission: decoded.permission})
    next();
  }
  else {
    next(new Error('token expired'));
  }
*/
});

// Socket management
io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  // Save transaction
  socket.on('saveTransaction', function(data){
    var transaction = new Transaction(JSON.parse(data));
    transaction.update(function(err) {
      if (err) {
        console.log(err);
        return socket.emit('error', 'Failed to save transaction');
      }
    });
  });
});