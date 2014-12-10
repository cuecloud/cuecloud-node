'use strict';

var cuecloud = require('../testUtils').getSpyableCueCloud();
var expect = require('chai').expect;

describe('Payments Resource', function() {
  describe('retrieve', function() {

    it('Should GET /payments/ empty filters', function() {
      cuecloud.payments.retrieve();
      expect(cuecloud.LAST_REQUEST).to.deep.equal({
        method: 'GET',
        url: 'payments/',
        data: {
          'PaymentType': '',
           'PaymentID': '',
           'NoteToSelf': '',
           'Page': ''
        }
      });
    });
    it('Should GET /payments/ with a PaymentID filter', function() {
      cuecloud.payments.retrieve({'PaymentID':'142'});
      expect(cuecloud.LAST_REQUEST).to.deep.equal({
        method: 'GET',
        url: 'payments/',
        data: {
          'PaymentType': '',
           'PaymentID': '142',
           'NoteToSelf': '',
           'Page': ''
        }
      });

    });

  });

  describe('deposit', function() {
    it('Should POST /payments/deposit with AmountInUSD and CreditCardLastFourDigits', function() {
      cuecloud.payments.deposit(123.45, 9182);
      expect(cuecloud.LAST_REQUEST).to.deep.equal({
        method: 'POST',
        url: 'payments/deposit/',
        data: {
          'AmountInUSD': 123.45,
          'CreditCardLastFourDigits': 9182
        }
      });
    });
  });

  describe('withdraw', function() {
    it('Should POST /payments/withdraw with AmountInUSD', function() {
      cuecloud.payments.withdraw(123.45);
      expect(cuecloud.LAST_REQUEST).to.deep.equal({
        method: 'POST',
        url: 'payments/withdraw/',
        data: {
          'AmountInUSD': 123.45
        }
      });
    });
  });

  describe('bonus', function(params) {
    it('Should POST /payments/bonus/ with CueCompletionID and Amount', function() {
      cuecloud.payments.bonus(1735, 123.4);
      expect(cuecloud.LAST_REQUEST).to.deep.equal({
        method: 'POST',
        url: 'payments/bonus/',
        data: {
          'CueCompletionID': 1735,
           'Amount': 123.4,
           'NoteToSelf': '',
           'Reason': 'Thanks for your hard work!'
        }
      });
    });

  });

});
