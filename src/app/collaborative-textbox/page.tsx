"use client";

import React, { useEffect, useRef, useState } from "react";
import Header from "@/components/header";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  BrushCleaning,
  CheckIcon,
  ClipboardPaste,
  CopyIcon,
} from "lucide-react";
import { io } from "socket.io-client";
import { toast } from "sonner";
import Loader from "@/components/ui/loader";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

const socket = io(serverUrl);

function App() {
  const [text, setText] = useState("");
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [pasted, setPasted] = useState(false);
  const [cleared, setCleared] = useState(false);

  useEffect(() => {
    const serverUrl =
      process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:4000";

    fetch(serverUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

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

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
    socket.emit("textChange", newText);
  };

  return (
    <main className="min-h-dvh max-w-xl mx-auto px-5 pb-20">
      <Header />
      <h1 className="font-semibold text-2xl text-center py-5 mb-5">
        Collaborative Textbox
      </h1>
      {loading ? (
        <Loader />
      ) : (
        <div className="grid gap-5">
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
            className="min-h-[10rem]"
            style={{ lineHeight: "1.75" }}
            autoFocus
            placeholder="Type here"
          />
          <div className="fixed bottom-10 right-10 flex dark:bg-secondary/30 items-center justify-between gap-2 rounded-xl border p-3 z-50 bg-background">
            <Button
              variant={"ghost"}
              size={"icon"}
              onClick={async () => {
                await navigator.clipboard.writeText(text);
                setCopied(true);
                toast.success("Copied to clipboard!");
                setTimeout(() => setCopied(false), 1500);
              }}
              aria-label={copied ? "Copied" : "Copy to clipboard"}
              disabled={copied}
            >
              <div
                className={cn(
                  "transition-all",
                  copied ? "scale-100 opacity-100" : "scale-0 opacity-0"
                )}
              >
                <CheckIcon className="stroke-emerald-500" size={16} />
              </div>
              <div
                className={cn(
                  "absolute transition-all",
                  copied ? "scale-0 opacity-0" : "scale-100 opacity-100"
                )}
              >
                <CopyIcon size={16} />
              </div>
            </Button>
            <Button
              variant={"ghost"}
              size={"icon"}
              onClick={async () => {
                try {
                  const clipboardText = await navigator.clipboard.readText();
                  setText(clipboardText);
                  socket.emit("text-change", clipboardText);
                  setPasted(true);
                  toast.success("Pasted from clipboard!");
                  setTimeout(() => setPasted(false), 1500);
                } catch (err) {
                  console.error(err);
                  toast.error("Failed to paste from clipboard.");
                }
              }}
              aria-label={pasted ? "Copied" : "Copy to clipboard"}
              disabled={pasted}
            >
              <div
                className={cn(
                  "transition-all",
                  pasted ? "scale-100 opacity-100" : "scale-0 opacity-0"
                )}
              >
                <CheckIcon className="stroke-emerald-500" size={16} />
              </div>
              <div
                className={cn(
                  "absolute transition-all",
                  pasted ? "scale-0 opacity-0" : "scale-100 opacity-100"
                )}
              >
                <ClipboardPaste size={16} />
              </div>
            </Button>
            <Button
              variant={"ghost"}
              size={"icon"}
              onClick={() => {
                setText("");
                socket.emit("text-change", "");
                setCleared(true);
                toast.success("Cleared text!");
                setTimeout(() => setCleared(false), 1500);
              }}
              aria-label={cleared ? "Copied" : "Copy to clipboard"}
              disabled={cleared}
            >
              <div
                className={cn(
                  "transition-all",
                  cleared ? "scale-100 opacity-100" : "scale-0 opacity-0"
                )}
              >
                <CheckIcon className="stroke-emerald-500" size={16} />
              </div>
              <div
                className={cn(
                  "absolute transition-all",
                  cleared ? "scale-0 opacity-0" : "scale-100 opacity-100"
                )}
              >
                <BrushCleaning size={16} />
              </div>
            </Button>
          </div>
        </div>
      )}
    </main>
  );
}

export default App;
