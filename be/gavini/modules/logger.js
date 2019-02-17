var winston = require('winston');

class Singleton {

    constructor(config) {
        if (!Singleton.instance) {
            Singleton.instance = new winston.Logger();
        }
    }

    getInstance() {
        return Singleton.instance;
    }
}

module.exports = Singleton;