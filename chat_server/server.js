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

    socket.join(roomId);

    // Notify all other users
    socket.to(roomId).emit("user-joined", roomId);
  })

  socket.on("send-dm", ({roomId, email, message}) => {
    console.log("DM received: ", message);

    io.to(roomId).emit("receive-dm", {roomId, email, message});
  })

  socket.on("disconnect", (roomId) => {
    console.log("User disconnected:", socket.id);

    io.to(roomId).emit("user-left", roomId);
  });
});

server.listen(8080, () => {
  console.log("WebSocket Server is running on port 8080");
});