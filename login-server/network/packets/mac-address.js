const GamePacket = require('network-protocol/base-packet').LengthTypedPacket,
    PacketField = require('network-protocol/base-packet').PacketField,
    BinaryTypes = require('network-protocol/binary-types'),
    PacketTypes = require('./login-packet-types');

class MacAddressPacket extends LengthTypedPacket {
    /**
     * @returns {String}
     */
    get macAddress() {
        return this._macAddress;
    }

    /**
     * @param {String} value
     */
    set macAddress(value) {
        this._macAddress = value;
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

        this.type = PacketTypes.MacAddress;

        this._accountId = 0;
        this._macAddress = "";
    }
}

/**
 * @type [PacketField]
 */
MacAddressPacket.BaseStructure = [...GamePacket.BaseStructure, ...[
    new PacketField('accountId', new BinaryTypes.BinaryUInt32()),
    new PacketField('macAddress', new BinaryTypes.BinaryFixedString(12)),
]];

module.exports = MacAddressPacket;
