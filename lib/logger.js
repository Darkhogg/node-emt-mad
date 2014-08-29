var winston = require('winston');

var tty = process.stdout.isTTY;

var logger = new (winston.Logger)();
logger.add(winston.transports.Console, {
    'prettyPrint': tty,
    'colorize': tty,
    'level': 'debug',
    'timestamp': !tty
});

if (tty) {
    logger.cli();
}

module.exports = logger;