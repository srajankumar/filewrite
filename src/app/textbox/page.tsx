"use client";
import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import Header from "@/components/header";
import { BrushCleaning, ClipboardPaste, CopyIcon } from "lucide-react";

type User = {
  username: string;
  color: string;
  cursorPosition: number;
};

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
if (!serverUrl) {
  toast.error(
    "NEXT_PUBLIC_SERVER_URL is not defined in environment variables."
  );
}
const socket = io(serverUrl);

export default function Textbox() {
  const [text, setText] = useState("");
  const [users, setUsers] = useState<Record<string, User>>({});
  const [myId, setMyId] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    socket.on("init", (payload) => {
      setMyId(payload.id);
      setText(payload.text);
      setUsers(payload.users);
    });

    socket.on("text-change", (newText) => setText(newText));

    socket.on("user-joined", ({ id, username, color }) =>
      setUsers((prev) => ({
        ...prev,
        [id]: { username, color, cursorPosition: 0 },
      }))
    );

    socket.on("user-left", ({ id }) =>
      setUsers((prev) => {
        const updated = { ...prev };
        delete updated[id];
        return updated;
      })
    );

    return () => {
      socket.off("init");
      socket.off("text-change");
      socket.off("user-joined");
      socket.off("cursor-change");
      socket.off("user-left");
    };
  }, [socket]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
    socket.emit("text-change", newText);
  };

  return (
    <main className="min-h-dvh max-w-xl mx-auto px-5 pb-28">
      <Header />
      {users && (
        <ul className="flex flex-wrap gap-2">
          {Object.entries(users).map(([id, user]) => (
            <Badge key={id} variant={id === myId ? "default" : "secondary"}>
              {user.username} {id === myId && "(You)"}
            </Badge>
          ))}
        </ul>
      )}

      <Textarea
        ref={textareaRef}
        value={text}
        onChange={handleChange}
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
