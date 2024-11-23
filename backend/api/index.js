const express = require('express');
const cors = require('cors');
const http = require('http');
const setupWebSocket = require('../WebSocket'); 

const app = express();
const server = http.createServer(app);

app.use(cors());

app.get('/', (req, res) => {
    res.json({message:" this is server"});
});

setupWebSocket(server);

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});