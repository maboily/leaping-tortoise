const
    PacketField = require('./packet-field'),
    BasePacket = require('./base-packet'),
    BinaryTypes = require('packets-binary-types');

class LengthTypedPacket extends BasePacket {
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
        super();

        this._length = 0;
        this._type = 0;
    }
}

/**
 * @type [PacketField]
 */
LengthTypedPacket.BaseStructure = [
    new PacketField('length', new BinaryTypes.BinaryUInt16()),
    new PacketField('type', new BinaryTypes.BinaryUInt16())
];

module.exports = LengthTypedPacket;