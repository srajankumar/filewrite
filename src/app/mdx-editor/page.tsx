"use client";

import { CodeBlock } from "@/components/mdx-editor/code";
import React, { useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import rehypeExternalLinks from "rehype-external-links";
import MdxHeader from "@/components/mdx-editor/header";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function MDXEditor() {
  const [source, setSource] = useState("");
  const options = { code: CodeBlock };

  const feedElement = (syntax: string) => {
    return setSource(source + syntax);
  };

  return (
    <main className="min-h-dvh max-w-xl w-full mx-auto px-5">
      <Header />
      <div className="grid gap-5 pb-20 w-full">
        <h1 className="font-semibold text-2xl text-center py-5">MDX Editor</h1>
        <MdxHeader feedElement={feedElement} />
        <Tabs defaultValue="code">
          <TabsList>
            <TabsTrigger value="code">Code</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
          <TabsContent value="code">
            <div className="break-all">
              <Textarea
                placeholder="Type here"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                autoFocus
                className="min-h-[10rem] my-5"
                style={{ lineHeight: "1.75" }}
              />
            </div>
          </TabsContent>
          <TabsContent value="preview">
            <article className="prose dark:prose-invert border-input rounded-md border bg-transparent px-3 py-2 shadow-xs w-full">
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
