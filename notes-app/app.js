const notes = require('./notes.js');
const yargs = require("yargs");
const chalk = require('chalk');

// Customize yargs version
yargs.version("1.1.0");

/*
    Challenge: Add an option to yargs

    1. Setup a body option for the add command
    2. Configure a description, make it required, and for it to be a string
    3. Log the body value in the handler function
    4. Test your work
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
        handler: (argv) =>
        {
            notes.addNote(argv.title, argv.body);
        }
    }
).command(
    {
        command: "remove",
        describe: "Remove a note",
        handler: () =>
        {
            console.log("Removing a note");
        }
    }
).command(
    {
        command: "list",
        describe: "List all notes",
        handler: () =>
        {
            console.log("Listing all notes");
        }
    }
).command(
    {
        command: "read",
        describe: "Read a note",
        handler: () =>
        {
            console.log("Reading a note");
        }
    }
).argv;