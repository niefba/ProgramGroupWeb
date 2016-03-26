var config = require('../config');
var ottoman = require('ottoman');
var couchbase = require('couchbase');
var cluster = new couchbase.Cluster('couchbase://127.0.0.1');
ottoman.bucket = cluster.openBucket('default');

var Transaction = ottoman.model('Transaction', {
  number: {type:'string', readonly:true},
  resort: 'string',
  salePerson: 'string',
  eventManager: 'string',
  executivePerson: 'string',
  company: 'string',
  dateFrom: 'Date',
  dateTo: 'Date',
  nbPaxInit: 'integer',
  nbPaxRealNa: 'integer',

  chiefOfVillage: 'string',
  resortManager: 'string',
  remarks: 'string',
  companyActivity: 'string',
  aimOfMeeting: 'string',
  leaders: [{
    leaderName: 'string',
    leaderFunction: 'string'
  }]
}, {
  index: {
    findByNumber: {
      type: 'refdoc',
      by: 'number'
    }
  }
});

Transaction.prototype.update = function(callback) {
  var key = 'Transaction|' + this._id;

  ottoman.bucket.replace(key, this, function(err, result) {
    if (err) return callback(err);
    return callback();
    /*ottoman.bucket.get(key, function(err, result) {
      if (err) return callback(null, err);
      return callback(result.value);
    });*/
  });
};



// To run only if model has changed
ottoman.ensureIndices(function(err) {
  console.log('ensureIndices');
  if (err) return console.error(err);
});


module.exports = Transaction;