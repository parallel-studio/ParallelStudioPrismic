import { baseUrl, createClient, home } from "@/prismicio";

export default async function getSitemap() {
    const client = createClient({});

    const data = await client.dangerouslyGetAll();

    console.log(data);

    let xmlItems: string[] = [];

    if (data) {
        data.filter(
            (item) => item.url !== "/" && item.uid !== home && item.uid
        ).forEach((item) => {
            xmlItems.push(
                `<url><loc>${baseUrl}${item.url}</loc><lastmod>${item.last_publication_date}</lastmod></url>`
            );
        });
    }

    console.log(xmlItems);

    const xmlResponse = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
      ${xmlItems.join("")}
    </urlset>
  `;
    return xmlResponse;
}
