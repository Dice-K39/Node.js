const request = require("request");

const forecast = (latitude, longitude, callback) =>
{
    const url = "http://api.weatherstack.com/current?access_key=8e5ce20797f413b84d430f5293a69cb7&query=" + latitude + "," + longitude + "&units=f";

    request({ url: url, json: true }, (error, response) => 
    {
        if (error)
        {
            callback("Unable to connect to weather service!", undefined);
        }
        else if (response.body.error)
        {
            callback("Unable to find location.", undefined);
        }
        else
        {
            const temperature = response.body.current;

            callback(undefined,
            {
                WeatherDescription: temperature.weather_descriptions[0],
                CurrentTemperature: temperature.temperature,
                FeelsLike: temperature.feelslike,
                Location: response.body.location.name
            });
        }
    });
}

module.exports = forecast;