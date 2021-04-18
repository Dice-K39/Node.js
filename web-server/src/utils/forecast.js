const request = require("request");

const forecast = (latitude, longitude, callback) =>
{
    const url = "http://api.weatherstack.com/current?access_key=8e5ce20797f413b84d430f5293a69cb7&query=" + latitude + "," + longitude + "&units=f";

    request({ url, json: true }, (error, { body }) => 
    {
        if (error)
        {
            callback("Unable to connect to weather service!", undefined);
        }
        else if (body.error)
        {
            callback("Unable to find location.", undefined);
        }
        else
        {
            const { weather_descriptions, temperature, feelslike, weather_icons, humidity } = body.current;
            const { name, region, country } = body.location

            callback(undefined,
            {
                weather_descriptions,
                temperature,
                feelslike,
                weather_icons,
                humidity,
                city: name,
                state: region,
                country
            });
        }
    });
}

module.exports = forecast;