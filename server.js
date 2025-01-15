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

// WebSocket connection handling for chatting
chatWss.on('connection', (ws) => {

    // Store websocket stream
    chatClients.push(ws);
    console.log('New client connected!');

    ws.on('message', (message) => {
        console.log('Chat message received: ', message);
        broadcastMessage(chatClients, message);
    });

    ws.on('close', () => {

        // Remove client on disconnect
        const index = chatClients.indexOf(ws);

        if(index !== -1) {
            chatClients.splice(index, 1);
            console.log('Client disconnected!');
        }
    });
});

// Function to broadcast messages to connected clients
function broadcastMessage(clients, message) {

    const messageData = JSON.stringify({ message: message });

    clients.forEach((client) => {
        if(client.readyState === WebSocket.OPEN) {
            client.send(messageData);
        }
    });
}

// API endpoint for sending chat messages
app.post('/api/send-message', (req, res) => {

    const { name, message } = req.body;

    if(!name) {
        return res.status(400).json({ error: 'Name is required!' });
    }

    if(!message) {
        return res.status(400).json({ error: 'Message is required!' });
    }

    broadcastMessage(chatClients, message);
    return res.status(200).json({ status: 'success', message: 'Message sent successfully!' });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
});
