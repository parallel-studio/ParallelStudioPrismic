import { WebhookBody, WebhookBodyAPIUpdate } from "@prismicio/client";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    if (!request.body) {
        return NextResponse.json({ error: "Not found" }, { status: 401 });
    }

    const body: WebhookBodyAPIUpdate = await request.json();

    if (!body.secret || body.secret !== process.env.PRISMIC_WEBHOOK_SECRET) {
        return NextResponse.json({ error: "Not found" }, { status: 401 });
    }

    const documents = body.documents;

    if (!documents) {
        return NextResponse.json({ error: "Not found" }, { status: 401 });
    }

    revalidateTag("prismic");

    return NextResponse.json({ revalidated: true, now: Date.now() });
}
