"use client";

import React, { useState } from "react";

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import rehypeExternalLinks from "rehype-external-links";

import { cn } from "@/lib/utils";

import { BrushCleaning, Check, Copy } from "lucide-react";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Header from "@/components/header";
import { CodeBlock } from "@/components/mdx-editor/code";
import MdxHeader from "@/components/mdx-editor/header";
import DownloadButton from "@/components/download-file-button";

export default function MDXEditor() {
  const [source, setSource] = useState("");
  const options = { code: CodeBlock };
  const [copied, setCopied] = useState(false);
  const [cleared, setCleared] = useState(false);

  const feedElement = (syntax: string) => {
    return setSource(source + syntax);
  };

  const handleCopy = (data: string) => {
    navigator.clipboard.writeText(data);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <main className="min-h-dvh max-w-xl w-full mx-auto px-5">
      <Header />
      <div className="grid gap-5 pb-20 w-full">
        <h1 className="font-semibold text-2xl text-center py-5">MDX Editor</h1>
        <MdxHeader feedElement={feedElement} />
        <Tabs defaultValue="code">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="code">Code</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-3">
              <DownloadButton
                data={source}
                fileName={"filewrite-document"}
                mimeType="text/markdown"
              />
              <Button
                variant={"outline"}
                size={"icon"}
                onClick={() => {
                  handleCopy(source);
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
                  <Check className="stroke-emerald-500" size={16} />
                </div>
                <div
                  className={cn(
                    "absolute transition-all",
                    copied ? "scale-0 opacity-0" : "scale-100 opacity-100"
                  )}
                >
                  <Copy />
                </div>
              </Button>
              <Button
                variant={"outline"}
                size={"icon"}
                onClick={() => {
                  setSource("");
                  setCleared(true);
                  setTimeout(() => setCleared(false), 1500);
                }}
                aria-label={cleared ? "Cleared" : "Cleared text"}
                disabled={cleared}
              >
                <div
                  className={cn(
                    "transition-all",
                    cleared ? "scale-100 opacity-100" : "scale-0 opacity-0"
                  )}
                >
                  <Check className="stroke-emerald-500" size={16} />
                </div>
                <div
                  className={cn(
                    "absolute transition-all",
                    cleared ? "scale-0 opacity-0" : "scale-100 opacity-100"
                  )}
                >
                  <BrushCleaning />
                </div>
              </Button>
            </div>
          </div>
          <TabsContent value="code">
            <div className="break-all">
              <Textarea
                placeholder="Type here"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                autoFocus
                className="min-h-[10rem]"
                style={{ lineHeight: "1.75" }}
              />
            </div>
          </TabsContent>
          <TabsContent value="preview">
            <article className="prose break-all dark:prose-invert border-input rounded-md border bg-transparent px-3 py-2 shadow-xs w-full">
              <Markdown
                components={options}
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeSanitize, rehypeExternalLinks]}
              >
                {source}
              </Markdown>
            </article>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
