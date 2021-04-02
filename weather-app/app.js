const request = require("request");
const geocode = require("./utils/geocode");

// const url = "http://api.weatherstack.com/current?access_key=8e5ce20797f413b84d430f5293a69cb7&query=37.8267,-122.4233&units=f";

// request({ url: url, json: true }, (error, response) => 
// {
//     if (error)
//     {
//         console.log("Unable to connect to weather service!");
//     }
//     else if (response.body.error)
//     {
//         console.log("Unable to find location.");
//     }
//     else
//     {
//         const temperature = response.body.current;

//         console.log(temperature.weather_descriptions[0] + ". It is currently " + temperature.temperature + " degrees out. It feels like " + temperature.feelslike + " degrees out.");
//     }
// });

// const geoCodeURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiYW1hdGFzb3JhIiwiYSI6ImNrbXduMnh1dDAwdHkydnFrcm11dnVvcDQifQ.AjWGK6HBlKUfXKopLDd9kg&limit=1"

// request({ url: geoCodeURL, json: true }, (error, response) =>
// {
//     if (error)
//     {
//         console.log("Unable to connect to geocoding service!");
//     }
//     else if (response.body.features.length === 0)
//     {
//         console.log("Unable to find location!");
//     }
//     else
//     {
//         const location = response.body.features[0];

//         console.log("Los Angeles is located on " + location.center[1] + " latitude, " + location.center[0] + " longitude.");
//     }
// })

geocode("Atlanta", (error, data) =>
{
    console.log("Error", error);
    console.log("Data", data);
});