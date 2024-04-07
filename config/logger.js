const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports:[
        new winston.transports.File({filename: 'error.log', level: 'error'}),
        new winston.transports.File({filename: 'combine.log'})
    ],
});

const logData = (req, res, next) => {
    if (!req.url.includes('/user/login') && !req.url.includes('/user/create')) {
        logger.log({
            level: 'info',
            timestamp: new Date().toString(),
            requestURL: req.url,
            requestBody: req.body
        });
    }
    next();
};
module.exports = {logger, logData}