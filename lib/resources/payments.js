'use strict';

var CueCloudResource = require('../CueCloudResource');

function Payments() {
  Payments.super_.apply(this, arguments);
  this.path = 'payments/';
}

require('util').inherits(Payments, CueCloudResource);

Payments.prototype.retrieve = function(params) {
  params = params || {};
  return this.makeRequest(
    'GET',
     this.path,
     {
      'PaymentType': params.PaymentType || '',
       'PaymentID': params.PaymentID || '',
       'NoteToSelf': params.NoteToSelf || '',
       'Page': params.Page || '',
    }
  );
};

Payments.prototype.deposit = function(amountUSD, ccLastFour) {
  // ToDo make them mandatory

  return this.makeRequest(
    'POST',
    this.path+ 'deposit/',
    {
      'AmountInUSD': amountUSD,
      'CreditCardLastFourDigits': ccLastFour
    }
  );
};

Payments.prototype.withdraw = function(amountUSD) {
  // ToDo make them mandatory

  return this.makeRequest(
    'POST',
    this.path+ 'withdraw/',
    {'AmountInUSD': amountUSD}
  );
};

Payments.prototype.bonus = function(cueCompletionId, amount, params) {
  // ToDo make them mandatory
  params = params || {};
  return this.makeRequest(
    'POST',
    this.path+ 'bonus/',
    {
      'CueCompletionID': cueCompletionId,
      'Amount': amount,
      'NoteToSelf': params.NoteToSelf || '',
      'Reason': params.Reason || 'Thanks for your hard work!'
    }
  );
};

module.exports = Payments;
