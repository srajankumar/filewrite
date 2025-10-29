"use client";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("https://collabpad-urmn.onrender.com");

function App() {
  const [text, setText] = useState("");
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Listen for initial data
    socket.on("initialData", (data) => {
      console.log("📩 Initial data received:", data);
      setText(data.text);
      setUsers(data.users);
      setUsername(data.username);
    });

    // Listen for text updates
    socket.on("textChange", (newText) => {
      setText(newText);
    });

    // Listen for user list updates
    socket.on("userListUpdate", (list) => {
      console.log("👥 Updated user list:", list);
      setUsers(list);
    });

    return () => {
      socket.off("initialData");
      socket.off("textChange");
      socket.off("userListUpdate");
    };
  }, []);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
    socket.emit("textChange", newText);
  };

  return (
    <div style={{ display: "flex", padding: "20px", gap: "2rem" }}>
      <div style={{ flex: 1 }}>
        <h1>Collaborative Textbox</h1>
        <textarea
          value={text}
          onChange={handleTextChange}
          style={{
            width: "100%",
            height: "300px",
            fontSize: "16px",
            padding: "10px",
          }}
        />
      </div>
      <div style={{ width: "250px" }}>
        <h2>🟢 Online Users ({users.length})</h2>
        <ul>
          {users.map((user) => (
            <li key={user}>
              {user === username ? <strong>{user} (You)</strong> : user}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
