let instance;

module.exports = class Singleton {

    constructor() {
        !instance && (instance = this);
        return instance;
    }
};
