const socket = io();

// Elements
const $messageForm = document.querySelector("#message-form");
const $messageFormInput = $messageForm.querySelector("input");
const $messageFormButton = $messageForm.querySelector("button");
const $sendLocationButton = document.querySelector("#send-location");
const $messages = document.querySelector("#messages");

// Templates
const messageTemplate = document.querySelector("#message-template").innerHTML;
const locationTemplate = document.querySelector("#location-template").innerHTML;

socket.on("message", (message) =>
{
    console.log(message);
    
    const html = Mustache.render(messageTemplate,
    {
        message
    });
        
        $messages.insertAdjacentHTML("beforeend", html);
    });
    
/*
    Goal 1: Create a separate event for location sharing messages

    1. Have server emit "locationMessage" with the URL
    2. Have the client listen for "locationMessage" and print the URL to the console
    3. Test your work by sharing a location

    Goal 2: Render new template for location messages

    1. Duplicate the message template
        - Change the id to something else
    2. Add a link inside the paragraph with the link text "My Current location"
        - URL for link should be the maps URL (dynamic)
    3. Select the template from JavaScript
    4. Render the template with the URL and append to messages list
    5. Test your work!
*/
socket.on("locationMessage", (url) =>
{
    console.log(url);
    
    const html = Mustache.render(locationTemplate,
    {
        url  
    });

    $messages.insertAdjacentHTML("beforeend", html);
});

$messageForm.addEventListener("submit", (event) =>
{
    event.preventDefault();

    $messageFormButton.setAttribute("disabled", "diabled");

    const message = event.target.elements.message.value;

    socket.emit("sendMessage", message, (error) =>
    {
        $messageFormButton.removeAttribute("disabled");
        $messageFormInput.value = "";
        $messageFormInput.focus();

        if (error)
        {
            return console.log(error);
        }

        console.log("Message delivered!");
    });
});

$sendLocationButton.addEventListener("click", () =>
{
    if (!navigator.geolocation)
    {
        return alert("Geolocation is not supported by your browser.");
    }

    $sendLocationButton.setAttribute("disabled", "disabled");
    
    navigator.geolocation.getCurrentPosition((position) =>
    {
        socket.emit("sendLocation", 
        {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, (error) =>
        {
            $sendLocationButton.removeAttribute("disabled");

            if (error)
            {
                return console.log(error);
            }

            console.log("Location shared!");
        });
    });
});