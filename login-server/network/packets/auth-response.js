const LengthTypedPacket = require('network-protocol').Packets.LengthTypedPacket,
    PacketField = require('network-protocol').Packets.PacketField,
    PacketsBinaryTypes = require('network-protocol').Packets.PacketsBinaryTypes,
    PacketTypes = require('./login-packet-types');

class AuthResponsePacket extends LengthTypedPacket {
    /**
     * @returns {Number}
     */
    get serverPort() {
        return this._serverPort;
    }

    /**
     * @param {Number} value
     */
    set serverPort(value) {
        this._serverPort = value;
    }

    /**
     * @returns {String}
     */
    get serverIp() {
        return this._serverIp;
    }

    /**
     * @param {String} value
     */
    set serverIp(value) {
        this._serverIp = value;
    }

    /**
     * @returns {Number}
     */
    get unknownData() {
        return this._unknownData;
    }

    /**
     * @param {Number} value
     */
    set unknownData(value) {
        this._unknownData = value;
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

        this.type = PacketTypes.AuthResponse;

        this._accountId = 0;
        this._unknownData = 0;
        this._serverIp = "";
        this._serverPort = 0;
    }
}

/**
 * @type [PacketField]
 */
AuthResponsePacket.BaseStructure = [...LengthTypedPacket.BaseStructure, ...[
    new PacketField('accountId', new PacketsBinaryTypes.BinaryUInt32()),
    new PacketField('unknownData', new PacketsBinaryTypes.BinaryUInt32()),
    new PacketField('serverIp', new PacketsBinaryTypes.BinaryFixedString(16)),
    new PacketField('serverPort', new PacketsBinaryTypes.BinaryUInt32())
]];

module.exports = AuthResponsePacket;
