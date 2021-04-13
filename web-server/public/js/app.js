console.log("Client side javascript file is loaded!");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

/*
    Challenge: Render content to paragraphs

    1. Select the second message p from JavaScript
    2. Just before fetch, render loading message and empty p
    3. If error, render error
    4. If no error, render loaction and forecast
    5. Test your work! Search for errors and for valid locations
*/

weatherForm.addEventListener("submit", (event) => 
{
    event.preventDefault();
    
    const location = search.value;

    messageOne.textContent = "Loading. . . ";
    messageTwo.textContent = "";

    fetch("http://localhost:3000/weather?address=" + location)
        .then(res => res.json())
        .then(data => 
            {
                if (data.error)
                {
                    messageOne.textContent = data.error;
                }
                else 
                {
                    messageOne.textContent = "Location: " + data.location;
                    messageTwo.textContent = "Weather Description: " + data.weatherDescription + "Temperature: " + data.temperature;
                }
            }
        );
});
