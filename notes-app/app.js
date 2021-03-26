const notes = require('./notes.js');
const yargs = require("yargs");

// Customize yargs version
yargs.version("1.1.0");

/*
    Challenge: Wire up list command

    1. Create and export listNotes from notes.js
        - "Your notes" using chalk
        - Print note title for each note
    2. Call listNotes from command handler
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
            notes.listNotes();
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