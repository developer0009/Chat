import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";
const socket = io();
let name = prompt("enter your name !!");
const messages = document.getElementsByClassName("messages-block")[0];
const users = document.getElementsByClassName("connected-user")[0];
while (!name) name = prompt("enter your name");
socket.on("connect", () => {
  socket.emit("connected-user", name);
});
socket.on("connecteduser", (arr) => {
  console.log("event triggerd");
  arr.map((obj) => {
    const div = document.createElement("div");
    div.innerHTML =
      obj.name +
      '  <i class="fa-solid fa-user"></i>' +
      ' : <bold style="color: darkgreen; font-weight:700">online</bold> <i class="fa-solid fa-check"></i>';
    div.style.marginBottom = "10px";
    users.append(div);
  });
});
socket.on("runuser", (arr) => {
  console.log("someuser is connected");
  console.log(arr);
});

const addUp = (name, value) => {
  const div = document.createElement("div");
  div.innerHTML = name + '  <i class="fa-solid fa-user"></i>' + " : " + value;
  messages.append(div);
  div.style.marginBottom = "10px";
  window.scrollTo(0, div.scrollHeight);
};

const input = document.getElementById("msg");
document.getElementById("basic-addon2").addEventListener("click", (evt) => {
  if (input.value) {
    socket.emit("chat-message", name, input.value);
    addUp("You ", input.value);
    input.value = "";
  }
});

socket.on("append-messages", (name, value) => {
  addUp(name, value);
  console.log("added");
});
