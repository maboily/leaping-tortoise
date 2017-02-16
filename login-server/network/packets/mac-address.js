const LengthTypedPacket = require('network-protocol').Packets.LengthTypedPacket,
    PacketField = require('network-protocol').Packets.PacketField,
    PacketsBinaryTypes = require('network-protocol').Packets.PacketsBinaryTypes,
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
MacAddressPacket.BaseStructure = [...LengthTypedPacket.BaseStructure, ...[
    new PacketField('accountId', new PacketsBinaryTypes.BinaryUInt32()),
    new PacketField('macAddress', new PacketsBinaryTypes.BinaryFixedString(12)),
]];

module.exports = MacAddressPacket;
