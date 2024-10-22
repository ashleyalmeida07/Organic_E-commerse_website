document.addEventListener('DOMContentLoaded', (event) => {
    const sendButton = document.getElementById('sendButton');
    sendButton.addEventListener('click', sendMessage);
});

async function fetchResponseFromServer(userMessage) {
    try {
        const response = await fetch('https://bnb-40s3.onrender.com/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: userMessage })
        });

        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const data = await response.json();
        return formatResponse(data.response); // Format the response
    } catch (error) {
        console.error('Error fetching data:', error);
        return "Sorry, I couldn't fetch that information.";
    }
}

// Function to format the response
function formatResponse(response) {
    // Replace double asterisks with bold tags and single asterisks with line breaks
    return response
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Make bold
        .replace(/\*(.*?)\*/g, '<br>$1<br>') // New line
        .trim(); // Remove any leading/trailing whitespace
}

function sendMessage() {
    const userInput = document.getElementById('userInput');
    const userMessage = userInput.value.trim();
    if (!userMessage) return;

    displayMessage(userMessage, 'user');
    userInput.value = '';

    fetchResponseFromServer(userMessage).then(botMessage => {
        displayMessage(botMessage, 'bot');
    }).catch(error => {
        console.error('Error processing request:', error);
        displayMessage("Sorry, there was an error processing your request.", 'bot');
    });
}

function displayMessage(message, sender) {
    const chatbox = document.getElementById('chatbox');
    const messageDiv = document.createElement('div');
    messageDiv.className = sender === 'user' ? 'user-message' : 'bot-message';

    // Set the innerHTML instead of textContent to support formatting
    messageDiv.innerHTML = message;

    chatbox.appendChild(messageDiv);
    chatbox.scrollTop = chatbox.scrollHeight; // Auto-scroll to the bottom
}
