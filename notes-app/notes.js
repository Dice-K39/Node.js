const fs = require("fs");
const chalk = require('chalk');

const addNote = (title, body) =>
{
    const notes = loadNotes();
    const duplicateNote = notes.find(note => note.title === title);

    if (!duplicateNote)
    {
        notes.push(
            {
                title: title,
                body: body
            }
        );
    
        saveNotes(notes);

        console.log(chalk.bgGreen("New note added!"));
    }
    else
    {
        console.log(chalk.bgRed("Note title taken!"));
    }
}

const removeNote = title =>
{
    const notes = loadNotes();
    const revisedNotes = notes.filter(note => note.title !== title);

    if (revisedNotes.length < notes.length)
    {
        console.log(chalk.bgGreen("Note removed!"));

        saveNotes(revisedNotes);
    }
    else
    {
        console.log(chalk.bgRed("No note found!"));
    }
}

const readNote = title =>
{
    const notes = loadNotes();
    const noteSearch = notes.find(note => note.title === title);

    if (noteSearch)
    {
        console.log(chalk.inverse("Title: " + noteSearch.title));
        console.log("Description: " + noteSearch.body);
    }
    else
    {
        console.log(chalk.bgRed("Note not found."));
    }
}

const saveNotes = (notes) =>
{
    const dataJSON = JSON.stringify(notes);

    fs.writeFileSync("notes.json", dataJSON);
}

const loadNotes = () =>
{
    try
    {
        const dataBuffer = fs.readFileSync("notes.json");
        const dataJSON = dataBuffer.toString();
        
        return JSON.parse(dataJSON);
    }
    catch(e)
    {
        return [];
    }
}

const listNotes = () =>
{
    const notes = loadNotes();

    console.log(chalk.bgRed("Your notes"));

    notes.forEach(note =>
        {
            console.log(note.title);
        });
}

module.exports = 
{
    addNote,
    removeNote,
    listNotes,
    readNote
};