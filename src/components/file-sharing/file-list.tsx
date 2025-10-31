"use client";

import React, { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

import { ArrowUpRight, Check, Copy, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type FileItem = {
  id: number;
  created_at: string;
  short_code: string;
};

type FileListProps = {
  file?: FileItem[];
  fileLoading: boolean;
  deleteFile: (id: number) => Promise<void>;
};

export default function FileList({
  file = [],
  fileLoading,
  deleteFile,
}: FileListProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/f/${code}`);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-3 pt-10 mt-2">
      <h2 className="font-semibold">Your Uploaded Files</h2>
      {fileLoading && <Skeleton className="flex rounded-xl w-full h-12" />}
      {file.length === 0 && !fileLoading && (
        <div className="flex dark:bg-secondary/30 items-center justify-center gap-2 rounded-xl border px-4 py-2">
          <p className="text-sm py-1.5 text-muted-foreground">
            No files found.
          </p>
        </div>
      )}
      {file.length !== 0 && !fileLoading && (
        <ul className="space-y-3">
          {file.map((f) => (
            <li
              key={f.id}
              className="flex dark:bg-secondary/30 items-center justify-between gap-2 rounded-xl border px-4 py-2"
            >
              <Badge variant={"secondary"}>
                {new Date(f.created_at).toLocaleString()}
              </Badge>
              <div className="flex items-center gap-1">
                <Button
                  variant={"ghost"}
                  size={"icon"}
                  onClick={() => {
                    handleCopy(f.short_code);
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
                <TooltipProvider delayDuration={0}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button size={"icon"} asChild variant={"ghost"}>
                        <Link
                          target="_blank"
                          href={`${window.location.origin}/f/${f.short_code}`}
                          className="text-primary hover:text-primary"
                        >
                          <ArrowUpRight />
                        </Link>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="px-2 py-1 text-xs">
                      {`${window.location.origin}/f/${f.short_code}`}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <AlertDialog>
                  <AlertDialogTrigger>
                    <Button
                      size={"icon"}
                      variant={"ghost"}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your file.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel asChild>
                        <Button variant="outline">Cancel</Button>
                      </AlertDialogCancel>
                      <AlertDialogAction asChild>
                        <Button
                          variant={"destructive"}
                          className="w-full"
                          onClick={() => deleteFile(f.id)}
                        >
                          Continue
                        </Button>
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
