const request = require("request");

const url = "http://api.weatherstack.com/current?access_key=8e5ce20797f413b84d430f5293a69cb7&query=37.8267,-122.4233&units=f";

request({ url: url, json: true }, (error, response) => 
{
    const temperature = response.body.current;

    console.log(temperature.weather_descriptions[0] + ". It is currently " + temperature.temperature + " degrees out. It feels like " + temperature.feelslike + " degrees out.");
});



/*
    Geocoding
    Address -> Lat/Long -> Weather

    Challenge: Print the lat/long for Los Angeles

    1. Fire off a new request to the URL explored in browser
    2. Have the request module parse it as JSON
    3. Print both the latitude and longitude to the terminal
    4. Test your work!
*/
const geoCodeURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiYW1hdGFzb3JhIiwiYSI6ImNrbXduMnh1dDAwdHkydnFrcm11dnVvcDQifQ.AjWGK6HBlKUfXKopLDd9kg&limit=1"

request({ url: geoCodeURL, json: true }, (error, response) =>
{
    const location = response.body.features[0];

    console.log("Los Angeles is located on " + location.center[1] + " latitude, " + location.center[0] + " longitude.");
})