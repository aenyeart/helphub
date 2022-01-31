'use strict';

const ticketHandler = require('../helpTicket.js');

describe('testing the ticketHandler', () => {
  jest.spyOn(console, 'log');

  it ('should log a message containing a help ticket id', () => {
    const payload = {
      ticketId: 'jfcidkok621309'
    };
    ticketHandler(payload);
    expect(console.log).toHaveBeenCalled();
  });
});
