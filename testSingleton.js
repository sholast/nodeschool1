const Singleton = require('./singleton');

console.log(Singleton);

let a  = new Singleton();
let b  = new Singleton();


console.log(a === b);


