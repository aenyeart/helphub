# The HelpHub 

Welcome to the Help Hub. This is a place where clients can request help for various issues and receive real-time support from service workers via "help tickets" that contain their specific request.

* Once a request for help is sent from the customer it is logged in the Hub.
* Once the Hub has received the request, it assigns a unique identifier in the form of a 'ticket number.'
* The Hub assigns each ticket to a 'Worker' for assignment.
* When the help is 'delivered' and is complete, the worker sends confirmation to the Hub.
* The Hub logs the completion and closes the ticket.
* Everyone goes home happy.

## UML 

![Help Center UML](UML.jpg)

## Authors
**Andrew 'I have a question' Enyeart**
**Jacob 'insert clever saying here' Choi**
**Señor Joey "Call me Joey" Hernandez**
**Dario 'the kid' Vitorte**

### Deployed Site
[This is the deployed site](thisIsTheHroku.com)

### Installation

**Step One**

begin by running: `git clone` git@github.com:aenyeart/helphub.git 
Also run this as well: `git clone` git@github.com:aenyeart/helphub-client.git

**Step Two**

run: `cd helphub` 
then: `npm install`

*repeat this for 'helphub client'*

### How to Use

**To start server**

run `npm start` 

**To test server**

run `npm run test`

### Models

**Customer**

'Customer', {
    username: string, required,
    description: string, required,
}

**Service Worker**

'Worker', {
  name: string, required,
  description: string, required,
}

**Help Ticket**

Ticket', {
  number: number, required,
  request: string, required,
  type: ('lab', 'help'), required,
}

### Routes

`api/v1` (no authentication required).

`POST /:model` requires model param and object returns created objects from database.

`GET /:model` requires model param returns all objects from model database table.

`GET /:model/:id` requires model and id params returns object in model database with that specific id.

`PUT /:model/:id` requires model and id params plus object to update returns updated object.

`DELETE /:model/:id` requires model and id params returns status code either successful or not.

**Customer**

`POST /request`, requires a customer object: returns created customer object from database.

**Service Worker**

`POST /worker`, requires a user object: returns worker object from database with token.

**Help Tickets**

`GET /tickets`, requires a validated token: returns array containing the help ticket request in the database.

## Features

**Help Ticket Assignment**

* When the object is passed, a help ticket is assigned with a unique number.
* tickets are received and logged.
* tickets are closed when help is complete.

**Error Handling**

sends a `404 error` if the route or method is unavailable.

### Testing

The testing serves to verify complete testing of the routers middleware, and the basic functionality of the help ticket console.

### Credit and Co-Conspirators

This lovely code was largley written by the immaculate **Andrew Enyeart** and **Jacob Choi**. **Joey Hernandez** dutifully provided snarky commentary and moral support, some coding, some writing (as you are reading) yup. No one is really sure where **Dario Diorte** is at the moment, but we are hoping for a full recovery.
