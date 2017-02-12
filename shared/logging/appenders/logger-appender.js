class LoggerAppender {
    /**
     * @param {String} entry
     */
    verbose(entry) {
        throw "LoggerAppender verbose not implemented.";
    }

    /**
     * @param {String} entry
     */
    error(entry) {
        throw "LoggerAppender error not implemented.";
    }

    /**
     * @param {String} entry
     */
    warning(entry) {
        throw "LoggerAppender warning not implemented.";
    }

    /**
     * @param {*} entry
     */
    debug(entry) {
        throw "LoggerAppender debug not implemented.";
    }

    /**
     * @param {*} entry
     */
    info(entry) {
        throw "LoggerAppender info not implemented.";
    }
}

module.exports = LoggerAppender;