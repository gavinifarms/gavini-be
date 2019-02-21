var mongoose = require('mongoose');

class Singleton {
    
    constructor(config, logger) {
        if(!Singleton.instance) {
            logger.info("Initiating the DB connection");

            const options = {
                useNewUrlParser: true,
                useCreateIndex: true,
                useFindAndModify: false,
                reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
                reconnectInterval: 500, // Reconnect every 500ms
                poolSize: 10, // Maintain up to 10 socket connections
                // If not connected, return errors immediately rather than waiting for reconnect
                bufferMaxEntries: 0,
                connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
                socketTimeoutMS: 45000 // Close sockets after 45 seconds of inactivity
              };

            let dbHostString = config.get('db.host');
            let dbPort = config.get('db.port');
            let dbName = config.get('db.dbName');

            let dbConnectionString = `mongodb://${dbHostString}:${dbPort}/${dbName}`

            logger.info(dbConnectionString);

            Singleton.instance = new mongoose.connect(dbConnectionString, options).then(
                (res) => {
                    logger.log({
                        level: 'info',
                        message: res
                    });
                    require('../models/dbSchema');
                },
                err => {
                    logger.log({
                        level: 'error',
                        message: err
                    })
                }
            );
        }
    }

    getInstance() {
        return Singleton.instance;
    }
}

module.exports = Singleton;