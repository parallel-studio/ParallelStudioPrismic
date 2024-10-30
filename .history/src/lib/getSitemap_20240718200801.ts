import { baseUrl, createClient, home } from "@/prismicio";

export default async function getSitemap() {
    const client = createClient({
        fetchOptions: { next: { revalidate: 1800 } },
    });

    const data = await client.dangerouslyGetAll();

    let xmlItems: string[] = [];

    console.log(data);

    if (data) {
        data.filter((item) => item.uid && item.url).forEach((item) => {
            xmlItems.push(
                `<url><loc>${baseUrl}${item.url}</loc><lastmod>${item.last_publication_date}</lastmod></url>`
            );
        });
    }

    const xmlResponse = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
      ${xmlItems.join("")}
    </urlset>
  `;
    return xmlResponse;
}
