import { WebhookBody } from "@prismicio/client";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    if (!request.body) return;

    const body: WebhookBody = await request.json();

    console.log(body, rand);

    revalidateTag("prismic");

    return NextResponse.json({ revalidated: true, now: Date.now() });
}
