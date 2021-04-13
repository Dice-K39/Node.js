console.log("Client side javascript file is loaded!");

/*
Challenge: Use input value to get weather

1. Migrate fetch call into the submit callback
2. Use the search text as the address query string value
3. Submit the form with a valid and invalid value to test
*/

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");

weatherForm.addEventListener("submit", (event) => 
{
    event.preventDefault();
    
    const location = search.value;

    fetch("http://localhost:3000/weather?address=" + location)
        .then(res => res.json())
        .then(data => data.error ? console.log(data.error) : console.log(data.location, data.temperature));
});
