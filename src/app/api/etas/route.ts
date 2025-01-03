import { NextRequest, NextResponse } from "next/server";

import { env } from "process";

// API proxy
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const urlParams = searchParams.toString();

  if (!env.TTC_DATA_ENDPOINT) {
    return NextResponse.json(
      { message: "etas endpoint not found" },
      { status: 500 }
    );
  }

  try {
    const endpoint = `${env.TTC_DATA_ENDPOINT}?${urlParams}`;
    const response = await fetch(endpoint, { cache: "no-store" });

    const dataJson = await response.json();
    return NextResponse.json(dataJson);
  } catch (e: any) {
    console.log("Error in API route:", e);
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}
