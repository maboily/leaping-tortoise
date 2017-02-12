const
    AMQPConnectivity = require('amqp-protocol').Connectivity;

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
}).fail((error) => {
    logger.error("Failed to initialize AMQP");
    logger.error(error);
});




