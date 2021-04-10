const express = require("express");
const path = require("path");
const hbs = require("hbs");

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine with views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) =>
{
    res.render("index",
    {
        title: "Weather",
        name: "Dice"
    });
});

app.get("/about", (req, res) =>
{
    res.render("about",
    {
        title: "About me",
        name: "Dice"
    });
});

app.get("/help", (req, res) =>
{
    res.render("help",
    {
        title: "Help page",
        message: "Sorry. No help for you!",
        name: "Dice"
    });
});

app.get("/weather", (req, res) =>
{
    res.send(
        {
            forecast: "Sunny with a chance of rain",
            location: "Atlanta"
        }
    );
});

app.get("/help/*", (req, res) =>
{
    res.render("error",
    {
        title: "Help",
        name: "Dice",
        message: "Help article not found."
    });
});

app.get("*", (req, res) =>
{
    res.render("error",
    {
        title: "404",
        name: "Dice",
        message: "Page not found."
    });
});

/*
    Challenge: Create and render a 404 page with handlebars

    1. Setup the template to render the header and footer
    2. Setup the template to render an error message in a paragraph
    3. Render the template for both 404 routes
        - Page not found.
        - Help article not found.
    4. Test your work. Visit /what and /help/units
*/

app.listen(3000, () =>
{
    console.log("Server is up on port 3000.");
});