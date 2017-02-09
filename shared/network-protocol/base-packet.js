var buffer = require('buffer');
var BinaryTypes = require('./binary-types.js');

class PacketField {
    /**
     * @returns {BinaryType}
     */
    get fieldType() {
        return this._fieldType;
    }

    /**
     * @param {BinaryType} value
     */
    set fieldType(value) {
        this._fieldType = value;
    }

    /**
     * @returns {String}
     */
    get name() {
        return this._name;
    }

    /**
     * @param {String} value
     */
    set name(value) {
        this._name = value;
    }
    /***
     * @param {String} name
     * @param {BinaryType} fieldType
     */
    constructor(name, fieldType) {
        this._name = name;
        this._fieldType = fieldType;
    }
}

class BasePacket {

}

/**
 * @type [PacketField]
 */
BasePacket.BaseStructure = [];

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
    new PacketField('length', new BinaryTypes.BinaryUInt16()),
    new PacketField('type', new BinaryTypes.BinaryUInt16())
];

class PacketAssembler {
    /**
     * @param {Buffer} buffer
     */
    deserializeFromBuffer(packetType, buffer) {
        let assembledPacket = new packetType();
        let offset = 0;

        for (const field of packetType.BaseStructure) {
            const fieldValue = field.fieldType.readFromBuffer(buffer, offset);
            offset += field.fieldType.getByteSize(fieldValue);
            assembledPacket[field.name] = fieldValue;
        }

        return assembledPacket;
    }

    /**
     * @param {BasePacket} packet
     */
    serializeToBuffer(packet) {
        let buffers = [];

        for (const field of packet.constructor.BaseStructure) {
            const fieldValue = packet[field.name];
            const tmpBuffer = new Buffer(field.fieldType.getByteSize(fieldValue));
            field.fieldType.writeToBuffer(tmpBuffer, fieldValue, 0);
            buffers.push(tmpBuffer);
        }

        return Buffer.concat(buffers);
    }
}

module.exports = {
    GamePacket: GamePacket,
    PacketField: PacketField,
    PacketAssembler: PacketAssembler
};



