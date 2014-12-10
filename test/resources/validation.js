'use strict';

var cuecloud = require('../testUtils').getSpyableCueCloud();
var expect = require('chai').expect;

describe('Validation Resource', function() {
  describe('validate', function() {

    it('Should GET /validate/ with no data', function() {
      cuecloud.validation.validate();
      expect(cuecloud.LAST_REQUEST).to.deep.equal({
        method: 'GET',
        url: 'validate/',
        data: null
      });

    });

  });

});
