const request = require("request");

const url = "http://api.weatherstack.com/current?access_key=8e5ce20797f413b84d430f5293a69cb7&query=37.8267,-122.4233";

request({ url: url }, (error, response) => 
{
    const data = JSON.parse(response.body);

    console.log(data.current);
});