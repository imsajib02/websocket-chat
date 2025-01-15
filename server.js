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

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
});
