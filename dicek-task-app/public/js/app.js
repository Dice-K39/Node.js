const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");
const messageThree = document.querySelector("#message-3");
const weatherDescriptionImage = document.querySelector("#image");

weatherForm.addEventListener("submit", (event) => 
{
    event.preventDefault();
    
    const location = search.value;

    weatherDescriptionImage.innerHTML = "";
    messageOne.textContent = "Loading. . . ";
    messageTwo.textContent = "";
    messageThree.textContent = "";

    fetch("/weather?address=" + location)
        .then(res => res.json())
        .then(data => 
            {
                if (data.error)
                {
                    messageOne.textContent = data.error;
                }
                else 
                {
                    weatherDescriptionImage.innerHTML = `<img src=${data.weatherIcons} />`
                    messageOne.textContent = `Location: ${data.city}, ${data.state} ${data.country}`;
                    messageTwo.textContent = "Weather Description: " + data.weatherDescription + " Temperature: " + data.temperature;
                    messageThree.textContent = "Humidity: " + data.humidity;
                }
            }
        );
});
