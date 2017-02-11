const GamePacket = require('network-protocol/base-packet').LengthTypedPacket,
    PacketField = require('network-protocol/base-packet').PacketField,
    BinaryTypes = require('network-protocol/binary-types'),
    PacketTypes = require('./login-packet-types');

class ConnectPacket extends LengthTypedPacket {
    /**
     * @returns {Number}
     */
    get macAddress() {
        return this._macAddress;
    }

    /**
     * @param {Number} value
     */
    set macAddress(value) {
        this._macAddress = value;
    }

    /**
     * @returns {Number}
     */
    get data() {
        return this._data;
    }

    /**
     * @param {Number} value
     */
    set data(value) {
        this._data = value;
    }

    /**
     * @returns {Number}
     */
    get accountId() {
        return this._accountId;
    }

    /**
     * @param {Number} value
     */
    set accountId(value) {
        this._accountId = value;
    }

    constructor() {
        super();

        this.type = PacketTypes.Connect;

        this._accountId = 0;
        this._data = 0;
        this._macAddress = 0;
    }
}

/**
 * @type [PacketField]
 */
ConnectPacket.BaseStructure = [...GamePacket.BaseStructure, ...[
    new PacketField('accountId', new BinaryTypes.BinaryUInt32()),
    new PacketField('data', new BinaryTypes.BinaryUInt32()),
    new PacketField('macAddress', new BinaryTypes.BinaryUInt32())
]];

module.exports = ConnectPacket;
