
/**
 * Module dependencies.
 */
var express = require('express')
  , util = require('util')
  , app = require('express')()
  , server = require('http').createServer(app)
  , jwt = require('jwt-simple');

var config = require('./config');

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

app.get('/token/:key', function(req, res, next) {
  // Handle the get for this route
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/data', function(req, res){
  try {
    // Decode the json from an encoded string with double quote
    var data = require('jwt-simple').decode(req.query.token, config.app.secret, "HS256");
    res.status(200).json(data);
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




