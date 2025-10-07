import { supabase } from "@/lib/supabaseClient";
import { redirect } from "next/navigation";

type Params = { params: { code: string } };

export default async function RedirectPage({ params }: Params) {
  const { data } = await supabase
    .from("links")
    .select("original_url, expires_at")
    .eq("short_code", params.code)
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