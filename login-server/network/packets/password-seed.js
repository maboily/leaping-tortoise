const GamePacket = require('network-protocol/base-packet').LengthTypedPacket,
    PacketField = require('network-protocol/base-packet').PacketField,
    BinaryTypes = require('network-protocol/binary-types'),
    PacketTypes = require('./login-packet-types');

class PasswordSeedPacket extends LengthTypedPacket {
    /**
     * @returns {Number}
     */
    get seed() {
        return this._seed;
    }

    /**
     *
     * @param {Number} value
     */
    set seed(value) {
        this._seed = value;
    }

    /**
     * @returns {Number}
     */
    get type() {
        return this._type;
    }

    /**
     *
     * @param {Number} value
     */
    set type(value) {
        this._type = value;
    }

    /**
     * @returns {Number}
     */
    get size() {
        return this._size;
    }

    /**
     *
     * @param {Number} value
     */
    set size(value) {
        this._size = value;
    }

    constructor() {
        super();

        this.type = PacketTypes.PasswordSeed;

        this._size = 0;
        this._type = 0;
        this._seed = 0;
    }
}

/**
 * @type [PacketField]
 */
PasswordSeedPacket.BaseStructure = [...GamePacket.BaseStructure, ...[
    new PacketField('size', new BinaryTypes.BinaryUInt16()),
    new PacketField('type', new BinaryTypes.BinaryUInt16()),
    new PacketField('seed', new BinaryTypes.BinaryUInt32())
]];

module.exports = PasswordSeedPacket;
