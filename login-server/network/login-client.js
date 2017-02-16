const
    AuthCryptographer = require('network-protocol').Cryptography.AuthCryptographer,
    TCPClient = require('network-protocol').TCPServer.TCPClient;

class LoginClient extends TCPClient {
    /**
     * @returns {AuthCryptographer}
     */
    get cryptographer() {
        return this._cryptographer;
    }

    /**
     * @param {Socket} socket
     * @param {LoginClientHandler} handler
     */
    constructor(socket, handler) {
        super(socket, handler);

        this._cryptographer = new AuthCryptographer();
    }

    /**
     * @param {Buffer} bytes
     */
    sendBytes(bytes) {
        // Encrypt buffer before sending
        this._cryptographer.encrypt(bytes);

        super.sendBytes(bytes);
    }

    /**
     * @param {Buffer} bytes
     */
    receiveBytes(bytes) {
        // Decrypt bytes before processing
        this._cryptographer.decrypt(bytes);

        super.receiveBytes(bytes);
    }
}

module.exports = LoginClient;