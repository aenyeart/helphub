'use strict';

const socketio = require('socket.io-client');

let HOST = 'http://localhost:3000';
let namespace = '/helpHub';
let description = process.env;

const socket = socket.io.connect(`${HOST}${namespace}`);


socket.on('connect', () => {
  let payload = {
    username: 'BillyBobJr',
    description: 'Help on lab 13',
    ticket: ticket,

  };
  socket.emit('join', payload.ticket.id);
  socket.on('Help Requested', payload);
  socket.on('Assinging Ticket', console.log);
  socket.on('Complete', console.log);

});

