class TCPClientHandler {
    /**
     * @param {Socket} socket
     */
    processSocketConnection(socket) {
        throw "processSocketConnection is not defined.";
    }

    /**
     * @param {TCPClient} tcpClient
     * @param {Buffer} bytes
     */
    processReadBytes(tcpClient, bytes) {
        throw "processAfterReadBytes is not defined.";
    }

    /**
     * @param {TCPClient} tcpClient
     */
    processBeforeSendBytes(tcpClient) {
        throw "processBeforeSendBytes is not defined.";
    }

    /**
     * @param {TCPClient} tcpClient
     * @param {Buffer} bytes
     */
    processAfterSendBytes(tcpClient, bytes) {
        throw "processAfterSendBytes is not defined.";
    }

    /**
     * @param {TCPClient} tcpClient
     */
    processClientDisconnection(tcpClient) {
        throw "processClientDisconnection is not defined.";
    }
}

module.exports = TCPClientHandler;