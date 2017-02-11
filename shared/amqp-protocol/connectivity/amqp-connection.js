const
    AMQP = require('amqplib/callback_api'),
    Q = require('q');

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

module.exports = AMQPConnection;