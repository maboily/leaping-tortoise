console.log("Login server starting");

let AccountPacket = require('./network/packets/account.js');

var packet = new AccountPacket();
packet.getDirection();


