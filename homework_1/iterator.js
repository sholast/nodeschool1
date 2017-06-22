class Iterable {
    constructor() {
        this.a = 1;
        this.b = 3;
        this.c = 5;
    }

    [Symbol.iterator]() {
        const KEYS = Object.keys(this);
        let index = 0;

        return {
            next() {
                if (index < KEYS.length) {
                    return {value: KEYS[index++], done: false};
                }
                return {value: undefined, done: true};
            }
        }
    }
}

let it = new Iterable();

for (let prop of it) {
    console.log(prop);
}
