const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files (HTML, CSS, JS)
app.use(express.static("public"));

// When a user connects
io.on("connection", (socket) => {
  console.log("A user connected");

  // Listen for the 'join' event to track new users
  socket.on("join", (username) => {
    console.log(`${username} has joined the chat.`);
    io.emit("userJoined", username); // Broadcast to everyone
  });

  // Handle incoming chat messages
  socket.on("chatMessage", (msg) => {
    console.log(`Message received: ${msg}`);
    io.emit("chatMessage", msg); // Broadcast message to all clients
  });

  // Handle disconnect
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// Listen on a dynamic port (Render assigns this automatically)
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
