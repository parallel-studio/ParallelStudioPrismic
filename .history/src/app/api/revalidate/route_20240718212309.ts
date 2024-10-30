import { WebhookBodyAPIUpdate } from "@prismicio/client";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@/prismicio";

export async function POST(request: NextRequest) {
    if (!request.body) {
        return NextResponse.json({ error: "Not found" }, { status: 401 });
    }

    const body: WebhookBodyAPIUpdate = await request.json();

    if (
        !body.secret ||
        body.secret !== process.env.NEXT_PRISMIC_WEBHOOK_TOKEN
    ) {
        return NextResponse.json({ error: "Not found" }, { status: 401 });
    }

    const documents = body.documents;

    if (!documents || documents.length === 0) {
        return NextResponse.json({ error: "No documents" }, { status: 501 });
    }

    const client = createClient();

    documents.forEach((id) => {
        return revalidateTag(id);
    });

    return NextResponse.json({ revalidated: documents, now: Date.now() });
}
