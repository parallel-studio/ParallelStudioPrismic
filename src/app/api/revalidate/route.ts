import { Route, WebhookBodyAPIUpdate } from "@prismicio/client";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

import { convertPrismicioPathToNextJsPath } from "@/lib/convert-path-prismicio-next";
import { createClient, routes } from "@/prismicio";

export async function POST(request: NextRequest) {
  if (!request.body) {
    return NextResponse.json({ error: "Not found" }, { status: 401 });
  }

  const body: WebhookBodyAPIUpdate = await request.json();

  if (!body.secret || body.secret !== process.env.NEXT_PRISMIC_WEBHOOK_TOKEN) {
    return NextResponse.json({ error: "Not found" }, { status: 401 });
  }

  const documents = body.documents;

  if (!documents || documents.length === 0) {
    return NextResponse.json({ error: "No documents" }, { status: 501 });
  }

  const client = createClient({});

  const urls: string[] = [];

  await Promise.all(
    documents.map(async (id) => {
      const document = await client.getByID(id);
      if (document.url && document.uid) {
        urls.push(document.url);

        const route = (routes as Route[])?.find(
          (route) => route.type === document.type,
        );

        if (route) {
          revalidatePath(convertPrismicioPathToNextJsPath(route), "page");
        }

        return revalidateTag(document.uid);
      }
    }),
  ).catch((error) => {
    return NextResponse.json({ error }, { status: 501 });
  });

  if (urls.length === 0) {
    revalidateTag("prismic");
    return NextResponse.json({
      revalidated: "Whole website",
      now: new Date(Date.now()).toISOString(),
    });
  }

  return NextResponse.json({
    revalidated: urls,
    now: new Date(Date.now()).toISOString(),
  });
}
