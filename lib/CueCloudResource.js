'use strict';

var Promises = require('bluebird');
var request = require('request');
var querystring = require('querystring');
var crypto = require('crypto');
var requestPromise = Promises.promisify(request);

// Encapsulates request logic for a CueCloud Resource
function CueCloudResource(cuecloud) {
  this.cuecloud = cuecloud;
  this.path = '';
}

CueCloudResource.prototype = {

  makeRequest: function(method, path, data) {
    var body = '';
    var requestParams = {};
    var url = this.cuecloud.getConfig('endPoint') + this.cuecloud.getConfig('basePath') + path;

    // The body of the request for POST requests is used to calculate signature
    if(method == 'POST' && data != {}) {
      body = JSON.stringify(data);
    }
    if(method == 'GET' && ( typeof data !=='undefined'  && data != {})) {
      url += '?' + querystring.stringify(data);
    }

    // Create the authenticated headers

    // 1. Create nonce and signature
    var nonce = (new Date()).getTime() * 1000;

    // 2. Stringify some details of the request, to become the signature
    var message = nonce + url + body;

    // 3. Encrypt the message to get a request signature
    var hmac = crypto.createHmac('sha256', this.cuecloud.getConfig('apiPass'));
    hmac.setEncoding('hex');
    hmac.write(message);

    // 4. Read out hmac digest
    hmac.end();
    var signature = hmac.read();

    requestParams.method = method;
    requestParams.url = url;
    if(body!==''){
      requestParams.body = body;
    }else{
      requestParams.qs = data || {};
    }

    requestParams.headers = {
      'Access-Key': this.cuecloud.getConfig('apiKey'),
      'Access-Nonce': nonce,
      'Access-Signature': signature,
      'Content-Type': 'application/json',
      'Content-Length': body.length

    };

    return requestPromise(requestParams)
      .then (function(res) {
        if (!res || !res[0]) {
          throw new Error('No response');
        }
        if (res[0].statusCode != 200) {
          throw new Error(res[1]);
        }

        return res[1];
      })
      // Parse JSON, or return
      .then (function(body) {
        if (body) {
          try {
            return JSON.parse(body);
          }
          catch (e) {
            throw new Error('Invalid response');
          }
        }
      });
  }

};

module.exports = CueCloudResource;
