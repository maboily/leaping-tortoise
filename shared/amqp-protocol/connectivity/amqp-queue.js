class AMQPQueue {
    /**
     * @returns {AMQPChannel}
     */
    get channel() {
        return this._channel;
    }

    /**
     * @returns {String}
     */
    get queueName() {
        return this._queueName;
    }

    /**
     * @param {String} queueName
     * @param {AMQPChannel} channel
     */
    constructor(queueName, channel) {
        this._queueName = queueName;
        this._channel = channel;
    }
}

module.exports = AMQPQueue;