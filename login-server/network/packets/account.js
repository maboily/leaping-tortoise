const LengthTypedPacket = require('network-protocol').Packets.LengthTypedPacket,
    PacketField = require('network-protocol').Packets.PacketField,
    PacketsBinaryTypes = require('network-protocol').Packets.PacketsBinaryTypes,
    PacketTypes = require('./login-packet-types');

class AccountPacket extends LengthTypedPacket {
    /***
     * @returns {String}
     */
    get server() {
        return this._server;
    }

    /**
     *
     * @param {String} value
     */
    set server(value) {
        this._server = value;
    }

    /***
     * @returns {String}
     */
    get encryptedPassword() {
        return this._encryptedPassword;
    }

    /**
     *
     * @param {String} value
     */
    set encryptedPassword(value) {
        this._encryptedPassword = value;
    }

    /***
     * @returns {String}
     */
    get account() {
        return this._account;
    }

    /**
     *
     * @param {String} value
     */
    set account(value) {
        this._account = value;
    }

    constructor() {
        super();

        this.type = PacketTypes.Account;

        this._account = "";
        this._encryptedPassword = "";
        this._server = "";
    }
}

/**
 * @type [PacketField]
 */
AccountPacket.BaseStructure = [...LengthTypedPacket.BaseStructure, ...[
    new PacketField('account', new PacketsBinaryTypes.BinaryFixedString(16)),
    new PacketField('encryptedPassword', new PacketsBinaryTypes.BinaryFixedString(16)),
    new PacketField('server', new PacketsBinaryTypes.BinaryFixedString(16))
]];

module.exports = AccountPacket;
