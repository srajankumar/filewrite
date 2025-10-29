const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://filewrite.vercel.app",
    methods: ["GET", "POST"],
  },
});

let sharedText = "";
let users = {}; // socket.id -> username

function generateUsername() {
  const names = ["Alex", "Jordan", "Taylor", "Riley", "Morgan", "Casey"];
  const name = names[Math.floor(Math.random() * names.length)];
  const number = Math.floor(Math.random() * 100);
  return `${name}${number}`;
}

io.on("connection", (socket) => {
  console.log("✅ User connected:", socket.id);

  // Create random username for this socket
  const username = generateUsername();
  users[socket.id] = username;

  // Send initial data to the new user
  socket.emit("initialData", {
    text: sharedText,
    users: Object.values(users),
    username,
  });

  // Notify all clients about the new user list
  io.emit("userListUpdate", Object.values(users));

  // Text change handling
  socket.on("textChange", (newText) => {
    sharedText = newText;
    socket.broadcast.emit("textChange", newText);
  });

  socket.on("disconnect", () => {
    console.log("❌ Disconnected:", socket.id);
    delete users[socket.id];
    io.emit("userListUpdate", Object.values(users));
  });
});

server.listen(3001, () => {
  console.log("🚀 Server running at http://localhost:3001");
});
