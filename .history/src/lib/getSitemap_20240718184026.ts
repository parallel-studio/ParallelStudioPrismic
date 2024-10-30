import { createClient } from "@/prismicio";

export default async function getSitemap(locale: string) {
    const client = createClient({});

    const data = client.dangerouslyGetAll();

    console.log(data);

    let xmlItems: string[] = [];

    // console.log(xmlItems);

    const xmlResponse = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
      ${xmlItems.join("")}
    </urlset>
  `;
    return xmlResponse;
}
