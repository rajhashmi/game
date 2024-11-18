const express = require("express");
const http = require('http');
const { Server } = require("socket.io");
const app = express();
const server = http.createServer(app)
const cors = require("cors");

app.use(cors({
    origin: "https://multiplayer-game-frontend.vercel.app",  
    methods: ["GET", "POST"]
}));

const io = new Server(server, {
    cors: {
        origin : 'https://multiplayer-game-frontend.vercel.app',
        methods: ["GET", "POST"]
    }
});


io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);
})

app.get("/", (req, res) => res.json({message: "this is vercel server"}));

server.listen(3000, () => console.log("Server ready on port 3000"));
