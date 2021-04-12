console.log("Client side javascript file is loaded!");

fetch("http://puzzle.mead.io/puzzle")
    .then(res => res.json())
    .then(data => console.log(data));

/*
    Challenge: Fetch weather!

    1. Setup a call to fetch to fetch weather for Boston
    2. Get the parse JSON response
        - If error property, print error
        - If no error property, print location and forecast
    3. Refresh the browser and test your work
*/
fetch("http://localhost:3000/weather?address=boston")
    .then(res => res.json())
    .then(data => data.error ? console.log(data.error) : console.log(data.location, data.temperature));