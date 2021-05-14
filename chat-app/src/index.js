const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publicDirectoryPath));

let count = 0;

// server (emit) -> client (receive) - countUpdated
// client (emit) -> server (receive) - increment

io.on("connection", (socket) =>
{
    console.log("New WebSocket connection");

    socket.emit("countUpdated", count);

    socket.on("increment", () =>
    {
        count++;

        // socket.emit("countUpdated", count); // sends to only the client that clicked the button
        io.emit("countUpdated", count); // sends data to all connected clients
    });
});



server.listen(port, () =>
{
    console.log(`Server is up on port ${port}`);
});