var buffer = require('buffer');
var BinaryTypes = require('./binary-types.js');

class PacketField {
    /***
     * @param {String} name
     * @param {BinaryType} fieldType
     */
    constructor(name, fieldType) {
        this.name = name;
        this.fieldType = fieldType;
    }
}

class BasePacket {

}

class GamePacket {
    /**
     * @returns {Number}
     */
    get type() {
        return this._type;
    }

    /**
     * @param {Number} value
     */
    set type(value) {
        this._type = value;
    }

    /**
     * @returns {Number}
     */
    get length() {
        return this._length;
    }

    /**
     * @param {Number} value
     */
    set length(value) {
        this._length = value;
    }

    constructor() {
        this._length = 0;
        this._type = 0;
    }
}

/**
 * @type [PacketField]
 */
GamePacket.BaseStructure = [
    new PacketField('length', BinaryTypes.BinaryUInt16),
    new PacketField('type', BinaryTypes.BinaryUInt16)
];

var pkt = new GamePacket();

var PacketDirection = {
    serverToClient: 1,
    clientToServer: 2,
    both: 3
};

module.exports = {
    GamePacket: GamePacket,
    PacketDirection: PacketDirection,
    PacketField: PacketField
};



