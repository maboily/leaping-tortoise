const GamePacket = require('network-protocol/base-packet').GamePacket,
    PacketField = require('network-protocol/base-packet').PacketField,
    BinaryTypes = require('network-protocol/binary-types');

class MacAddressPacket extends GamePacket {
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
