const notes = require('./notes.js');
const yargs = require("yargs");
const chalk = require('chalk');

// Customize yargs version
yargs.version("1.1.0");

// add, remove, read, list
/*
    Challenge: Add two new commands

    1. Setup command to support "list" command (print placeholder message for now)
    2. Setup command to support "read" command (print placeholder message for now)
    3. Test your work by running both commands and ensure correct output
*/
yargs.command(
    {
        command: "add",
        describe: "Add a new note",
        handler: () =>
        {
            console.log("Adding a new note");
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