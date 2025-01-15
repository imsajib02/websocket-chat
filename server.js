const http = require('http');
const WebSocket = require('ws');
const express = require('express');
const bodyParser = require('body-parser');

// Create an Express app
const app = express();
app.use(bodyParser.json()); // Middleware to parse JSON bodies

// Create an HTTP server
const server = http.createServer(app);

// Create WebSocket servers for chatting
const chatWss = new WebSocket.Server({ noServer: true });

// Store connected clients
const chatClients = [];

// Function to handle WebSocket upgrades
server.on('upgrade', (request, socket, head) => {

    if(request.url === '/chat') {
        chatWss.handleUpgrade(request, socket, head, (ws) => {
            chatWss.emit('connection', ws, request);
        });
    } else {
        socket.destroy();
    }
});

// Function to broadcast messages to connected clients
function broadcastMessage(clients, message) {
    clients.forEach((client) => {
        if(client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });
}

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
});
