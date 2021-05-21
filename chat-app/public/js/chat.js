/*
    Goal: Deploy the chat application

    1. Setup Git and commit files
        - Ignore node_modules folder
    2. Setup a GitHub repository and push code up
    3. Setup a Heroku app and push code up
    4. Open the live app and test your work
*/
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
const sidebarTemplate = document.querySelector("#sidebar-template").innerHTML;

// Options
const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true });

const autoscroll = () =>
{
    // New message element
    const $newMessage = $messages.lastElementChild;

    // Height of the new message
    const newMessageStyles = getComputedStyle($newMessage);
    const newMessageMargin = parseInt(newMessageStyles.marginBottom);
    const newMessageHeight = $newMessage.offsetHeight + newMessageMargin;

    // Visible height
    const visibleHeight = $messages.offsetHeight;

    // Height of messages container
    const containerHeight = $messages.scrollHeight;

    // How far have I scrolled?
    const scrollOffset = $messages.scrollTop + visibleHeight;

    if (containerHeight - newMessageHeight <= scrollOffset)
    {
        $messages.scrollTop = $messages.scrollHeight;
    }
}

socket.on("message", (message) =>
{
    console.log(message);
    
    const html = Mustache.render(messageTemplate,
    {
        username: message.username,
        message: message.text,
        createdAt: moment(message.createdAt).format("h:mm:ss a")
    });
        
    $messages.insertAdjacentHTML("beforeend", html);
    autoscroll();
});

socket.on("locationMessage", (message) =>
{
    console.log(message);

    const html = Mustache.render(locationTemplate,
    {
        username: message.username,
        url: message.url,
        createdAt: moment(message.createdAt).format("h:mm:ss a")
    });

    $messages.insertAdjacentHTML("beforeend", html);
    autoscroll();
});

socket.on("roomData", ({ room, users }) =>
{
    const html = Mustache.render(sidebarTemplate,
    {
        room,
        users
    })

    document.querySelector("#sidebar").innerHTML = html;
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

socket.emit("join", { username, room }, (error) =>
{
    if (error)
    {
        alert(error);

        location.href = '/'
    }
});