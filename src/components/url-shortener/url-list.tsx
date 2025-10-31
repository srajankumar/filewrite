"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

import { ArrowUpRight, Check, Copy, Sparkle, Trash2 } from "lucide-react";

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

type LinkItem = {
  id: number;
  created_at: string;
  short_code: string;
  original_url: string;
};

type UrlListProps = {
  url: LinkItem[];
  urlLoading: boolean;
  deleteLink: (id: number) => Promise<void>;
};

export default function UrlList({ url, urlLoading, deleteLink }: UrlListProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/r/${code}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-3 pt-10 mt-3">
      <h2 className="font-semibold">Your Saved Links</h2>
      {urlLoading && <Skeleton className="flex rounded-xl w-full h-24" />}
      {url.length === 0 && !urlLoading && (
        <div className="flex dark:bg-secondary/30 items-center justify-center gap-2 rounded-xl border px-4 py-2">
          <p className="text-sm py-7 text-muted-foreground">No links found.</p>
        </div>
      )}
      {url.length !== 0 && !urlLoading && (
        <ul className="space-y-3">
          {url.map((u) => (
            <li
              key={u.id}
              className="flex dark:bg-secondary/30 items-center justify-between gap-2 rounded-xl border px-4 py-2"
            >
              <div className="space-y-2">
                <Badge variant={"secondary"}>
                  {new Date(u.created_at).toLocaleString()}
                </Badge>
                <p className="text-muted-foreground text-sm break-all">
                  {u.original_url}
                </p>
                <div className="flex items-center gap-1">
                  <Sparkle className="text-yellow-500 w-4 h-4" />
                  <Link
                    href={`${window.location.origin}/r/${u.short_code}`}
                    target="_blank"
                    className="text-sm text-primary hover:underline underline-offset-4 break-all"
                  >
                    {`${window.location.origin}/r/${u.short_code}`}
                  </Link>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant={"ghost"}
                  size={"icon"}
                  onClick={() => {
                    handleCopy(u.short_code);
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
                          href={`${window.location.origin}/r/${u.short_code}`}
                          className="text-primary hover:text-primary"
                        >
                          <ArrowUpRight />
                        </Link>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="px-2 py-1 text-xs">
                      {`${window.location.origin}/r/${u.short_code}`}
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
                        delete your URL.
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
                          onClick={() => deleteLink(u.id)}
                        >
                          Delete
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
