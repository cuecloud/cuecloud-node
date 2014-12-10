'use strict';

var expect = require('chai').expect;
var cuecloud = require('./testUtils').getSpyableCueCloud();

describe('CueCloud client config', function() {
  describe('API Key and Pass are set', function() {
    it('Valid API Key found', function() {
      expect(cuecloud.getConfig('apiKey')).to.equal('42cef2c79a984e34');
    });
    it('Valid API Pass found', function() {
      expect(cuecloud.getConfig('apiPass')).to.equal('2152b0f3cc1649fb');
    });
  });
  describe('.setApiKey', function() {
    it('Set a valid API Key', function() {
      var validKey = 'ThisIsAValidKey';
      cuecloud.setApiKey(validKey);
      expect(cuecloud.getConfig('apiKey')).to.equal(validKey);
    });
    it('Set an invalid API Key', function() {
      var invalidKey = null;
      expect(cuecloud.setApiKey.bind(null, invalidKey)).to.throw('Invalid apiKey');
    });

    it('Set a valid API Pass', function() {
      var validKey = 'ThisIsAValidPass';
      cuecloud.setApiPass(validKey);
      expect(cuecloud.getConfig('apiPass')).to.equal(validKey);
    });
    it('Set an invalid API Pass', function() {
      var invalidKey = null;
      expect(cuecloud.setApiPass.bind(null, invalidKey)).to.throw('Invalid apiPass');
    });
  });

});
