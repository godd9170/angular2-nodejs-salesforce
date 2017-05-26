var express = require('express');
var router = express.Router();
var nforce = require('nforce'); // Salesforce REST Wrapper
var extractDomain = require('extract-domain'); //utility to normalize company domain
require('dotenv').config();

// declare axios for making http requests
const axios = require('axios');
const API = 'https://jsonplaceholder.typicode.com';

const EVENT_OBJECT = 'conference360__Event__c';
const SESSION_OBJECT = 'conference360__Session__c';
const SESSION_ATTENDEE_OBJECT = 'conference360__Session_Attendee__c';
const ATTENDEE_OBJECT = 'conference360__Attendee__c';
const CONTACT_OBJECT = 'Contact';
const ACCOUNT_OBJECT = 'Account';

// connect with Salesforce
var org = nforce.createConnection({
  clientId: process.env.SF_CLIENTID,
  clientSecret: process.env.SF_CLIENTSECRET,
  redirectUri: 'http://localhost:3000/oauth/_callback',
  apiVersion: 'v27.0',  // optional, defaults to current salesforce API version
  environment: 'production',  // optional, salesforce 'sandbox' or 'production', production default
  mode: 'single' // optional, 'single' or 'multi' user mode, multi default
});

//auth with Salesforce 
org.authenticate({ username: process.env.SF_USERNAME, password: process.env.SF_PASSWORD}, function(err, resp){
  // the oauth object was stored in the connection object
  if(!err) console.log('Cached Token: ' + org.oauth.access_token)
  else console.error('err: ', err)
});

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

//
// Get all events
//
router.get('/events', (req, res) => {
  // Get events from sf
  var query = `SELECT 
                  Id, 
                  Name, 
                  conference360__Start__c,
                  conference360__End__c,
                  conference360__Description__c,
                  conference360__Registered__c,
                  conference360__Status__c
                  FROM ${EVENT_OBJECT}`;
  org.query({query: query}, function(err, resp) {
    if(!err) {
      res.status(200).json(resp.records);
    } else {
      res.send(err.message);
    }
  });
});

//
// Get event details
//
router.get('/events/:id', (req, res) => {
  var eventId = req.params['id'];
  var event = nforce.createSObject('conference360__Event__c');
  event.set('Id', eventId);
  org.getRecord({ sobject : event})
  .then((eventObj) => {
    var response = eventObj.toJSON(); //we'll init the JSON response we're crafting as the event
    // Get sessions for given event
    var id = req.params['id'];
    var query = `SELECT 
                    Id, 
                    conference360__Capacity__c,
                    conference360__Remaining_Seats__c,
                    conference360__Start__c,
                    conference360__End__c,
                    conference360__Display_Name__c,
                    conference360__Status__c FROM ${SESSION_OBJECT} WHERE ${EVENT_OBJECT} = '${eventId}'`;
    org.query({query: query}, function(err, resp) {
      if(!err) {
        response['sessions'] = resp.records
        res.status(200).json(response);
      } else {
        res.send(err.message);
      }
    });
  })
});


//
// Register for event
//
router.post('/events/:id/register', (req, res) => {
  var eventId = req.params['id'];
  var email = req.body['email'];
  var domain = extractDomain(req.body['domain']);

  //get contact
  org.query({query: `SELECT Id FROM ${CONTACT_OBJECT} WHERE Email = '${email}'`})
  .then((resp) => {
    if(resp.totalSize > 0) { //check to see if this email has been registered before
      return resp.records[0]['_fields']['id']; //assume the first hit is the contact (email is unique)
    } else { //we need to make this contact
      //we'll get an account to store the company details
      return org.query({query: `SELECT Id FROM ${ACCOUNT_OBJECT} WHERE Website = '${domain}'`})
      .then((resp) => {
        if(resp.totalSize > 0) {
          return resp.records[0]['_fields']['id']; //assume the first hit is the account
        } else { //let's make a new account
          var account = nforce.createSObject('Account');
          account.set('Website', domain);
          account.set('Name', req.body['company']);
          return org.insert({ sobject : account })
          .then((resp) => {
            return resp['id'];
          })
        }
      })
      .then((accountId) => { //Let's make the contact
        var contact = nforce.createSObject('Contact');
        contact.set('Email', email);
        contact.set('Phone', req.body['phone']);
        contact.set('FirstName', req.body['first']);
        contact.set('LastName', req.body['last']);
        contact.set('AccountId', accountId);
        console.log('CONTACT SOBJECT: ', contact);
        return org.insert({ sobject: contact })
        .then((resp) => {
          return resp['id']
        });
      })
    }
  })
  .then((contactId) => { //let's make an attendee to the event
    var attendee = nforce.createSObject(ATTENDEE_OBJECT);
    attendee.set('conference360__Contact__c', contactId);
    attendee.set('conference360__Event__c', eventId);
    return org.insert({ sobject: attendee })
    .then((resp) => {
      return resp['id']
      //res.status(200).json(resp);
    });
  })
  .then((attendeeId) => { //finally let's register the user in some sessions
    const sessionRegister = (sessions) => {
      var sessionId = sessions.splice(0,1)[0];
      if (sessions.length < 1) {
        res.status(200).json("Success!"); //we're finally done
      } else {
        var sessionAttendee = nforce.createSObject(SESSION_ATTENDEE_OBJECT);
        sessionAttendee.set('conference360__Attendee__c', attendeeId);
        sessionAttendee.set('conference360__Session__c', sessionId); //splice off the next sessionId
        return org.insert({ sobject: sessionAttendee })
        .then((resp) => {
          return sessionRegister(sessions) //do it again
        });
      }
    }

    //Salesforce REST only let's this happen one at a time
    //So we loop until all the sessions are registered
    //NOTE: Investigate the Salesforce BULK API
    sessionRegister(req.body['sessions']); //register for all the sessions

  });
});

module.exports = router;
