import { createClient } from "@/prismicio";

export default async function getSitemap() {
    const client = createClient({});

    const data = await client.dangerouslyGetAll();

    console.log(data);

    let xmlItems: string[] = [];

    if (data) {
        data.forEach((item) => {
            xmlItems.push();
        });
    }

    const xmlResponse = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
      ${xmlItems.join("")}
    </urlset>
  `;
    return xmlResponse;
}