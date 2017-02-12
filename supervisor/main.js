const
    AMQPConnectivity = require('amqp-protocol').Connectivity;

// Setup logger
/** @type {winston} */
global.logger = require('winston');
logger.level = 'debug';
logger.info("Starting MQ Supervisor...");

class AMQPLoggerConsumer {
    /**
     * @returns {String}
     */
    get queueName() {
        return this._queueName;
    }

    /**
     * @returns {AMQPChannel}
     */
    get amqpChannel() {
        return this._amqpChannel;
    }

    /**
     * @param {AMQPChannel} amqpChannel
     */
    constructor(amqpChannel, queueName) {
        /** @type {AMQPChannel} */
        this._amqpChannel = amqpChannel;

        /** @type {String} */
        this._queueName = queueName;
    }

    consumeChannel() {
        this._amqpChannel.underlayingChannel.assertQueue(this._queueName);
        this._amqpChannel.underlayingChannel.consume(this._queueName, this._receiveLogMessage);
    }

    /**
     * @param {object} message
     * @private
     */
    _receiveLogMessage(message) {
    }
}


// AMQP Base Connection
const baseAMQPConnection = new AMQPConnectivity.AMQPConnection('amqp://rabbitmq');
const baseAMQPChannel = new AMQPConnectivity.AMQPChannel(baseAMQPConnection);
const baseAMQPQueue = new AMQPConnectivity.AMQPQueue('nodes-status', baseAMQPChannel);
baseAMQPConnection.connect().then(() => {
    logger.verbose("Connected to AMQP");

    return baseAMQPChannel.initialize();
}).then(() => {
    logger.verbose("Initialized base AMQP communication channel");

    const amqpLogConsumer = new AMQPLoggerConsumer(baseAMQPChannel, 'logging');
    amqpLogConsumer.consumeChannel();

    logger.verbose("Started consuming AMQP logging channel");
}).fail((error) => {
    logger.error("Failed to initialize AMQP");
    logger.error(error);
});


