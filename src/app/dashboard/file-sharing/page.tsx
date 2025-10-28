import FileList from "@/components/file-sharing/file-list";
import FileUploader from "@/components/file-sharing/file-uploader";
import React from "react";

export default function FileSharing() {
  return (
    <div className="grid gap-5">
      <h1 className="font-semibold text-2xl text-center py-5">File Sharing</h1>
      <FileUploader />
      <FileList />
    </div>
  );
}
