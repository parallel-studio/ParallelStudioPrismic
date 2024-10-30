import { WebhookBody } from "@prismicio/client";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    if (!request.body) return;

    const body: WebhookBody = await request.json();

    if (body.secret !== process.env.PRISMIC_WEBHOOK_SECRET) {
        return NextResponse.json({ error: "Not found" }, { status: 401 });
    }

    revalidateTag("prismic");

    return NextResponse.json({ revalidated: true, now: Date.now() });
}
