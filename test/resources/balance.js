'use strict';

var cuecloud = require('../testUtils').getSpyableCueCloud();
var expect = require('chai').expect;

describe('Balance Resource', function() {
  describe('retrieve', function() {

    it('Should GET /balance/ with no data', function() {
      cuecloud.balance.retrieve();
      expect(cuecloud.LAST_REQUEST).to.deep.equal({
        method: 'GET',
        url: 'balance/',
        data: null
      });

    });

  });

});
