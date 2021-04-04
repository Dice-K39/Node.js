const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

/* 
    Challenge: Use both destructuring and property shorthand in weather app

    1. Use destructuring in app.js, forecast.js, and geocode.js
    2. Use property shorthand in forecast.js and geocode.json
    3. Test your work and ensure app still works
*/

const query = process.argv[2];

if (!query)
{
    console.log("Please provide a city.");
}
else
{
    geocode(query, (error, { latitude, longitude, place_name } = {}) =>
    {
        if (error)
        {
            return console.log("Error:", error);   
        }
        forecast(latitude, longitude, (error, { weather_descriptions, temperature, feelslike, city} = {}) => 
        {
            if (error)
            {
                return console.log('Error', error);
            }
    
            console.log("Location: " + place_name);
            console.log("Weather Description: " + weather_descriptions + "\nCurrent Temperature: " + temperature + "\nFeels Like: " + feelslike + "\nCity: " + city);
        });
    });
}