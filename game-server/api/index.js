const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

app.use(
  cors({
    origin: "https://multiplayer-game-frontend.vercel.app",
    methods: ["GET", "POST"],
  })
);

const io = new Server(server, {
  cors: {
    origin: "https://multiplayer-game-frontend.vercel.app",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);
});

app.get("/", (req, res) => res.json({ message: "this is vercel server" }));

module.exports = app;
