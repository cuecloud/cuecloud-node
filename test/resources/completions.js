'use strict';

var cuecloud = require('../testUtils').getSpyableCueCloud();
var expect = require('chai').expect;

describe('Completions Resource', function() {
  describe('retrieve', function() {

    it('Should GET /completions/ empty filters', function() {
      cuecloud.completions.retrieve();
      expect(cuecloud.LAST_REQUEST).to.deep.equal({
        method: 'GET',
        url: 'completions/',
        data: {
          'CueID': '',
          'CueCompletionID': '',
          'Status': '',
          'Page': ''
        }
      });
    });
    it('Should GET /completions/ with a CueID filter', function() {
      cuecloud.completions.retrieve({'CueID':42});
      expect(cuecloud.LAST_REQUEST).to.deep.equal({
        method: 'GET',
        url: 'completions/',
        data: {
          'CueID': 42,
          'CueCompletionID': '',
          'Status': '',
          'Page': ''
        }
      });

    });

  });

  describe('approve', function() {
    it('Should POST /completions/approve/ with CueCompletionID', function() {
      cuecloud.completions.approve(1234);
      expect(cuecloud.LAST_REQUEST).to.deep.equal({
        method: 'POST',
        url: 'completions/approve/',
        data: {'CueCompletionID': 1234}
      });
    });

  });

  describe('decline', function() {
    it('Should POST /completions/decline/ with CueCompletionID', function() {
      cuecloud.completions.decline(1234);
      expect(cuecloud.LAST_REQUEST).to.deep.equal({
        method: 'POST',
        url: 'completions/decline/',
        data: {'CueCompletionID': 1234}
      });
    });

  });

});
