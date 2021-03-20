const validator = require('validator');
const notes = require('./notes.js');
const app = notes();

console.log(app);

console.log(validator.isURL('ftp://mead.io'));