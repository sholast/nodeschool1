const getInstance = require('./singleton');

let a  = getInstance();
let b  = getInstance();

console.log(a === b);
