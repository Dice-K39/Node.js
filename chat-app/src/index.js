/*
    Goal 1: Create an Express web server

    1. Initialize npm and install Express
    2. Setup a new Express server
        - Serve up the public directory
        - Listen on port 3000
    3. Create index.html and render "Chat App" to the screen
    4. Test your work! Start the server and view the page in the browser

    Goal 2: Setup scripts for package.json

    1. Crate a "start" script to start the app using node
    2. Install nodemon and a development dependency
    3. Create a "dev" script to start the app using nodemon
    4. Run both scripts to test your work!
*/
const path = require("path");
const express = require("express");

const app = express();
const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publicDirectoryPath));

app.listen(port, () =>
{
    console.log(`Server is up on port ${port}`);
});