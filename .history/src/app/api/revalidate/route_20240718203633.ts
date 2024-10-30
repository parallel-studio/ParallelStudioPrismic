import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    console.log(request);
    revalidateTag("prismic");

    return NextResponse.json({ revalidated: true, now: Date.now() });
}
