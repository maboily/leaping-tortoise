const
    AMQP = require('amqplib/callback_api'),
    Q = require('q');

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

module.exports = AMQPChannel;