import { sortBy, uniq } from "lodash";

import { createClient } from "@/prismicio";

import { baseUrl } from "../../baseUrl";
import { ContentRecord } from "../classes";
import { documentsSlugs } from "../classes/documents/slugs";
import { MODELS } from "../classes/models";
import { fetchServerDataQuery } from "./fetchServerDataQuery";

export default async function getSitemap(locale: string) {
    const client = createClient({});

    let xmlItems: string[] = [];

    // console.log(xmlItems);

    xmlItems = sortBy(uniq(xmlItems));

    const xmlResponse = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
      ${xmlItems.join("")}
    </urlset>
  `;
    return xmlResponse;
}
