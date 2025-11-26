// app/api/logout/route.ts
import { NextResponse } from "next/server";

import SUPA from "@/lib/supabase";

export async function GET(request: Request) {
  await SUPA.serverSignOut();
  return NextResponse.redirect(new URL("/", request.url));
}
