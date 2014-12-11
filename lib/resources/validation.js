'use strict';

var CueCloudResource = require('../CueCloudResource');

function Validation() {
  Validation.super_.apply(this, arguments);
  this.path = 'validate/';
}

require('util').inherits(Validation, CueCloudResource);

Validation.prototype.validate = function() {

  return this.makeRequest(
    'GET',
    this.path
  );
};

module.exports = Validation;
