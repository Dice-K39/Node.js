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

/*
    Challenge: Update weather endpoint to accept address

    1. No address? Send back an error message to
    2. Address? Send back the static JSON
        - Add address property onto JSON which returns the provided address
    3. Test /weather and /weather?address=atlanta
*/
app.get("/weather", (req, res) =>
{
    if (!req.query.address)
    {
        return res.send(
            {
                error: "You must provide an address"
            }
        );
    }

    res.send(
        {
            forecast: "Sunny with a chance of rain",
            location: "Atlanta",
            address: req.query.address
        }
    );
});

app.get("/products", (req, res) =>
{
    if (!req.query.search)
    {
        return res.send(
            {
                error: "You must provide a search term"
            }
        );
    }
    console.log(req.query.search);

    res.send(
        {
            products: []
        }
    )
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

app.listen(3000, () =>
{
    console.log("Server is up on port 3000.");
});