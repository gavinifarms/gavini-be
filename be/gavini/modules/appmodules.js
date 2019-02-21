var config = require('config');
var Logger = require('./logger');
var Db = require('./db');


class Module {

    constructor() {
        if(!Module.init) {

            Module.config = config;
            Module.logger = new Logger(config).getInstance();


            Module.db = new Db(Module.config, Module.logger).getInstance();
            

            Module.init = true;
        }
    }

    getInstance() {
        return Module;
    }
}

module.exports = Module;