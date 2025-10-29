const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

let sharedText = "";
let users = {};

function generateUsername() {
  const names = ["Alex", "Jordan", "Taylor", "Riley", "Morgan", "Casey"];
  const name = names[Math.floor(Math.random() * names.length)];
  const number = Math.floor(Math.random() * 100);
  return `${name}${number}`;
}

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

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
    console.log("Disconnected:", socket.id);
    delete users[socket.id];
    io.emit("userListUpdate", Object.values(users));
  });
});

app.get("/", (req, res) => {
  res.send("Hello Filewrite Developer!");
});

const PORT = process.env.PORT || 4000;

server.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
