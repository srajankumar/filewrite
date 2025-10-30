"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Copy, Trash2 } from "lucide-react";
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
import { toast } from "sonner";

type File = {
  id: number;
  created_at: string;
  short_code: string;
};

export default function FileList() {
  const [file, setFile] = useState<File[]>([]);
  const [loading, setLoading] = useState(true);

  // clerk userId
  const { userId } = useAuth();

  // fetch data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("file_links")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: true });
      if (error) console.error("Error fetching data:", error);
      else setFile(data || []);
      setLoading(false);
    };
    fetchData();
  }, [userId]);

  // delete record
  const deleteRecord = async (id: number) => {
    const { error } = await supabase
      .from("file_links")
      .delete()
      .eq("id", id)
      .eq("user_id", userId);
    if (error) console.error("Error deleting record:", error);
    else {
      setFile((prev) => prev.filter((f) => f.id !== id));
    }
  };

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success("Copied to clipboard!");
  };

  return (
    <div className="space-y-3 pt-10">
      <h2 className="font-semibold">Your Uploaded Files</h2>
      {loading && <Skeleton className="flex rounded-xl w-full h-12" />}
      {file.length === 0 && !loading && (
        <div className="flex dark:bg-secondary/30 items-center justify-center gap-2 rounded-xl border px-4 py-2">
          <p className="text-sm py-1.5 text-muted-foreground">
            No files found.
          </p>
        </div>
      )}
      {file.length != 0 && !loading && (
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
                  onClick={() => handleCopy(f.short_code)}
                >
                  <Copy />
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

                <Button
                  size={"icon"}
                  variant={"ghost"}
                  className="text-destructive hover:text-destructive"
                  onClick={() => deleteRecord(f.id)}
                >
                  <Trash2 />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
