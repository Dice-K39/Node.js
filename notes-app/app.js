const notes = require('./notes.js');
const app = notes();

console.log(app);

/*
    Challenge: Use the chalk library in your project

    1. Install version of chalk
    2. Load chalk into app.js
    3. Use it to print the string "Success!" to the console in green
    4. Test your work

    Bonus: Use docs to mess around with other styles. Make text bold and inversed
*/

const chalk = require('chalk');

console.log(chalk.green("Success!"));
console.log(chalk.bold.inverse("Bye!"));