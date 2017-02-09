var GamePacket = require('network-protocol/base-packet').GamePacket;
var PacketField = require('network-protocol/base-packet').PacketField;
var BinaryTypes = require('network-protocol/binary-types');

class ConnectPacket extends GamePacket {
}

/**
 * @type [PacketField]
 */
ConnectPacket.BaseStructure = GamePacket.BaseStructure + [
    new PacketField('accountId', BinaryTypes.BinaryUInt32),
    new PacketField('data', BinaryTypes.BinaryUInt32),
    new PacketField('macAddress', BinaryTypes.BinaryUInt32)
];




module.exports = ConnectPacket;