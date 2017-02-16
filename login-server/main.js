const
    AMQPConnectivity = require('amqp-protocol').Connectivity,
    TCPServer = require('network-protocol').TCPServer.TCPServer,
    LoginClientHandler = require('./network/login-client-handler');

// Setup logger
/** @type {winston} */
global.logger = require('winston');
logger.level = 'debug';

// Startup AMQP
const baseAMQPConnection = new AMQPConnectivity.AMQPConnection('amqp://rabbitmq');
const baseAMQPChannel = new AMQPConnectivity.AMQPChannel(baseAMQPConnection);
const baseAMQPQueue = new AMQPConnectivity.AMQPQueue('nodes-status', baseAMQPChannel);
baseAMQPConnection.connect().then(() => {
    logger.verbose("Connected to AMQP");

    return baseAMQPChannel.initialize();
}).then(() => {
    logger.verbose("Login server is starting...");

    // Startup TCPServer
    const loginClientHandler = new LoginClientHandler();
    const loginServer = new TCPServer(9958, loginClientHandler);
    loginServer.listen();
    logger.info("Listening on port " + loginServer.listeningPort);

}).fail((error) => {
    logger.error("Failed to initialize AMQP");
    logger.error(error);
});

