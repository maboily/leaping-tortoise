const GamePacket = require('network-protocol/base-packet').GamePacket,
    PacketField = require('network-protocol/base-packet').PacketField,
    BinaryTypes = require('network-protocol/binary-types'),
    PacketTypes = require('network-protocol/packet-types');

class AccountPacket extends GamePacket {
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
AccountPacket.BaseStructure = [...GamePacket.BaseStructure, ...[
    new PacketField('account', new BinaryTypes.BinaryFixedString(16)),
    new PacketField('encryptedPassword', new BinaryTypes.BinaryFixedString(16)),
    new PacketField('server', new BinaryTypes.BinaryFixedString(16))
]];

module.exports = AccountPacket;
