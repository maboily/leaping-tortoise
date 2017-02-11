var LoggerModule = require('logging/logger');

// Setup logger
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

logger.writeInfo("Login server is starting...");