const notes = require('./notes.js');
const yargs = require("yargs");

// Customize yargs version
yargs.version("1.1.0");

/*
    Challenge: Refactor all functions

    1. If function is a method, use ES6 method definition syntax
    2. Otherwise, use most concise arrow function possible
    3. Test your work!
*/

// add, remove, read, list
yargs.command(
    {
        command: "add",
        describe: "Add a new note",
        builder:
        {
            title:
            {
                describe: "Note Title",
                demandOption: true,
                type: "string"
            },
            body:
            {
                describe: "Note Description",
                demandOption: true,
                type: "string"
            }
        },
        handler(argv)
        {
            notes.addNote(argv.title, argv.body);
        }
    }
).command(
    {
        command: "remove",
        describe: "Remove a note",
        builder:
        {
            title:
            {
                describe: "Note Title",
                demandOption: true,
                type: "string"
            }
        },
        handler(argv)
        {
            notes.removeNote(argv.title);
        }
    }
).command(
    {
        command: "list",
        describe: "List all notes",
        handler()
        {
            console.log("Listing all notes");
        }
    }
).command(
    {
        command: "read",
        describe: "Read a note",
        handler()
        {
            console.log("Reading a note");
        }
    }
).argv;