const socket = io();

socket.on("message", (message) =>
{
    console.log(message);
});

document.querySelector("#message-form").addEventListener("submit", (event) =>
{
    event.preventDefault();

    const message = event.target.elements.message.value;

    socket.emit("sendMessage", message, (error) =>
    {
        if (error)
        {
            return console.log(error);
        }

        console.log("Message delivered!");
    });
});

/*
    Goal: Setup acknowledgment

    1. Setup the client acknowledgment function
    2. Setup the server to send back the acknowledgment
    3. Have the client print "Location shared!" when acknowledged
    4. Test your work!
*/
document.querySelector("#send-location").addEventListener("click", () =>
{
    if (!navigator.geolocation)
    {
        return alert("Geolocation is not supported by your browser.");
    }

    navigator.geolocation.getCurrentPosition((position) =>
    {
        socket.emit("sendLocation", 
        {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, (error) =>
        {
            if (error)
            {
                return console.log(error);
            }

            console.log("Location shared!");
        });
    });
});