const LoggerAppender = require('./logger-appender');

class ConsoleAppender extends LoggerAppender {
    constructor() {
        super();
    }

    /**
     * @param {String} entry
     */
    verbose(entry) {
        console.log(entry);
    }

    /**
     * @param {String} entry
     */
    error(entry) {
        console.error(entry);
    }

    /**
     * @param {String} entry
     */
    warning(entry) {
        console.warn(entry);
    }

    /**
     * @param {*} entry
     */
    debug(entry) {
        console.log(entry);
    }

    /**
     * @param {*} entry
     */
    info(entry) {
        console.log(entry);
    }
}

module.exports = ConsoleAppender;