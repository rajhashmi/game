const express = require('express');
const cors = require('cors');
const http = require('http');
const setupWebSocket = require('./WebSocket'); // Import the WebSocket setup function

const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors());

app.get('/', (req, res) => {
    res.send('<h1>Hello</h1>');
});

// Initialize WebSocket
setupWebSocket(server);

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
