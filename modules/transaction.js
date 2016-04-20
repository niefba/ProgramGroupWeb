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
  }],
  services: [{
    type: 'string',
    date: 'Date',
    name: 'string',
    quantity: 'integer',
    price: 'number',
    payment: 'string',
    comment: 'string'
  }],
  eventPersonalization: {
    commentProduction: 'string',
    commentResort: 'string'
  },
  vipOffered: {
    commentProduction: 'string',
    commentResort: 'string'
  },
  vip: {
    commentProduction: 'string',
    commentResort: 'string'
  },
  gift: {
    commentProduction: 'string',
    commentResort: 'string'
  },
  arrivalNoTransfer: {
    commentProduction: 'string',
    commentResort: 'string'
  },
  departNoTransfer: {
    commentProduction: 'string',
    commentResort: 'string'
  },
  transferArrival: {
    commentProduction: 'string',
    commentResort: 'string'
  },
  transfertDepart: {
    commentProduction: 'string',
    commentResort: 'string'
  },
  coffeeBreaks: {
    commentProduction: 'string',
    commentResort: 'string'
  },
  cocktails: {
    commentProduction: 'string',
    commentResort: 'string'
  },
  restaurantIncluded: {
    commentProduction: 'string',
    commentResort: 'string'
  },
  restaurantExtra: {
    commentProduction: 'string',
    commentResort: 'string'
  },
  additionalMeals: {
    commentProduction: 'string',
    commentResort: 'string'
  },
  conferenceRooms: {
    commentProduction: 'string',
    commentResort: 'string'
  },
  basicEquipment: {
    commentProduction: 'string',
    commentResort: 'string'
  },
  rentalEquipment: {
    commentProduction: 'string',
    commentResort: 'string'
  },
  discovery: {
    commentProduction: 'string',
    commentResort: 'string'
  },
  otherServices: {
    commentProduction: 'string',
    commentResort: 'string'
  },
  skiRental: {
    commentProduction: 'string',
    commentResort: 'string'
  },
  skiBootRental: {
    commentProduction: 'string',
    commentResort: 'string'
  },
  skiInstructor: {
    commentProduction: 'string',
    commentResort: 'string'
  },
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