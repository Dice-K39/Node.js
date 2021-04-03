const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

/* 
    Challenge: Accept location via command line argument

    1. Access the command line argument without yargs
    2. Use the string value as the input for geocode
    3. Only geocode if a location was provided
    4. Test your work with a couple of locations
*/

const query = process.argv[2];

if (!query)
{
    console.log("Please provide a city.");
}
else
{
    geocode(query, (error, data) =>
    {
        if (error)
        {
            return console.log("Error", error);   
        }
        forecast(data.latitude, data.longitude, (error, forecastData) => 
        {
            if (error)
            {
                return console.log('Error', error);
            }
    
            console.log("Location: " + data.location);
            console.log(forecastData);
        });
    });
}