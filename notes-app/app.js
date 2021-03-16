// const fs = require('fs');

// // fs.writeFileSync('notes.txt', 'Hi!');

// /*
//     Challenge: Append a message to notes.txt

//     1. Use appendFileSync to append to the file
//     2. Run the script
//     3. Check your work by opening the file and viewing the appended text
// */
// fs.appendFileSync('notes.txt', ' How are you doing?');


// const addFunction = require('./utils.js')
// const sum = addFunction(4, -2);

// console.log(sum);

/* 
    Challenge: Define and use a function in a new file

    1. Create a new file called notes.js
    2. Create getNotes function that returns "Your notes..."
    3. Export getNotes function
    4. From app.js, load in and call the function printing message to console
*/
const notes = require('./notes.js');
const app = notes();

console.log(app);