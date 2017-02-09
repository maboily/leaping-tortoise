console.log("Login server starting");

let BasePacket = require('network-protocol/base-packet');
let AccountPacket = require('./network/packets/account.js');

let assembler = new BasePacket.PacketAssembler();
let packetTest = new AccountPacket();
assembler.correctLength(packetTest);
console.log(assembler.serializeToBuffer(packetTest));
console.log(packetTest);
