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

/*
    Goal: Add timestamps for location messages

    1. Create generateLocationMessage and export
        - { url: "", createdAt: 0 }
    2. Use generateLocationMessage when server emits locationMessage
    3. Update template to render time before the url
    4. Compile the template with the URL and the formatted time
    5. Test your work!
*/

socket.on("message", (message) =>
{
    console.log(message);
    
    const html = Mustache.render(messageTemplate,
    {
        message: message.text,
        createdAt: moment(message.createdAt).format("h:mm:ss a")
    });
        
    $messages.insertAdjacentHTML("beforeend", html);
});

socket.on("locationMessage", (message) =>
{
    console.log(message);

    const html = Mustache.render(locationTemplate,
    {
        url: message.url,
        createdAt: moment(message.createdAt).format("h:mm:ss a")
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