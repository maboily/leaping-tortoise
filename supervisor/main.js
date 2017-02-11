var LoggerModule = require('logging/logger');
var AMQP = require('amqplib/callback_api');
var Q = require('q');

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


class AMQPConnection {
    /**
     *
     * @returns {Connection|CallbackModel}
     */
    get underlayingConnection() {
        return this._underlayingConnection;
    }

    constructor(amqpHost) {
        /** @type {Connection|CallbackModel} */
        this._underlayingConnection = null;
    }

    connect() {
        const defer = Q.defer();

        AMQP.connect('amqp://rabbitmq', (err, connection) => {
            if (err) {
                defer.reject(err);
            } else {
                this._underlayingConnection = connection;
                defer.resolve();
            }
        });

        return defer.promise;
    }
}


class AMQPChannel {
    /**
     * @returns {Channel|CallbackModel}
     */
    get underlayingChannel() {
        return this._underlayingChannel;
    }

    /**
     * @returns {AMQPConnection}
     */
    get amqpConnection() {
        return this._amqpConnection;
    }

    constructor(amqpConnection) {
        /** @type {AMQPConnection} */
        this._amqpConnection = amqpConnection;

        /** @type {Channel|CallbackModel} */
        this._underlayingChannel = null;
    }

    /**
     * @returns {*|Promise}
     */
    initialize() {
        const defer = Q.defer();

        if (!this._amqpConnection.underlayingConnection) {
            defer.reject("AMQP connection has not been established yet.");
        }

        this._amqpConnection.underlayingConnection.createChannel((err, channel) => {
            if (err) {
                defer.reject(err);
            } else {
                this._underlayingChannel = channel;
                defer.resolve();
            }
        });


        return defer.promise;
    }
}

// AMQP Base Connection
const baseAMQPConnection = new AMQPConnection('amqp://rabbitmq');
const baseAMQPChannel = new AMQPChannel(baseAMQPConnection);
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









