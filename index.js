'use strict';

const uuid = require('uuid').v4;
const socketio = require('socket.io');
const server = socketio(process.env.PORT || 3000);
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

function logger(event, payload) {
  let timestamp = new Date();
  console.log('EVENT: ' + event, 'updatedAt: ', + timestamp);
  console.log(payload);
}

// HelpHub connected 
helpHub.on('connection', (socket) => {
  console.log(`New socket is connected: ${socket.id}`);
  socket.emit('Ready For Request', { clientSocket: socket.id }); // emit to CUSTOMER helphub is ready

  socket.on('Help Requested', (payload) => { 
    logger('Help Requested', payload); // log help requested

    // generate a ticket
    let ticket = {
      username: payload.username,
      description: payload.description,
      id: socket.id,
    };

    queue.newTicket(ticket); // add it to queue
    helpHub.emit('Ticket Generated', ticket.id); // emits to ALL that ticket is generated
    /* 
    * PROBLEM: This is showing up on other customers' terminals.
    * SOLUTION: Create a room for workers, then selectively broadcast 'ticket generated' to only the specific customer, and the workers room. 
    */


    logger('Ticket Generated', ticket); // log ticket generation
  });
  // when WORKER client signs in or completes a ticket, emits "standing by"
  
  // SERVER on 'standing by' pops next ticket off queue, assigns to that WORKER via payload
  socket.on('Standing By', (payload) => {
    logger('Standing By', payload);

    if (queue.tickets.length > 0) {
      let currentTicket = queue.removeTicket();
      console.log(`TICKET POPPED FROM QUEUE`);
      console.log(currentTicket);
      console.log('queue.tickets', queue.tickets);
      socket.emit('Assigning Ticket', currentTicket); // this goes to WORKER
      socket.broadcast.to(payload.id).emit('Assigning Ticket', currentTicket); // this goes to CUSTOMER
    } else {
      socket.emit('No tickets available'); // this goes to WORKER
    }
  });

  // on 'assigning ticket' WORKER emits in-progress
  // --> SERVER relays 'in-progress' to CUSTOMER
  helpHub.on('In Progress', (socket) => {
    socket.emit('In-Progress', socket.id);
    logger('In Progress', socket.id);
  });
  // setTimeout, WORKER emits 'Complete'
  // --> SERVER relays 'complete' to CUSTOMER
  helpHub.on('Complete', (payload) => {
    socket.broadcast.to(payload.ticket.id).emit('Complete', payload.ticket);
    logger('Complete', payload.ticket);
  });
 
});
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
// // --> CUSTOMER logs 'complete', disconnects socket
//   socket.on("Help Complete Disconnecting", () => {
//     console.log(socket.id); // the Set contains at least the socket ID
//   });
  
//   socket.on("disconnect", () => {
//     // socket.rooms.size === 0
//   });
// });



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

  // socket.broadcast.to('ID').emit( 'send msg', {somedata : somedata_server} );//


// class event {  // not being used anywhere yet
//   constructor(event, time, payload) {
//     this.event = event;
//     this.time = time;
//     this.payload = payload;
//   }
// }
