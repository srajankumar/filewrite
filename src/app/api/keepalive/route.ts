import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET() {
  try {
    const { data, error, status } = await supabase
      .from("cron") // table name
      .select("message"); // column name
    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: status || 500 }
      );
    }
    return NextResponse.json({ data }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: err || "Internal server error" },
      { status: 500 }
    );
  }
}
