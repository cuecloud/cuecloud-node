'use strict';

var CueCloudResource = require('../CueCloudResource');

function Completions() {
  Completions.super_.apply(this, arguments);
  this.path = 'completions/';
}

require('util').inherits(Completions, CueCloudResource);

Completions.prototype.retrieve = function(params) {
  params = params || {};
  return this.makeRequest(
    'GET',
    this.path,
    {
      'CueID': params.CueID || '',
      'CueCompletionID': params.CueCompletionID || '',
      'Status': params.Status || '',
      'Page': params.Page || ''
    }
  );
};

Completions.prototype.approve = function(cueCompletionId) {
  return this.makeRequest(
    'POST',
    this.path+ 'approve/',
    {'CueCompletionID': cueCompletionId}
  );
};

Completions.prototype.decline = function(cueCompletionId) {
  return this.makeRequest(
    'POST',
    this.path+ 'decline/',
    {'CueCompletionID': cueCompletionId}
  );
};

module.exports = Completions;
