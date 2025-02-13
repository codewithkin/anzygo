const { Server } = require("socket.io");
const http = require("http");
const express = require("express");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Allow frontend connections
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("join-chat", (roomId) => {
    console.log("A user joined the room: ", roomId);  
  })

  socket.on("send-dm", ({roomId, message}) => {
    console.log("DM received: ", message);
    io.to(roomId).emit("receive-dm", message);
  })

  socket.on("receive-dm", (message) => {
    console.log("DM received: ", message);
  })

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(8080, () => {
  console.log("WebSocket Server is running on port 8080");
});