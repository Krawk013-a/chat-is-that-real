const socket = io();

const loginScreen = document.getElementById("login-screen");
const chatScreen = document.getElementById("chat-screen");
const startChatButton = document.getElementById("start-chat");
const usernameInput = document.getElementById("username");
const welcomeMessage = document.getElementById("welcome-message");
const chatBox = document.getElementById("chat-box");
const messageInput = document.getElementById("message");
const sendMessageButton = document.getElementById("send-message");

startChatButton.addEventListener("click", () => {
    const username = usernameInput.value;
    if (username.trim() === "") return;

    // Hide login screen, show chat screen
    loginScreen.style.display = "none";
    chatScreen.style.display = "block";
    welcomeMessage.textContent = `Welcome, ${username}!`;

    // Handle sending messages
    sendMessageButton.addEventListener("click", () => {
        const message = messageInput.value;
        if (message.trim() === "") return;
        socket.emit("chatMessage", `${username}: ${message}`);
        messageInput.value = "";
    });
});

// Handle receiving messages
socket.on("chatMessage", (msg) => {
    const messageElement = document.createElement("p");
    messageElement.textContent = msg;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to bottom
});
