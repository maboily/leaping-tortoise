const
    LoginClient = require('./login-client'),
    TCPClientHandler = require('network-protocol').TCPServer.TCPClientHandler,
    PacketAssembler = require('network-protocol').Packets.PacketAssembler,

    LengthTypedPacket = require('network-protocol/packets/length-typed-packet'),
    LoginPackets = require('./packets'),
    LoginPacketTypes = require('./packets/login-packet-types');

class LoginClientHandler extends TCPClientHandler {
    constructor() {
        super();

        /** @type {PacketAssembler} */
        this._packetAssembler = new PacketAssembler();
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

        const basePacket = this._packetAssembler.deserializeFromBuffer(LengthTypedPacket, bytes);

        console.log(basePacket);

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