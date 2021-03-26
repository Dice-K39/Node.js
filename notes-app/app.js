const notes = require('./notes.js');
const yargs = require("yargs");

// Customize yargs version
yargs.version("1.1.0");

/*
    Challenge 1: Setup command option and function

    1. Setup the remove command to take a required "--title" option
    2. Create and export a removeNote function from notes.js
    3. Call removeNote in remove command handler
    4. Have removeNote log the title of the note to be removed
    5. Test your work using: node app.js remove --title="some title"

    Challenge 2: Wire up removeNote

    1. Load existing notes
    2. Use array filter method to remove the matching note (if any)
    3. Save the newly created array
    4. Test your work with a title that exists and a title that doesn't exist

    Challenge: Use chalk to provide useful logs for remove

    1. If a note is removed, print "Note removed!" with a green background
    2. If no note is removed, print "No note found!" with a red background
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
        builder:
        {
            title:
            {
                describe: "Note Title",
                demandOption: true,
                type: "string"
            }
        },
        handler: (argv) =>
        {
            notes.removeNote(argv.title);
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