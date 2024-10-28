import { NextRequest, NextResponse } from "next/server";

import { env } from "process";

// API proxy
export async function GET(request: NextRequest) {
  if (!env.TTC_STATUS_ENDPOINT) {
    return NextResponse.json(
      { message: "status endpoint not found" },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(env.TTC_STATUS_ENDPOINT);

    return NextResponse.json(await response.json());
  } catch (e: any) {
    console.log("Error fetching live alerts:", e);
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}
