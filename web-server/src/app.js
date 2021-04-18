const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000; 

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
    const address = req.query.address;

    if (!address)
    {
        return res.send(
            {
                error: "You must provide an address"
            }
        );
    }

    geocode(address, (error, { latitude, longitude } = {}) =>
    {
        if (error)
        {
            return res.send(
                {
                    error
                }
            );
        }

        forecast(latitude, longitude, (error, { weather_descriptions, temperature, feelslike, city} = {}) => 
        {
            if (error)
            {
                return res.send(
                    {
                        error
                    }
                );
            }
    
            res.send(
                {
                    location: city,
                    temperature: temperature,
                    feelsLike: feelslike,
                    weatherDescription: weather_descriptions
                }
            );
        });
    });
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

app.listen(port, () =>
{
    console.log("Server is up on port " + port);
});