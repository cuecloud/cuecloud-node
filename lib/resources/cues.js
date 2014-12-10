'use strict';

var CueCloudResource = require('../CueCloudResource');

function Cues() {
  Cues.super_.apply(this, arguments);
  this.path = 'cues/';
}

require('util').inherits(Cues, CueCloudResource);

Cues.prototype.retrieve = function(params) {
  params = params || {};
  return this.makeRequest(
    'GET',
    this.path,
    {
      'CueID': params.CueID || '',
      'GroupID': params.GroupID || '',
      'Status': params.Status || '',
      'NoteToSelf': params.NoteToSelf || '',
      'HasPendingCueCompletions': params.HasPendingCueCompletions || '',
      'Page': params.Page || ''
    }
  );
};

Cues.prototype.create = function(title, amount, params) {
  params = params || {};
  return this.makeRequest(
    'POST',
    this.path+ 'create',
    {
        'Title': title || '',
         'Amount': amount || '',
         'NumOpportunities': params.NumOpportunities || 1,
         'Description': params.Description || '',
         'IsAnonymous': params.IsAnonymous || '',
         'PushNotificationOnCueCompletion': params.PushNotificationOnCueCompletion || '',
         'DisallowAnonymousCueCompletions': params.DisallowAnonymousCueCompletions || '',
         'iFrameURL': params.iFrameURL || '',
         'URLNotificationOnCueCompletion': params.URLNotificationOnCueCompletion || '',
         'EmailNotificationOnCueCompletion': params.EmailNotificationOnCueCompletion || '',
         'LifetimeInMinutes': params.LifetimeInMinutes || '',
         'TimeLimitToCompleteCueInMinutes': params.TimeLimitToCompleteCueInMinutes || '',
         'AutoApproveCueCompletionAfterThisManyMinutes': params.AutoApproveCueCompletionAfterThisManyMinutes || '',
         'NoteToSelf': params.NoteToSelf || '',
         'Keywords': params.Keywords || '',
    }
  );
};


Cues.prototype.cancel = function(cueId) {
  return this.makeRequest(
    'POST',
     this.path + 'cancel/',
     {'CueID': cueId}
  );
};

Cues.prototype.assign = function(cueId) {
  return this.makeRequest(
    'POST',
     this.path + 'assign/',
     {'CueID': cueId}
  );
};

Cues.prototype.complete = function(assignmentId, params) {
  params = params || {};
  return this.makeRequest(
    'POST',
     this.path + 'complete/',
     {
       'AssignmentID': assignmentId,
       'AnswerText': params.AnswerText || '',
       'VideoURL': params.VideoURL || '',
       'VideoThumbnailURL': params.VideoThumbnailURL || '',
       'ImageURL': params.ImageURL || '',
       'IsAnonymous': params.IsAnonymous || ''
    }
  );
};


Cues.prototype.keywords = function() {
  return this.makeRequest(
    'GET',
     this.path + 'keywords/'
  );
};

module.exports = Cues;
