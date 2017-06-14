let instance;

class Singleton {

    constructor() {
        instance = this;
    }

    getInstance() {
        return instance;
    }
}

const singleton = new Singleton();
let getInstance = singleton.getInstance;

module.exports = getInstance;
