# CueCloud node.js API Client Library [![Build Status](https://travis-ci.org/cuecloud/cuecloud-node.png?branch=master)](https://travis-ci.org/cuecloud/cuecloud-node)

NPM package to interact with the CueCloud API.

## Geting started
The CueCloud node.js API client can be installed using [npm](https://www.npmjs.com/):
```bash
npm install cuecloud
```
Require the package in your application:
```js
var CueCloud = require('cuecloud');
```
And instantiate a new client, using the API key and secret password:

```js
var client = new CueCloud('Your_API_Key', 'Your_API_Password');
```

## API Overview
Every method is accessed via your cuecloud instance (the `client` we just instantiated), following the pattern:
```
client.{ RESOURCE_NAME }.{METHOD_NAME}
```
They'll return a promise, so you don't have to use regular callbacks. For example, to confirm that the user credentials are valid we can use the `validate` method from the `validation` resource:
```js
client.validation.validate().then(function(res) {
  if(res.Success === true) {
    console.log("User succesfully validated!")
  }
});
```
For your reference, the validation method on the API returns something like:
```
{
  Error: 'Welcome, YourName-goes-here!',
  Data: {},
  Success: true,
  StatusCode: 200
}
```

## Available resources and methods
Where you see `params` it is a plain JavaScript object, e.g. ``{ email: 'foo@example.com' }`` . It's used to encapsulate optional parameters, while the normal specified parameters are mandatory.
### balance resource
#### .retrieve()
Request the user's current balance, in USD.
### completions resource
#### .retrieve([params])
Get CueCompletions. It accepts filters:
 * for a particular Cue (`params.CueID`),
 * by CueCompletion (`params.CueCompletionID`)
 * or status (`params.Status`)

Accepts pagination (`params.Page`)
#### .approve(cueCompletionId)
Approve a CueCompletion that has been submitted to a user's Cue.
#### .decline(cueCompletionId)
Decline a CueCompletion that has been submitted to a user's Cue.
### cues resource
#### .retrieve([params])
Get a list of all the Cues the use has created. Some filters and the pagination option are available as parameters:
* params.CueID
* params.GroupID
* params.Status
* params.NoteToSelf
* params.Page

#### .create(title, amount, [params])
Create a new Cue. The only required parameters are the title, amount, and the number of opportunities (which defaults to 1 otherwise).

An iframe URL can be specified so the user would fill a custom form on a given URL (usually your site).

These are the different `params` you may want to pass:
* params.NumOpportunities (defaults to 1)
* params.Description
* params.IsAnonymous
* params.NoteToSelf
* params.Keywords
* params.iFrameURL
* params.LifetimeInMinutes
* params.PushNotificationOnCueCompletion
* params.DisallowAnonymousCueCompletions
* params.URLNotificationOnCueCompletion
* params.EmailNotificationOnCueCompletion
* params.TimeLimitToCompleteCueInMinutes
* params.AutoApproveCueCompletionAfterThisManyMinutes

#### .cancel(cueId)
Cancel a Cue that the user has posted, refunding their balance
#### .assign(cueId)
Try and check-in or check-out a Cue depending on whether the Cue is already checked out by that user.
#### .complete(assignmentId, [params])
#### .keywords()
Request common keywords for Cues, that are returned within a list.

This can be useful while creating Cues.
### payments resource
#### .retrieve([params])
Get a list of payments, with some options to filter. If no filter is provided, all payments will be returned.

Available filters:
* params.PaymentType
* params.PaymentID
* params.NoteToSelf
* params.Page

#### .deposit(amountUSD, ccLastFour)
Given a valid credit card on file in the app, this will deposit a given amount into the user's balance.
#### .withdraw(amountUSD)
Given a PayPal email, this will deposit the funds immediately into that user's PayPal account.
#### .bonus(cueCompletionId, amount, [params])
This will grant a bonus to the user who has completed a particular Cue for us. Possible `params` are:
* params.NoteToSelf
* params.Reason (defaults to "Thanks for your hard work!")

### validation resource
#### validate()
Test method to make sure that the user has valid API credentials.

For a more detailed explanation of each of the CueCloud API methods please visits the [CueClud API documentation](https://www.cuecloud.com/api/).

## Tests
`mocha` is used to run the set of resource and client methods tests.

To run the tests:
```bash
git clone git@github.com:cuecloud/cuecloud-node.git
cd cuecloud-node
npm install
mocha
```

## Copyright and license
Copyright 2014 CueCloud. Licensed under the MIT License.
