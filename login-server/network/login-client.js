const
    TCPClient = require('network-protocol').TCPServer.TCPClient;

class LoginClient extends TCPClient {
    /**
     * @param {Socket} socket
     * @param {LoginClientHandler} handler
     */
    constructor(socket, handler) {
        super(socket, handler);
    }
}

module.exports = LoginClient;