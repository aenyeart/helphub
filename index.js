'use strict';

const uuid = require('uuid').v4;
const socketio = require('socket.io');
const server = socketio(3000);
const helpHub = server.of('/help');

let current = 0; // note that restarting server will reset ticket counter

const queue = {
  tickets: [],  // using array to model a FIFO queue: push() to add to end, shift() to pull from front.
  newTicket: function (ticket) {
    ticket.id = current;
    this.tickets.push(ticket);
    current++;
    return ticket.id;
  },
  removeTicket: function (id) {
    delete queue.ticket[id];
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

helpHub.on('connection', (socket) => {
  console.log(`socket.io is connected ${socket.id}`); // TODO might need to assign id on Client.. check this.

  // TODO want to emit to this socket "you are connected" or "Ready for request"

  socket.on('Help Requested', (payload) => {
      socket.join(payload.username); // TODO needs to be more specific on payload either payload id or payload username
      // socket.join('boogers'); // .join('boogers')
      // // in order to send messages to only sockets that are 'in' this room:
      // helpHub.to('boogers').emit('picking');
      // socket.broadcast('picking');



      logger('Help Requested', payload);
  });

  socket.on('Assinging ticket', payload => {
    socket.
  },


  socket.on('Complete', (payload) => {
    logger('Complete', payload);
    socket.emit('Complete', payload);
    delete queue[payload.ticket.id];

   


  })


/*
ORDER OF OPERATIONS:
- customer requests help  (new 'pickup')
- hub generates ticket in queue (pickup event in queue for drivers)
- hub returns confirmation to customer (---)
- hub assigns ticket to worker (driver picks up package, emits 'in-transit')
- if worker available, worker gets ticket, sends 'in-progress' to hub ('in-transit')
- hub sends 'in-progress' to customer (not exact, but similar to 'delivered' message to vendor)
- worker sends 'complete' to hub ('delivered')

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


