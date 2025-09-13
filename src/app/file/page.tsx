import FileUploader from "@/components/file-uploader";
import Header from "@/components/header";
import React from "react";

const File = () => {
  return (
    <main className="min-h-dvh max-w-6xl mx-auto py-16 px-5">
      <Header />
      <FileUploader />
    </main>
  );
};

export default File;
