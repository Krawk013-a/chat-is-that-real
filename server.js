const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Use the port from the environment variable or fallback to 3000
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

io.on("connection", (socket) => {
    console.log("New user connected");

    // Handle message sending
    socket.on("chatMessage", (msg) => {
        io.emit("chatMessage", msg); // Broadcast message to all clients
    });

    // Disconnect
    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
