const
    net = require('net'),
    TCPClient = require('./tcp-client.js');

class TCPServer {
    /**
     * @returns {Socket}
     */
    get server() {
        return this._server;
    }

    /**
     * @returns {TCPClient}
     */
    get tcpClientHandler() {
        return this._tcpClientHandler;
    }

    /**
     * @param {TCPClient} value
     */
    set tcpClientHandler(value) {
        this._tcpClientHandler = value;
    }

    /**
     * @returns {Number}
     */
    get listeningPort() {
        return this._listeningPort;
    }

    /**
     * @param {Number} port
     * @param {TCPClientHandler} tcpClientHandler
     */
    constructor(port, tcpClientHandler) {
        /** @type {Number} */
        this._listeningPort = port;

        /** @type {TCPClientHandler} */
        this._tcpClientHandler = tcpClientHandler;

        /** @type {Server} */
        this._server = null;
    }

    listen() {
        this._server = net.createServer(this._onSocketConnect.bind(this));
        this._server.listen(this._listeningPort);
    }

    close() {
        this._server.close();
    }

    /**
     * @param {Socket} socket
     * @private
     */
    _onSocketConnect(socket) {
        this._tcpClientHandler.processSocketConnection(socket);
    }
}

module.exports = TCPServer;