document.addEventListener("DOMContentLoaded", () => {
    // Get elements
    const startChatButton = document.getElementById("start-chat");
    const usernameInput = document.getElementById("username");
    const loginScreen = document.getElementById("login-screen");
    const chatScreen = document.getElementById("chat-screen");
    const welcomeMessage = document.getElementById("welcome-message");
    const sendMessageButton = document.getElementById("send-message");
    const messageInput = document.getElementById("message");
    const messagesContainer = document.getElementById("messages");
  
    // Initialize socket.io connection
    const socket = io();
  
    // Handle "Start Chat" button click
    startChatButton.addEventListener("click", () => {
      const username = usernameInput.value.trim();
      if (username === "") {
        alert("Please enter a valid username.");
        return;
      }
  
      // Hide login screen and show chat screen
      loginScreen.style.display = "none";
      chatScreen.style.display = "block";
  
      // Display welcome message
      welcomeMessage.textContent = `Welcome, ${username}!`;
  
      // Send username to the server
      socket.emit("join", username);
  
      // Handle message sending
      sendMessageButton.addEventListener("click", () => {
        const message = messageInput.value.trim();
        if (message === "") return;
        
        // Emit message to server
        socket.emit("chatMessage", `${username}: ${message}`);
        
        // Clear message input field
        messageInput.value = "";
      });
    });
  
    // Handle incoming chat messages
    socket.on("chatMessage", (message) => {
      const messageElement = document.createElement("div");
      messageElement.textContent = message;
      messagesContainer.appendChild(messageElement);
      
      // Scroll to the latest message
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    });
  
    // Handle the user joining (optional, you can display it in the chat)
    socket.on("userJoined", (username) => {
      const messageElement = document.createElement("div");
      messageElement.textContent = `${username} has joined the chat.`;
      messagesContainer.appendChild(messageElement);
    });
  });
  