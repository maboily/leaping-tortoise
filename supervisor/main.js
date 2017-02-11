const
    LoggerModule = require('logging/logger'),
    AMQPConnectivity = require('amqp-protocol').Connectivity;

// Setup local logger
/** @type {Logger} */
global.logger = new LoggerModule.Logger(
    [new LoggerModule.ConsoleAppender()],
    LoggerModule.VerboseFlagsValues.LogDebug |
    LoggerModule.VerboseFlagsValues.LogErrors |
    LoggerModule.VerboseFlagsValues.LogVerbose |
    LoggerModule.VerboseFlagsValues.LogWarnings |
    LoggerModule.VerboseFlagsValues.LogInfo,
    "[%v] %s"
);

logger.writeInfo("Starting MQ Supervisor...");


// AMQP Base Connection
const baseAMQPConnection = new AMQPConnectivity.AMQPConnection('amqp://rabbitmq');
const baseAMQPChannel = new AMQPConnectivity.AMQPChannel(baseAMQPConnection);
const baseAMQPQueue = new AMQPConnectivity.AMQPQueue('nodes-status', baseAMQPChannel);
baseAMQPConnection.connect().
    then(() => {
        logger.writeVerbose("Connected to AMQP");

        return baseAMQPChannel.initialize();
    }).
    then(() => {
        logger.writeVerbose("Initialized base AMQP communication channel");
    }).
    fail((error) => {
        logger.writeError("Failed to initialize AMQP");
        logger.writeError(error);
    });


