const VerboseFlagsValues = require('./verbose-flags-values');

class Logger {
    /**
     * @returns {String}
     */
    get messageFormat() {
        return this._messageFormat;
    }

    /**
     *
     * @param {String} value
     */
    set messageFormat(value) {
        this._messageFormat = value;
    }

    /**
     * @returns {LoggerAppender}
     */
    get appender() {
        return this._appender;
    }

    /**
     * @param {LoggerAppender} value
     */
    set appender(value) {
        this._appender = value;
    }

    /**
     * @param [LoggerAppender] appenders
     * @param {Integer} verboseLevel
     * @param {String} messageFormat %v = verbose level, %s = message
     */
    constructor(appenders, verboseLevel, messageFormat) {
        this._appenders = appenders;
        this._messageFormat = messageFormat;

        this._doLogErrors = (verboseLevel & VerboseFlagsValues.LogErrors) > 0;
        this._doLogWarnings = (verboseLevel & VerboseFlagsValues.LogWarnings) > 0;
        this._doLogVerbose = (verboseLevel & VerboseFlagsValues.LogVerbose) > 0;
        this._doLogDebug = (verboseLevel & VerboseFlagsValues.LogDebug) > 0;
        this._doLogInfo = (verboseLevel & VerboseFlagsValues.LogInfo) > 0;
    }

    /**
     * @param {String} entry
     */
    writeVerbose(entry) {
        if (this._doLogVerbose) {
            for (var appender of this._appenders) {
                appender.verbose(this._formatMessage('verbose', entry));
            }
        }
    }

    /**
     * @param {String} entry
     */
    writeError(entry) {
        if (this._doLogErrors) {
            for (var appender of this._appenders) {
                appender.error(this._formatMessage('error', entry));
            }
        }
    }

    /**
     * @param {String} entry
     */
    writeWarning(entry) {
        if (this._doLogWarnings) {
            for (var appender of this._appenders) {
                appender.warning(this._formatMessage('warning', entry));
            }
        }
    }

    /**
     * @param {*} entry
     */
    writeDebug(entry) {
        if (this._doLogDebug) {
            for (var appender of this._appenders) {
                appender.debug(this._formatMessage('debug', entry));
            }
        }
    }

    /**
     * @param {*} entry
     */
    writeInfo(entry) {
        if (this._doLogInfo) {
            for (var appender of this._appenders) {
                appender.info(this._formatMessage('info', entry));
            }
        }
    }

    /**
     *
     * @param {String} verboseLevel
     * @param {String} message
     * @returns {string}
     * @private
     */
    _formatMessage(verboseLevel, message) {
        return this._messageFormat.
        replace(/%v/g, verboseLevel).
        replace(/%s/g, message);
    }
}

module.exports = Logger;