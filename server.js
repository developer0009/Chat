const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
app.use(express.static(__dirname));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("chat-message", (name, value) => {
    console.log(name, value);
    socket.broadcast.emit("append-messages", name, value);
  });
});
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log("listening on *:3000");
});
