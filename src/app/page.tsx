"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useRef, useState } from "react";

export default function Page() {
  const [shareLink, setShareLink] = useState("");
  const fileRef = useRef<HTMLInputElement | null>(null);

  function handleCreateRoom() {
    // placeholder: route to create room
    window.location.href = "/room/new";
  }

  function handleJoinRoom() {
    const id = prompt("Enter room id or link");
    if (id) window.location.href = `/room/${encodeURIComponent(id)}`;
  }

  function handleUpload() {
    fileRef.current?.click();
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    // In a real app you'd upload and get a shareable link back from the server.
    const fakeLink = `${location.origin}/s/${encodeURIComponent(file.name)}`;
    setShareLink(fakeLink);
    alert(`Prepared share link: ${fakeLink}`);
  }

  function handleCopyLink() {
    if (!shareLink) return;
    navigator.clipboard?.writeText(shareLink);
    alert("Link copied to clipboard");
  }

  return (
    <main className="min-h-screen flex items-center justify-center py-16 px-6">
      <div className="w-full max-w-6xl">
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Image
              src={"/assets/logo-transparant.png"}
              alt="Filewrite"
              width={30}
              height={30}
            />
            <h1 className="text-xl font-semibold">Filewrite</h1>
          </div>
          <nav className="flex gap-3">
            <Button onClick={handleJoinRoom} variant={"ghost"}>
              Join room
            </Button>
            <Button onClick={handleCreateRoom}>Create room</Button>
          </nav>
        </header>

        {/* hero + macbook mockup */}
        <section className="grid md:grid-cols-2 gap-8 items-start py-10">
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-semibold text-slate-900 mb-3">
              Create rooms, share files, and collaborate in real time
            </h2>
            <p className="text-slate-600 mb-6 max-w-prose">
              Filewrite provides ephemeral rooms with a shared canvas, a shared
              text box, and file sharing with easy links. Invite others and
              collaborate instantly.
            </p>

            <div className="flex gap-3">
              <Button onClick={handleCreateRoom}>Create a room</Button>
              <Button onClick={handleUpload} variant={"outline"}>
                Upload & share
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="rounded-3xl p-5 border shadow-xl w-[420px]">
              <div className="text-sm text-slate-500 mb-2">
                Room • #awesome-project
              </div>
              <div className="rounded-md border border-dashed p-4 shadow-sm">
                <div className="h-36 bg-primary/5 rounded-md border border-dashed flex items-center justify-center text-slate-400">
                  Shared canvas (live)
                </div>
                <div className="mt-3 border h-9 flex items-center rounded-md p-3 text-sm text-slate-600">
                  Shared textbox (editable)
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* features */}
        <section className="mt-10">
          <h3 className="text-lg font-semibold mb-4 text-slate-800">
            Features
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <article className="bg-white p-4 rounded-lg border shadow-sm">
              <h4 className="font-medium mb-2">Create rooms</h4>
              <p className="text-sm text-slate-600">
                Instant temporary or persistent rooms for focused collaboration.
              </p>
            </article>

            <article className="bg-white p-4 rounded-lg border shadow-sm">
              <h4 className="font-medium mb-2">Shared canvas</h4>
              <p className="text-sm text-slate-600">
                Draw, annotate, and brainstorm together on a real-time canvas.
              </p>
            </article>

            <article className="bg-white p-4 rounded-lg border shadow-sm">
              <h4 className="font-medium mb-2">Shared textbox</h4>
              <p className="text-sm text-slate-600">
                Collaborative rich-text area for notes, todos, or code snippets.
              </p>
            </article>

            <article className="bg-white p-4 rounded-lg border shadow-sm">
              <h4 className="font-medium mb-2">Share files via link</h4>
              <p className="text-sm text-slate-600">
                Upload files and get a short shareable link to distribute
                instantly.
              </p>
            </article>
          </div>
        </section>

        {/* share box */}
        <section className="mt-8 bg-white p-4 rounded-lg border shadow-sm">
          <h4 className="font-medium mb-2">Share a file link</h4>
          <div className="flex gap-2 items-center">
            <input
              className="flex-1 px-3 py-2 rounded-md border bg-white text-slate-700"
              placeholder="Paste or generate a link"
              value={shareLink}
              onChange={(e) => setShareLink(e.target.value)}
            />
            <button
              onClick={handleCopyLink}
              className="px-3 py-2 rounded-md text-slate-600 border"
            >
              Copy
            </button>
          </div>
          <p className="text-sm text-slate-500 mt-2">
            Tip: anyone with the link can access the file (configure permissions
            in settings).
          </p>
        </section>

        <footer className="mt-8 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} filewrite — Built for fast file sharing &
          realtime collaboration
        </footer>
      </div>
    </main>
  );
}
