const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

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