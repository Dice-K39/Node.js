const notes = require('./notes.js');
const yargs = require("yargs");

// Customize yargs version
yargs.version("1.1.0");

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
            notes.readNote(argv.title);
        }
    }
).argv;