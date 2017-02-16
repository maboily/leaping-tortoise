class TCPClient {
    /**
     * @returns {TCPClientHandler}
     */
    get handler() {
        return this._handler;
    }

    /**
     * @param {TCPClientHandler} value
     */
    set handler(value) {
        this._handler = value;
    }

    /**
     * @returns {Socket}
     */
    get socket() {
        return this._socket;
    }

    /**
     * @param {Socket} socket
     * @param {TCPClientHandler} handler
     */
    constructor(socket, handler) {
        /** @type {TCPClientHandler} */
        this._handler = handler;

        /** @type {Socket} */
        this._socket = socket;

        this._bindSocketEvents();
    }

    /**
     * @param {Buffer} bytes
     */
    sendBytes(bytes) {
        this._handler.processBeforeSendBytes(this, bytes);
        this._socket.write(bytes);
        this._handler.processAfterSendBytes(this, bytes);
    }

    /**
     * @private
     */
    _bindSocketEvents() {
        this._socket.on('data', this._receiveBytes.bind(this));
        this._socket.on('close', this._handler.processClientDisconnection.bind(this._handler, this));
    }

    /**
     * @private
     */
    _receiveBytes(bytes) {
        this._handler.processReadBytes(this, bytes);
    }
}

module.exports = TCPClient;