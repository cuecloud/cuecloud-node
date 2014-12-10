'use strict';

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var expect = chai.expect;

var CueCloud = require('../lib/cuecloud');
var cuecloud = new CueCloud('42cef2c79a984e34', '2152b0f3cc1649fb');

describe('CueCloud Integration Tests', function() {
  describe('Validate User', function() {
    it('Should validate the user', function(){
      var res = cuecloud.validation.validate();
      return expect(res).to.eventually.have.property('Error', 'Welcome, David Litwin!');
    });
  });

  describe('Retrieve Keywords', function() {
    it('Should contain Facebook', function(){
      var res = cuecloud.cues.keywords();
      return expect(res).to.eventually.have.deep.property('Data.Keywords').to.have.contain('facebook');
    });
  });

  describe('Make Deposit', function() {
    it('Should increase user\'s Balance', function(){
      this.timeout(6000);
      var prevBal;
      var amount = 10.24;
      return cuecloud.balance.retrieve()
        .then(function(bal) {
          prevBal = bal;
          return cuecloud.payments.deposit(amount, 1111)
            .then(function(dep) {
              return cuecloud.balance.retrieve()
                .then(function(newbal) {
                  expect(newbal.Data.Balance).to.be.closeTo(prevBal.Data.Balance + amount, 0.1);
                });
            });
        });
    });
  });

  describe('Withdraw Funds', function() {
    it('Should decrease user\'s Balance', function(){
      this.timeout(6000);
      var prevBal;
      var amount = 10.24;
      return cuecloud.balance.retrieve()
      .then(function(bal) {
        prevBal = bal;
        return cuecloud.payments.withdraw(amount, 1111)
        .then(function(dep) {
          return cuecloud.balance.retrieve()
          .then(function(newbal) {
            expect(newbal.Data.Balance).to.be.closeTo(prevBal.Data.Balance - amount, 0.1);
          });
        });
      });
    });
  });

  describe('Create a new Cue', function() {
    it('Should have 1 more Cue and balance decreased', function(){
      this.timeout(6000);
      var prevBal;
      var newBal;
      var prevNumCues;
      var amount = 10.24;
      var numOps = 4;
      var fee = 0.10;

      return cuecloud.balance.retrieve()
      .then(function(bal) {
        prevBal = bal;
        return cuecloud.cues.retrieve()
          .then(function(cues) {
            prevNumCues = cues.Data.NumTotalResults;
            return cuecloud.cues.create('New Cue', amount, {'NumOpportunities': numOps})
            .then(function(cue) {
              return cuecloud.balance.retrieve()
              .then(function(newbal) {
                newBal = newbal;
                return cuecloud.cues.retrieve()
                  .then(function(cues) {
                    var cost = amount * numOps * (1 + fee);
                    expect(newbal.Data.Balance).to.be.closeTo(
                      prevBal.Data.Balance - cost, 0.1
                    );
                    expect(cues.Data.NumTotalResults).to.be.equal(prevNumCues+1);
                  });
              });
            });
          });
      });
    });
  });


});
