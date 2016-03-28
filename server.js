
/**
 * Module dependencies.
 */
var express = require('express')
  , util = require('util')
  , app = require('express')()
  , server = require('http').createServer(app)
  , jwt = require('jwt-simple');

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

app.get('/data', function(req, res){
  try {
    // Decode the json from an encoded string with double quote
    var data = require('jwt-simple').decode(req.query.token, config.app.secret, "HS256");
    if (data.transactionNumber) {
      Transaction.findByNumber(data.transactionNumber, function(err, transactions) {
        if (err) {
          return console.error(err);
        }
        // New transaction
        console.dir(data.dateTo);
        var dateToArray = data.dateTo.split('/')
        data.dateTo = new Date(dateToArray[2], dateToArray[1], dateToArray[0]);
        var dateFromArray = data.dateFrom.split('/')
        data.dateFrom = new Date(dateFromArray[2], dateFromArray[1], dateFromArray[0]);
        if (transactions.length == 0) {
          console.log('New transaction');
          var transaction = new Transaction({
            number: data.transactionNumber,
            resort: data.resort,
            salePerson: data.salePerson,
            eventManager: data.eventManager,
            executivePerson: data.executivePerson,
            company: data.company,
            dateFrom: data.dateFrom,
            dateTo: data.dateTo,
            nbPaxInit: Number(data.nbPaxInit),
            nbPaxRealNa: Number(data.nbPaxRealNa),
            services: [],
            comments: []
          });
          transaction.save(function(err) {
            if (err) return console.error(err);
            res.status(200).json(transaction);
          });
        }
        else {
          console.log('Existing transaction');
          console.dir(transactions);
          res.status(200).json(transactions[0]);
        }
        //console.log(transaction);
      })
    }
  }
  catch (err) {
    res.status(403).json({ error: 'Invalid token'});
  }
});

/*
app.post('/', function (req, res) {
  var token = jwt.encode({timestamp: new Date().getTime()}, secret);
  body[token] = req.body;
  res.status(200).send(token);
});
*/
app.post('/saveTransaction', function (req, res) {
  console.dir(req.body);
  if (req.body.transaction) {
    var transaction = new Transaction(req.body.transaction);
    transaction.update(function(err) {
      if (err) return res.status(500).send();
      return res.status(200).send();
    });
  }
  else return res.status(500).send();
});



