import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabaseClient";
import { FileDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function FilePage({
  params,
}: {
  params: Promise<{ shortCode: string }>;
}) {
  const { shortCode } = await params;

  const { data, error } = await supabase
    .from("file_links")
    .select("file_url")
    .eq("short_code", shortCode)
    .maybeSingle();

  if (error || !data) {
    return (
      <div className="p-8">
        <h1 className="text-xl font-bold">File not found</h1>
        <Link href="/" className="text-blue-500 underline">
          Go back
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-svh max-w-xl mx-auto px-5 flex flex-col justify-center items-center gap-6">
      <Link
        href={"https://filewrite.vercel.app"}
        target="_blank"
        className="flex items-center gap-3"
      >
        <Image
          src={"/assets/logo-transparant.png"}
          alt="Filewrite"
          width={25}
          height={25}
        />
        <h1 className="text-xl font-semibold">Filewrite</h1>
      </Link>
      <div className="flex flex-col max-w-md w-full dark:bg-secondary/30 items-center justify-between gap-2 rounded-xl border p-4">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border">
            <FileDown className="size-4 text-muted-foreground" />
          </div>
          <p className="mb-1.5 text-sm font-medium">
            Click below to download this file
          </p>
        </div>
        <Link className="w-full" href={data.file_url} download={true}>
          <Button className="w-full cursor-pointer">Download Now</Button>
        </Link>
      </div>
    </main>
  );
}
