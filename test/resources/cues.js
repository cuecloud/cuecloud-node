'use strict';

var cuecloud = require('../testUtils').getSpyableCueCloud();
var expect = require('chai').expect;

describe('Completions Resource', function() {
  describe('retrieve', function() {

    it('Should GET /cues/ empty filters', function() {
      cuecloud.cues.retrieve();
      expect(cuecloud.LAST_REQUEST).to.deep.equal({
        method: 'GET',
        url: 'cues/',
        data: {
          'CueID': '',
          'GroupID': '',
          'Status': '',
          'NoteToSelf': '',
          'HasPendingCueCompletions': '',
          'Page': ''
        }
      });
    });
    it('Should GET /cues/ with a CueID filter', function() {
      cuecloud.cues.retrieve({'CueID':42});
      expect(cuecloud.LAST_REQUEST).to.deep.equal({
        method: 'GET',
        url: 'cues/',
        data: {
          'CueID': 42,
          'GroupID': '',
          'Status': '',
          'NoteToSelf': '',
          'HasPendingCueCompletions': '',
          'Page': ''
        }
      });

    });

  });

  describe('create', function() {
    it('Should POST /cues/create with Title and Amount', function() {
      cuecloud.cues.create('This is a Cues', 12.34);
      expect(cuecloud.LAST_REQUEST).to.deep.equal({
        method: 'POST',
        url: 'cues/create',
        data: {
          'Title': 'This is a Cues',
          'Amount': 12.34,
          'NumOpportunities': 1,
          'Description': '',
          'IsAnonymous': '',
          'PushNotificationOnCueCompletion': '',
          'DisallowAnonymousCueCompletions': '',
          'iFrameURL': '',
          'URLNotificationOnCueCompletion': '',
          'EmailNotificationOnCueCompletion': '',
          'LifetimeInMinutes': '',
          'TimeLimitToCompleteCueInMinutes': '',
          'AutoApproveCueCompletionAfterThisManyMinutes': '',
          'NoteToSelf': '',
          'Keywords': '',
        }
      });
    });

    it('Should POST /cues/create with Title, Amount, and number of opportunities', function() {
      cuecloud.cues.create('This is a Cues', 12.34, {'NumOpportunities': 12});
      expect(cuecloud.LAST_REQUEST).to.deep.equal({
        method: 'POST',
        url: 'cues/create',
        data: {
          'Title': 'This is a Cues',
           'Amount': 12.34,
           'NumOpportunities': 12,
           'Description': '',
           'IsAnonymous': '',
           'PushNotificationOnCueCompletion': '',
           'DisallowAnonymousCueCompletions': '',
           'iFrameURL': '',
           'URLNotificationOnCueCompletion': '',
           'EmailNotificationOnCueCompletion': '',
           'LifetimeInMinutes': '',
           'TimeLimitToCompleteCueInMinutes': '',
           'AutoApproveCueCompletionAfterThisManyMinutes': '',
           'NoteToSelf': '',
           'Keywords': ''
        }
      });
    });

  });

  describe('cancel', function() {
    it('Should POST /cues/cancel/ with CueID', function() {
      cuecloud.cues.cancel(1234);
      expect(cuecloud.LAST_REQUEST).to.deep.equal({
        method: 'POST',
        url: 'cues/cancel/',
        data: {'CueID': 1234}
      });
    });

  });

  describe('assign', function() {
    it('Should POST /cues/assign/ with CueID', function() {
      cuecloud.cues.assign(1234);
      expect(cuecloud.LAST_REQUEST).to.deep.equal({
        method: 'POST',
        url: 'cues/assign/',
        data: {'CueID': 1234}
      });
    });

  });

  describe('complete', function() {
    it('Should POST /cues/complete/ with AssignmentID', function() {
      cuecloud.cues.complete(1234);
      expect(cuecloud.LAST_REQUEST).to.deep.equal({
        method: 'POST',
        url: 'cues/complete/',
        data: {
          'AssignmentID': 1234,
           'AnswerText': '',
           'VideoURL': '',
           'VideoThumbnailURL': '',
           'ImageURL': '',
           'IsAnonymous': ''
        }
      });
    });
    it('Should POST /cues/complete/ with AssignmentID and imageURL', function() {
      cuecloud.cues.complete(1234, {'ImageURL': 'http://url.to/image.jpg'});
      expect(cuecloud.LAST_REQUEST).to.deep.equal({
        method: 'POST',
        url: 'cues/complete/',
        data: {
          'AssignmentID': 1234,
           'AnswerText': '',
           'VideoURL': '',
           'VideoThumbnailURL': '',
           'ImageURL': 'http://url.to/image.jpg',
           'IsAnonymous': ''
        }
      });
    });

  });

  describe('keywords', function() {
    it('Should GET /cues/keywords/ with no data', function() {
      cuecloud.cues.keywords();
      expect(cuecloud.LAST_REQUEST).to.deep.equal({
        method: 'GET',
        url: 'cues/keywords/',
        data: null
      });

    });

  });

});
