const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
let arr = [];
app.use(express.static(__dirname));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
io.on("connection", (socket) => {
  socket.on("chat-message", (name, value) => {
    console.log(name, value);
    socket.broadcast.emit("append-messages", name, value);
  });
  socket.on("connected-user", (name) => {
    arr.push({ id: socket.id, name });
    socket.broadcast.emit("connecteduser", arr);
    socket.emit(
      "myuser",
      arr.filter((obj) => obj.id != socket.id)
    );
    console.log(arr);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log("listening on *:3000");
});
