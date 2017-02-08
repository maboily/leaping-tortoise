class BasePacket {
    getDirection() {
        throw 'Direction not defined for packet ' + this.constructor.name;
    }
}


var PacketDirection = {
    serverToClient: 1,
    clientToServer: 2,
    both: 3
};

module.exports = {
    BasePacket: BasePacket,
    PacketDirection: PacketDirection
};



