'use strict';

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

module.exports = {

  // Provides a testable CueCloud instance, with mock-requests and hookable to
  // test config, getters and setters.
  getSpyableCueCloud: function() {
    var CueCloud = require('../lib/cuecloud');
    var cuecloud = new CueCloud('42cef2c79a984e34', '2152b0f3cc1649fb');

    cuecloud.REQUESTS = [];

    for (var i in cuecloud) {
      if (cuecloud[i] instanceof CueCloud.CueCloudResource) {
        // Override each makeRequest method so we can make the params avaialable
        // to consuming tests (revealing requests made on REQUESTS and
        // LAST_REQUEST)
        cuecloud[i].makeRequest = function(method, url, params) {
          var req = cuecloud.LAST_REQUEST = {
            method: method,
            url: url,
            data: params || null
          };
          cuecloud.REQUESTS.push(req);
        };
      }
    }

    return cuecloud;

  }

};
