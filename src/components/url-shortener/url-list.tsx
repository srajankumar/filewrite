"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Copy, Sparkle, Trash2 } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@clerk/nextjs";
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
import { toast } from "sonner";

type URL = {
  id: number;
  created_at: string;
  short_code: string;
  original_url: string;
};

export default function UrlList() {
  const [url, setUrl] = useState<URL[]>([]);
  const [loading, setLoading] = useState(true);

  // clerk userId
  const { userId } = useAuth();

  // fetch data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("links")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: true });
      if (error) console.error("Error fetching data:", error);
      else setUrl(data || []);
      setLoading(false);
    };
    fetchData();
  }, [userId]);

  // delete record
  const deleteLink = async (id: number) => {
    const { error } = await supabase
      .from("links")
      .delete()
      .eq("id", id)
      .eq("user_id", userId);
    if (error) {
      console.error("Error deleting record:", error);
      toast.error("Failed to delete the link. Please try again.");
    } else {
      toast.success("File deleted successfully!");
      setUrl((prev) => prev.filter((u) => u.id !== id));
    }
  };

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success("Copied to clipboard!");
  };

  return (
    <div className="space-y-3 pt-10">
      <h2 className="font-semibold">Your Saved Links</h2>
      {loading && <Skeleton className="flex rounded-xl w-full h-24" />}
      {url.length === 0 && !loading && (
        <div className="flex dark:bg-secondary/30 items-center justify-center gap-2 rounded-xl border px-4 py-2">
          <p className="text-sm py-7 text-muted-foreground">No links found.</p>
        </div>
      )}
      {url.length != 0 && !loading && (
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
                  >{`${window.location.origin}/r/${u.short_code}`}</Link>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant={"ghost"}
                  size={"icon"}
                  onClick={() => handleCopy(u.short_code)}
                >
                  <Copy />
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
