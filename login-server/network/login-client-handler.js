const
    LoginClient = require('./login-client'),
    TCPClientHandler = require('network-protocol').TCPServer.TCPClientHandler;

class LoginClientHandler extends TCPClientHandler {
    constructor() {
        super();
    }

    /**
     * @param {Socket} socket
     */
    processSocketConnection(socket) {
        logger.verbose("Socket connected");

        const loginClient = new LoginClient(socket, this);
    }

    /**
     * @param {TCPClient} tcpClient
     * @param {Buffer} bytes
     */
    processReadBytes(tcpClient, bytes) {
        logger.verbose("Received bytes from socket");

        tcpClient.sendBytes(bytes);
    }

    /**
     * @param {TCPClient} tcpClient
     */
    processBeforeSendBytes(tcpClient) {

    }

    /**
     * @param {TCPClient} tcpClient
     * @param {Buffer} bytes
     */
    processAfterSendBytes(tcpClient, bytes) {
        logger.verbose("Sent bytes to socket");
    }

    /**
     * @param {TCPClient} tcpClient
     */
    processClientDisconnection(tcpClient) {
        logger.verbose("Client disconnected");
    }
}

module.exports = LoginClientHandler;