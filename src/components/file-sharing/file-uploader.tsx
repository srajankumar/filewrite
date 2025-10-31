"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { toast } from "sonner";

import { supabase } from "@/lib/supabaseClient";
import { cn } from "@/lib/utils";

import { useFileUpload } from "@/hooks/use-file-upload";

import {
  PaperclipIcon,
  UploadIcon,
  XIcon,
  CheckIcon,
  CopyIcon,
  ArrowUpRight,
} from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";

import Qr from "@/components/qr";
import FileList from "@/components/file-sharing/file-list";

function generateShortCode(length = 4) {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let code = "";
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

type FileItem = {
  id: number;
  created_at: string;
  short_code: string;
};

export default function FileUploader() {
  const [file, setFile] = useState<FileItem[]>([]);
  const [fileLoading, setFileLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [downloadPageURL, setDownloadPageURL] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // clerk userId
  const { userId } = useAuth();

  // fetch data
  useEffect(() => {
    const fetchData = async () => {
      setFileLoading(true);
      const { data, error } = await supabase
        .from("file_links")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: true });
      if (error) console.error("Error fetching data:", error);
      else setFile((data as FileItem[]) || []);
      setFileLoading(false);
    };
    fetchData();
  }, [userId]);

  // delete record
  const deleteFile = async (id: number) => {
    const { error } = await supabase
      .from("file_links")
      .delete()
      .eq("id", id)
      .eq("user_id", userId);
    if (error) {
      console.error("Error deleting record:", error);
      toast.error("Failed to delete file. Please try again.");
    } else {
      toast.success("File deleted successfully!");
      setFile((prev) => prev.filter((f) => f.id !== id));
    }
  };

  const [
    { files, isDragging },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      removeFile,
      getInputProps,
    },
  ] = useFileUpload();

  const fileObj = files[0]?.file;

  const inputRef = useRef<HTMLInputElement>(null);

  const handleCopy = () => {
    if (inputRef.current) {
      navigator.clipboard.writeText(inputRef.current.value);
      setCopied(true);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopied(false), 1500);
    }
  };

  const handleUpload = async () => {
    if (!fileObj) return toast.error("Please select a file first");
    setUploading(true);

    const filePath = `${Date.now()}-${fileObj.name}`;
    const bucketName = "files"; // supabase bucket

    if (!(fileObj instanceof File)) {
      toast.error("Selected file is not a valid File object");
      setUploading(false);
      return;
    }
    const { error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(filePath, fileObj as File);

    if (uploadError) {
      toast.error("Error uploading file");
      setUploading(false);
      return;
    }

    const { data } = supabase.storage.from(bucketName).getPublicUrl(filePath);
    const fileURL = data.publicUrl;

    let shortCode = generateShortCode();
    let exists = true;
    while (exists) {
      const { data: existing } = await supabase
        .from("file_links")
        .select("id")
        .eq("short_code", shortCode)
        .maybeSingle();
      if (!existing) exists = false;
      else shortCode = generateShortCode();
    }

    const { data: insertedRow, error: insertError } = await supabase
      .from("file_links")
      .insert([
        {
          short_code: shortCode,
          file_url: fileURL,
          user_id: userId,
        },
      ])
      .select("*")
      .single();

    if (insertError) {
      toast.error("Error saving link");
      setUploading(false);
      return;
    }

    if (insertedRow) {
      setFile((prev) => [...(prev || []), insertedRow as FileItem]);
    }

    setDownloadPageURL(`${window.location.origin}/f/${shortCode}`);
    setUploading(false);
  };

  return (
    <div className="flex flex-col gap-3 w-full mx-auto">
      <div
        role="button"
        onClick={openFileDialog}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        data-dragging={isDragging || undefined}
        className="border-input cursor-pointer hover:bg-accent/50 data-[dragging=true]:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 flex min-h-40 flex-col items-center justify-center rounded-xl border border-dashed p-4 transition-colors has-disabled:pointer-events-none has-disabled:opacity-50 has-[input:focus]:ring-[3px]"
      >
        <input
          {...getInputProps()}
          className="sr-only"
          aria-label="Upload file"
          disabled={Boolean(fileObj)}
        />

        <div className="flex flex-col items-center justify-center text-center">
          <div className="bg-background mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border">
            <UploadIcon className="size-4 opacity-60" />
          </div>
          <p className="mb-1.5 text-sm font-medium">Upload file</p>
          <p className="text-muted-foreground text-xs">
            Drag & drop or click to browse
          </p>
        </div>
      </div>

      {/* File list */}
      {fileObj && (
        <div className="space-y-3">
          <div
            key={files[0].id}
            className="flex items-center justify-between gap-2 rounded-xl border px-4 py-2"
          >
            <div className="flex items-center gap-3 overflow-hidden">
              <PaperclipIcon className="size-4 shrink-0 opacity-60" />
              <div className="min-w-0">
                <p className="truncate text-[13px] font-medium">
                  {fileObj.name}
                </p>
              </div>
            </div>

            <Button
              size="icon"
              variant="ghost"
              className="-me-2 size-8"
              onClick={() => removeFile(files[0]?.id)}
            >
              <XIcon className="size-4" />
            </Button>
          </div>

          <Button
            onClick={handleUpload}
            disabled={uploading}
            className="w-full"
          >
            {uploading ? "Uploading" : "Upload"}
            {uploading && <Spinner />}
          </Button>
        </div>
      )}

      <p
        aria-live="polite"
        role="region"
        className="text-muted-foreground mt-2 text-center text-xs"
      >
        Upload your file and get a sharable link
      </p>

      {/* success UI */}
      {downloadPageURL && (
        <div className="mt-6 space-y-6">
          <Qr link={downloadPageURL} />
          <div className="flex gap-2">
            <div className="relative w-full">
              <Input
                ref={inputRef}
                className="pe-9"
                type="text"
                readOnly
                value={downloadPageURL}
              />
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={handleCopy}
                      className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md text-muted-foreground/80 hover:text-foreground transition"
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
                    </button>
                  </TooltipTrigger>
                  <TooltipContent className="px-2 py-1 text-xs">
                    Copy to clipboard
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Button size={"icon"} asChild>
              <Link target="_blank" href={downloadPageURL}>
                <ArrowUpRight />
              </Link>
            </Button>
          </div>
        </div>
      )}

      <FileList file={file} fileLoading={fileLoading} deleteFile={deleteFile} />
    </div>
  );
}
