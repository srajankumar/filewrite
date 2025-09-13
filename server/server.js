const http = require("http");
const { Server } = require("socket.io");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: "*",
  },
});

const adjectives = [
  "Happy",
  "Creative",
  "Bright",
  "Swift",
  "Clever",
  "Bold",
  "Calm",
  "Eager",
];
const nouns = [
  "Writer",
  "Thinker",
  "Coder",
  "Scribe",
  "Author",
  "Editor",
  "Poet",
  "Creator",
];

const generateUsername = () =>
  `${adjectives[Math.floor(Math.random() * adjectives.length)]}${nouns[Math.floor(Math.random() * nouns.length)]
  }`;

let users = {};
let docState = { text: "" };

// --- Custom Room Feature (additional) ---
let rooms = {}; // { [roomName]: { users: {}, docState: { text: "" } } }

io.on("connection", (socket) => {
  const username = generateUsername();

  users[socket.id] = { username, cursorPosition: 0 };

  socket.emit("init", {
    id: socket.id,
    text: docState.text,
    users,
    username,
  });

  socket.broadcast.emit("user-joined", {
    id: socket.id,
    username,
  });

  socket.on("text-change", (text) => {
    docState.text = text;
    socket.broadcast.emit("text-change", text);
  });

  socket.on("cursor-change", (position) => {
    if (users[socket.id]) users[socket.id].cursorPosition = position;
    socket.broadcast.emit("cursor-change", {
      id: socket.id,
      cursorPosition: position,
    });
  });

  // --- Custom Room Logic ---
  let currentRoom = null;
  let customUsername = null;

  socket.on("join-room", (roomName, callback) => {
    if (!roomName) {
      if (callback) callback({ error: "Room name required" });
      return;
    }

    // Create room if doesn't exist
    if (!rooms[roomName]) {
      rooms[roomName] = {
        users: {},
        docState: { text: "" },
      };
    }

    currentRoom = roomName;
    customUsername = generateUsername();
    rooms[roomName].users[socket.id] = { username: customUsername, cursorPosition: 0 };

    socket.join(roomName);

    // Send initial state to the joining user
    socket.emit("init", {
      id: socket.id,
      text: rooms[roomName].docState.text,
      users: rooms[roomName].users,
      username: customUsername,
      room: roomName,
    });

    // Notify others in the room
    socket.to(roomName).emit("user-joined", {
      id: socket.id,
      username: customUsername,
    });

    if (callback) callback({ success: true, username: customUsername });
  });

  socket.on("room-text-change", (text) => {
    if (!currentRoom) return;
    rooms[currentRoom].docState.text = text;
    socket.to(currentRoom).emit("text-change", text);
  });

  socket.on("room-cursor-change", (position) => {
    if (!currentRoom) return;
    if (rooms[currentRoom].users[socket.id])
      rooms[currentRoom].users[socket.id].cursorPosition = position;
    socket.to(currentRoom).emit("cursor-change", {
      id: socket.id,
      cursorPosition: position,
    });
  });

  socket.on("leave-room", () => {
    if (currentRoom && rooms[currentRoom] && rooms[currentRoom].users[socket.id]) {
      delete rooms[currentRoom].users[socket.id];
      socket.to(currentRoom).emit("user-left", { id: socket.id });

      // Clean up empty room
      if (Object.keys(rooms[currentRoom].users).length === 0) {
        delete rooms[currentRoom];
      }
      socket.leave(currentRoom);
      currentRoom = null;
      customUsername = null;
    }
  });

  // Clean up on disconnect for custom rooms
  socket.on("disconnect", () => {
    delete users[socket.id];
    socket.broadcast.emit("user-left", { id: socket.id });

    if (currentRoom && rooms[currentRoom] && rooms[currentRoom].users[socket.id]) {
      delete rooms[currentRoom].users[socket.id];
      socket.to(currentRoom).emit("user-left", { id: socket.id });
      if (Object.keys(rooms[currentRoom].users).length === 0) {
        delete rooms[currentRoom];
      }
    }
  });
});

app.get("/", (req, res) => {
  res.send("Hello Collabpad Developer!");
});

const PORT = process.env.PORT || 4000;

server.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
