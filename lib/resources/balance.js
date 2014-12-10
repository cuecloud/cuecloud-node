'use strict';

var CueCloudResource = require('../CueCloudResource');

function Balance() {
  Balance.super_.apply(this, arguments);
  this.path = 'balance/';
}

require('util').inherits(Balance, CueCloudResource);

Balance.prototype.retrieve = function() {

  return this.makeRequest(
    'GET',
    this.path
  );
};



module.exports = Balance;
