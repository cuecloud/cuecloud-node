'use strict';

// Default details to connect to the CueCloud API
CueCloud.DEFAULT_ENDPOINT = 'https://cuecloud.com/api';
CueCloud.DEFAULT_BASE_PATH = '/v1.0/';

// Use node.js' default timeout:
CueCloud.DEFAULT_TIMEOUT = require('http').createServer().timeout;

CueCloud.USER_AGENT = {
  module: require('../package.json').name,
  version: require('../package.json').version,
  lang: 'node',
  lang_version: process.version,
  platform: process.platform
};

CueCloud.USER_AGENT_SERIALIZED = null;

var resources = {
  cues: require('./resources/cues.js'),
  balance: require('./resources/balance.js'),
  completions: require('./resources/completions.js'),
  payments: require('./resources/payments.js'),
  validation: require('./resources/validation.js')
};

CueCloud.CueCloudResource = require('./CueCloudResource');
CueCloud.resources = resources;

function CueCloud(apiKey, apiPass) {
  if (!this instanceof CueCloud) {
    return new CueCloud(apiKey, apiPass);
  }

  this._apiConfig = {
    apiKey: null,
    apiPass: null,
    endPoint: CueCloud.DEFAULT_ENDPOINT,
    basePath: CueCloud.DEFAULT_BASE_PATH,
    timeout: CueCloud.DEFAULT_TIMEOUT,
    userAgent: JSON.stringify(CueCloud.USER_AGENT)
  };

  this.setApiKey(apiKey);
  this.setApiPass(apiPass);
  this.prepareResources();
}

CueCloud.prototype = {

  // This will be moved into the generic resource class


  validateUser: function() {
    // return this.request({
    return this.makeRequest({
      resource: '/validate/',
      method: 'GET'
    });
  },

  getKeywords: function() {
    return this.request({
      resource: '/cues/keywords/',
      method: 'GET'
    });
  },

  /******************************
  * Config setters and getters *
  ******************************/
  setApiKey: function(key) {
    if (key) {
      this._setConfig('apiKey', key);
    }
    else {
      throw new Error('Invalid apiKey');
    }
  },

  setApiPass: function(pass) {
    if (pass) {
      this._setConfig('apiPass', pass);
    }
    else {
      throw new Error('Invalid apiPass');
    }
  },

  setEndPoint: function(endPoint) {
    if (endPoint) {
      this._setConfig('endPoint', endPoint);
    }
  },

  setBasePath: function(basePath) {
    if (basePath) {
      this._setConfig('basePath', basePath);
    }
  },

  _setConfig: function(key, value) {
    this._apiConfig[key] = value;
  },

  getConfig: function(key) {
    return this._apiConfig[key];
  },

  getResources: function(resources) {
    return resources;
  },

  prepareResources: function() {
    for (var name in resources) {
      this[name] = new resources[name](this);
    }
  }
};

module.exports = CueCloud;
