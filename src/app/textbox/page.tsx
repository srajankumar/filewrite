"use client";

import React, { useEffect, useRef, useState } from "react";
import Header from "@/components/header";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { BrushCleaning, ClipboardPaste, CopyIcon } from "lucide-react";
import { io } from "socket.io-client";
import { toast } from "sonner";

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

const socket = io(serverUrl);

function App() {
  const [text, setText] = useState("");
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // Listen for initial data
    socket.on("initialData", (data) => {
      //   console.log("Initial data received:", data);
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
      //   console.log("Updated user list:", list);
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
    <main className="min-h-dvh max-w-xl mx-auto px-5 pb-28">
      <Header />
      {users && (
        <ul className="flex flex-wrap gap-2">
          {users.map((user) => (
            <Badge
              key={user}
              variant={user === username ? "default" : "secondary"}
            >
              {user} {user === username && "(You)"}
            </Badge>
          ))}
        </ul>
      )}
      <Textarea
        ref={textareaRef}
        value={text}
        onChange={handleTextChange}
        className="min-h-[10rem] my-5"
        style={{ lineHeight: "1.75" }}
        autoFocus
        placeholder="Type here"
      />
      <div className="fixed bottom-10 md:right-10 right-5 bg-background shadow-lg rounded-full p-2 flex gap-3 border-2 border-primary z-50">
        <button
          onClick={async () => {
            await navigator.clipboard.writeText(text);
            toast.success("Copied to clipboard!");
          }}
          className="rounded-full md:hover:text-primary transition-all duration-200 size-9 flex justify-center items-center"
          type="button"
        >
          <CopyIcon size={16} />
        </button>
        <button
          onClick={async () => {
            try {
              const clipboardText = await navigator.clipboard.readText();
              setText(clipboardText);
              socket.emit("text-change", clipboardText);
              toast.success("Pasted from clipboard!");
            } catch (err) {
              console.error(err);
              toast.error("Failed to paste from clipboard.");
            }
          }}
          className="rounded-full md:hover:text-primary transition-all duration-200 size-9 flex justify-center items-center"
          type="button"
        >
          <ClipboardPaste size={16} />
        </button>
        <button
          className="rounded-full md:hover:text-primary transition-all duration-200 size-9 flex justify-center items-center"
          onClick={() => {
            setText("");
            socket.emit("text-change", "");
          }}
          type="button"
        >
          <BrushCleaning size={16} />
        </button>
      </div>
    </main>
  );
}

export default App;
