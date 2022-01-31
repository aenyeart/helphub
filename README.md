# The HelpHub 

Welcome to the Help Hub. This is a place where clients can request help for various issues and receive real-time support from service workers via "help tickets" that contain their specific request.

## Problem Domain

- Build a application with a support/service center where customers place requests for help (tickets) and service workers assist and close tickets.

## User Stories

- As a Customer, I want to request help and have a Service Worker assist me.
- As a Service Worker I want to be assigned a help ticket assigned to a Customer's id.
- As a customer, I want to alert the system when I place in a help request and a ticket has been issued to me.
- As a service worker, I want to alert the system when a "help" ticket has been requested.
- As a service worker, I want to alert the system when the "help" ticket is in progress with the customer.
- As a customer, I want to alert the system when help is in progress. 
- As a service Worker, I want to alert the system when the "help" ticket is complete.
- As a Customer, I want to be disconnected and my help ticket closed when "help" is complete.

## UML 

![Help Center UML](UML.jpg)

## Authors
**Andrew** *'I have a question'* **Enyeart**
**Jacob** *'insert clever saying here'* **Choi**
**Señor Joey** *"Call me Joey"* **Hernandez**
**Dario** *'the invisible kid'* **Vitorte**

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

* When the object is passed, a help ticket is assigned with a unique number (id).
* tickets are received and logged.
* tickets are closed when help is complete.

**Error Handling**

sends a `404 error` if the route or method is unavailable.

### Testing

The testing serves to verify complete testing of the routers middleware, and the basic functionality of the help ticket console.

### Credit and Co-Conspirators

This lovely code was largely written by the immaculate **Andrew Enyeart** and **Jacob Choi**. **Joey Hernandez** dutifully provided snarky commentary and moral support, some coding, some writing (as you are reading) and, yup. No one is really sure where **Dario Diorte** is, we were thinking homing pigeons next, maybe.
