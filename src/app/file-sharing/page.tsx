import React from "react";
import FileList from "@/components/file-sharing/file-list";
import FileUploader from "@/components/file-sharing/file-uploader";
import type { Metadata } from "next";
import Header from "@/components/header";

export const metadata: Metadata = {
  title: "File Sharing",
};

export default function FileSharing() {
  return (
    <div className="min-h-dvh max-w-xl mx-auto px-5 pb-20">
      <Header />
      <div className="grid gap-5">
        <h1 className="font-semibold text-2xl text-center py-5">
          File Sharing
        </h1>
        <FileUploader />
        <FileList />
      </div>
    </div>
  );
}
