const express = require('express');
const cors = require('cors');
const http = require('http');
const setupWebSocket = require('./WebSocket');  
const PORT = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const corsOptions = {
    origin: 'https://multiplayer-game-frontend.vercel.app', 
    methods: ['GET', 'POST'],
    credentials: true,
};

// Middleware
app.use(cors(corsOptions));

app.get('/', (req, res) => {
    res.send('<h1>Hello</h1>');
});

// Initialize WebSocket
setupWebSocket(server);  

server.listen(PORT, () => {
    console.log('Server is running on http://localhost:3000');
});
