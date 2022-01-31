'use strict';

const uuid = require('uuid').v4;
const socketio = require('socket.io');
const server = socketio(3000);
const helpHub = server.of('/help');

const queue = {
  tickets: [],  // using array to model a FIFO queue: push() to add to end, shift() to pull from front.
  newTicket: function (ticket) {
    this.tickets.push(ticket);
    return ticket.id;
  },
  removeTicket: function (id) {
    //delete queue.ticket[id];
    return queue.tickets.shift();
  },
};

// class event {  // not being used anywhere yet
//   constructor(event, time, payload) {
//     this.event = event;
//     this.time = time;
//     this.payload = payload;
//   }
// }

function logger(event, payload) {
  let timestamp = new Date();
  console.log('EVENT: ' + event, 'updatedAt: ', + timestamp);
  console.log(payload);
}

// HelpHub connected 
helpHub.on('connection', (socket) => {
  console.log(`socket.io is connected ${socket.id}`);
  // socket.join(socket.id); 
  socket.emit('Ready For Request', { customerSocket: socket.id }); // emit to CUSTOMER helphub is ready

  socket.on('Help Requested', (payload) => { 
    logger('Help Requested', payload); // log help requested

    // generate a ticket
    let ticket = {
      username: payload.username,
      description: payload.description,
      id: socket.id,
    }

    queue.newTicket(ticket); // add it to queue
    socket.emit('Ticket Generated', ticket.id); // emit to CUSTOMER that ticket is generated
    logger('Ticket Generated', ticket); // log ticket generation
  });
// when WORKER client signs in or completes a ticket, emits "standing by"
  
// SERVER listens for 'standing by',
  socket.on('Standing By', (payload) => {
    console.log(payload);
  });
  // SERVER on 'standing by' pops next ticket off queue, assigns to that WORKER via payload
  socket.on('Standing By', (socket) => {
    console.log(queue.tickets);
    let currentTicket = queue.removeTicket();
    socket.emit('Assigning Ticket', currentTicket); // emits to socket the returned val of callback (which is the next ticket in queue)
    socket.broadcast.to(payload.ticket.id).emit('Assigning Ticket', currentTicket, socket.id, worker.id); // TEST do all these arguments get packaged together as 'payload'?
  });
  // SERVER emits to CUSTOMER and WORKER 'assigning ticket' 
  helpHub.on('Assigning Ticket', (payload) => { // TEST does this listen to its own emission / utterance ?
  
    logger('Ticket Assigned', worker.id);
  });
  // on 'assigning ticket' WORKER emits in-progress
  
  // --> SERVER relays 'in-progress' to CUSTOMER
  socket.emit('In-Progress', socket.id)
  // setTimeout, WORKER emits 'Complete'
  // --> SERVER relays 'complete' to CUSTOMER

  // --> CUSTOMER logs 'complete', disconnects socket
  // WORKER emits 'standing by'

  socket.on('Assigning Ticket', payload => {
    // socket.
  });

// Help rendered, ticket complete
  socket.on('Complete', (payload) => {
    logger('Complete', payload); // log ticket completion
    socket.emit('Complete', payload); // emit complete
  })


/*
ORDER OF OPERATIONS:
- CUSTOMER requests help  (new 'pickup')
- hub generates ticket in queue (pickup event in queue for drivers)
- hub returns confirmation to CUSTOMER (---)
- hub assigns ticket to WORKER (driver picks up package, emits 'in-transit')
- if WORKER available, WORKER gets ticket, sends 'in-progress' to hub ('in-transit')
- hub sends 'in-progress' to CUSTOMER (not exact, but similar to 'delivered' message to vendor)
- WORKER sends 'complete' to hub ('delivered')

*/













//     let id = queue.addTicket(payload);
//     let message = `Your request for help has been received. Your help ticket number is ${id} out of ${queue.tickets.length}`
//     socket.emit('Ticket Generated', { id, payload });
//     logger('Help Requested', payload);
//   });

//   socket.on('Currently Helping', (payload) => {
//     helpHub.to(payload.ticketId).emit('Currently Helping', payload);
//     logger('Currently Helping', payload);
//   });

//   socket.on('Help ticket is closed', payload => {
//     console.log(queue);
//     queue.removeOrders(payload.id);
//     helpHub.to(payload.ticketId).emit('Help ticket is closed', payload);
//     logger('Help ticket is closed', payload);
//   });

// });

// ticket.on('connection', (socket) => {
//   socket.on('add ticket', ticket);
//   ticket.emit('ticket added', payload);
// });

  // socket.broadcast.to('ID').emit( 'send msg', {somedata : somedata_server} );