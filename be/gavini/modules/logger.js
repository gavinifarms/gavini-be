var winston = require('winston');

class Singleton {

    constructor(config) {
        if (!Singleton.instance) {
            Singleton.instance = new winston.createLogger({
                level: 'info',
                format: winston.format.json(),
                transports: [
                    //
                    // - Write to all logs with level `info` and below to `combined.log` 
                    // - Write all logs error (and below) to `error.log`.
                    //
                    new winston.transports.File({ filename: 'error.log', level: 'error' }),
                    new winston.transports.File({ filename: 'combined.log' })
                  ]
            });
        }
    }

    getInstance() {
        return Singleton.instance;
    }
}

module.exports = Singleton;