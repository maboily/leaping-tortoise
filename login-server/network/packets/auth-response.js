const GamePacket = require('network-protocol/base-packet').GamePacket,
    PacketField = require('network-protocol/base-packet').PacketField,
    BinaryTypes = require('network-protocol/binary-types');

class AuthResponsePacket extends GamePacket {
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

        this._accountId = 0;
        this._unknownData = 0;
        this._serverIp = "";
        this._serverPort = 0;
    }
}

/**
 * @type [PacketField]
 */
AuthResponsePacket.BaseStructure = [...GamePacket.BaseStructure, ...[
    new PacketField('accountId', new BinaryTypes.BinaryUInt32()),
    new PacketField('unknownData', new BinaryTypes.BinaryUInt32()),
    new PacketField('serverIp', new BinaryTypes.BinaryFixedString(16)),
    new PacketField('serverPort', new BinaryTypes.BinaryUInt32())
]];

module.exports = AuthResponsePacket;
