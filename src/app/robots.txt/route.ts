import { NextRequest, NextResponse } from "next/server";

import { getRobots } from "@/lib/getRobots";

export const fetchCache = "force-no-store";

export async function GET(request: NextRequest) {
  const xmlResponse = await getRobots();

  return new NextResponse(xmlResponse, {
    status: 200,
    headers: {
      "Cache-control": "public, s-maxage=86400, stale-while-revalidate",
      "content-type": "text/plain",
    },
  });
}
