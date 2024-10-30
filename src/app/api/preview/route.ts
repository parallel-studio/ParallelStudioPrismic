import { redirectToPreviewURL } from "@prismicio/next";

import { createClient } from "@/prismicio";

/**
 * @param {import("next/server").NextRequest} request
 */
export async function GET(request: import("next/server").NextRequest) {
  const client = createClient({ fetchOptions: { cache: "no-store" } });

  return await redirectToPreviewURL({ client, request });
}
