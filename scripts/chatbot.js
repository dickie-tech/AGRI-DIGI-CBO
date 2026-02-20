
const chatbotIcon = document.getElementById("chatbot-icon");
const chatSidebar = document.getElementById("chat-sidebar");
const closeChat = document.getElementById("close-chat");
const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");
const chatMessages = document.getElementById("chat-messages");

// Toggle sidebar
chatbotIcon.addEventListener("click", () => {
    chatSidebar.classList.add("active");
});

closeChat.addEventListener("click", () => {
    chatSidebar.classList.remove("active");
});

// Send Message
sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        sendMessage();
    }
});

function sendMessage() {
    const message = userInput.value.trim();
    if (message === "") return;

    addMessage(message, "user-message");
    userInput.value = "";

    // Dummy bot response (replace with API call)
    setTimeout(() => {
        addMessage("I'm your Agri-Digi assistant 🌱", "bot-message");
    }, 500);
}

function addMessage(text, className) {
    const msgDiv = document.createElement("div");
    msgDiv.classList.add("message", className);
    msgDiv.textContent = text;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

