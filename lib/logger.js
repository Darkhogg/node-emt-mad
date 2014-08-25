var winston = require('winston');

var logger = new (winston.Logger)({
    transports: [new (winston.transports.Console)()]
});

if (process.stdout.isTTY) {
    logger.cli();
}

module.exports = logger;