'use strict';

const uuid = require('uuid').v4;
const socketio = require('socket.io');
const server = socketio(3000);
const helpHub = server.of('/caps');

let current = 0; // note that restarting server will reset ticket counter

const queue = {
  // tickets: {},
  // newTicket: function (ticket) {
  //   this.ticket[id] = ticket;
  //   return id;
  // },
  // removeTicket: function (id) {
  //   delete this.ticket[id];
  // },

  tickets: [],  // using array to model a FIFO queue: push() to add to end, shift() to pull from front.
  newTicket: function (ticket) {
    ticket.id = current;
    this.tickets.push(ticket);
    current++;
    return ticket.id;
  },
  removeTicket: function (id) {
    delete this.ticket[id];
  },

};

function logger(event, payload) {
  let timestamp = new Date();
  console.log('EVENT: ' + event, 'updatedAt: ', + timestamp);
  console.log(payload);
}

helpHub.on('connection', (socket) => {
  console.log(`socket.io is connected ${socket.id}`);

//   socket.on('join', ticketId => {
//     socket.join(ticketId);
//     helpHub.emit('join', ticketId);

//   });

  socket.on('Help Requested', (payload) => {
      socket.join(payload);
      helpHub.emit('join', payload);
      logger('Help Requested', payload);
  });















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


