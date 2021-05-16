const socket = io();

// Elements
const $messageForm = document.querySelector("#message-form");
const $messageFormInput = $messageForm.querySelector("input");
const $messageFormButton = $messageForm.querySelector("button");
const $sendLocationButton = document.querySelector("#send-location");

socket.on("message", (message) =>
{
    console.log(message);
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

/*
    Goal: Disable the send location button while location being sent

    1. Set up a selector at the top of the file
    2. Disable the button just before getting the current position
    3. Enable the button in the acknowledgment callback
    4. Test your work!
*/
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