"use client";

import { useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
import { toast } from "sonner";
import { supabase } from "@/lib/supabaseClient";
import { cn } from "@/lib/utils";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, CheckIcon, CopyIcon } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import Qr from "@/components/qr";

import { useAuth } from "@clerk/nextjs";

// const durations: { label: string; value: number }[] = [
//   { label: "1 Hour", value: 1 },
//   { label: "3 Hours", value: 3 },
//   { label: "5 Hours", value: 5 },
//   { label: "10 Hours", value: 10 },
//   { label: "1 Day", value: 24 },
// ];

export default function UrlShortener() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [duration, setDuration] = useState(1);
  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [copied, setCopied] = useState(false);

  // clerk userId
  const { userId } = useAuth();

  const handleCopy = () => {
    if (inputRef.current) {
      navigator.clipboard.writeText(inputRef.current.value);
      setCopied(true);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopied(false), 1500);
    }
  };

  const handleShorten = async () => {
    if (!originalUrl) return toast.error("Please enter a valid URL");
    setLoading(true);

    // generate a short code (6 chars from uuid)
    const shortCode = uuidv4().slice(0, 6);

    const expiresAt = new Date(Date.now() + duration * 60 * 60 * 1000);

    const { error } = await supabase.from("links").insert([
      {
        original_url: originalUrl,
        short_code: shortCode,
        expires_at: expiresAt.toISOString(),
        user_id: userId,
      },
    ]);

    if (error) {
      console.error(error);
      toast.error("Failed to shorten URL");
      setLoading(false);
      return;
    }

    setShortUrl(`${window.location.origin}/r/${shortCode}`);
    setOriginalUrl("");
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-2 w-full mx-auto">
      <div className="grid gap-3">
        <div className="flex gap-2">
          <Input
            type="url"
            required
            placeholder="Enter your long link here"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
          />
          {/* <Select
            value={duration.toString()}
            onValueChange={(val) => setDuration(Number(val))}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select duration" />
            </SelectTrigger>

            <SelectContent>
              {durations.map((d) => (
                <SelectItem key={d.value} value={d.value.toString()}>
                  {d.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select> */}
        </div>

        <Button className="w-full" onClick={handleShorten} disabled={loading}>
          {loading ? "Generating" : "Generate"}
          {loading && <Spinner />}
        </Button>
      </div>

      <p
        aria-live="polite"
        role="region"
        className="text-muted-foreground mt-2 text-center text-xs"
      >
        Shorten your URL, share it anywhere
      </p>

      {/* success UI */}
      {shortUrl && (
        <div className="mt-6 space-y-6">
          <Qr link={shortUrl} />
          <div className="flex gap-2">
            <div className="relative w-full">
              <Input
                ref={inputRef}
                className="pe-9"
                type="text"
                readOnly
                value={shortUrl}
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
              <Link target="_blank" href={shortUrl}>
                <ArrowUpRight />
              </Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
