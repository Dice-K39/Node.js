const request = require("request");

const url = "http://api.weatherstack.com/current?access_key=8e5ce20797f413b84d430f5293a69cb7&query=37.8267,-122.4233";

request({ url: url, json: true }, (error, response) => 
{
    const temperature = response.body.current;

    console.log("It is currently " + temperature.temperature + " degrees out. It feels like " + temperature.feelslike + " degrees out.");
});

/* 
    Challenge: Print a small forecast to the user

    1. Print: "It is currently 9 degrees out. It feels like 5 degrees out."
    2. Test your work!
*/