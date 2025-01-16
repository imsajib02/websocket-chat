const http = require('http');
const WebSocket = require('ws');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

// Create an Express app
const app = express();
app.use(bodyParser.json()); // Middleware to parse JSON bodies

// Serve static files (optional, if you have any static assets like images, CSS, or JS)
app.use(express.static(path.join(__dirname, 'views')));

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
    // console.log('New client connected!');

    ws.on('message', (message) => {
        // console.log('Chat message received: ', message.toString());
        broadcastMessage(chatClients, message.toString());
    });

    ws.on('close', () => {

        // Remove client on disconnect
        const index = chatClients.indexOf(ws);

        if(index !== -1) {
            chatClients.splice(index, 1);
            // console.log('Client disconnected!');
        }
    });
});

// Function to broadcast messages to connected clients
function broadcastMessage(clients, message) {

    clients.forEach((client) => {
        if(client.readyState === WebSocket.OPEN) {
            client.send(message);
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

    broadcastMessage(chatClients, JSON.stringify(req.body));
    return res.status(200).json({ status: 'success', message: 'Message sent successfully!' });
});

// Serve the chat HTML page
app.get('/chat', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'chat.html'));
});

app.get('/', (req, res) => {
    res.status(200).send('Server is working!');
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});
