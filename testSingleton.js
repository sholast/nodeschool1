const Singleton = require('./singleton');

let a  = new Singleton();
let b  = new Singleton();

console.log(a === b);
