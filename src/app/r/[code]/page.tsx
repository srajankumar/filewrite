import { supabase } from "@/lib/supabaseClient";
import { redirect } from "next/navigation";

export default async function RedirectPage({
  params,
}: {
  params: Promise<{ shortCode: string }>;
}) {
  const { code } = await params;
  const { data } = await supabase
    .from("links")
    .select("original_url, expires_at")
    .eq("short_code", code)
    .single();

  if (!data) {
    return <h1>Link not found</h1>;
  }

  const expired = new Date(data.expires_at) < new Date();
  if (expired) {
    return <h1>Link expired</h1>;
  }

  redirect(data.original_url);
}
