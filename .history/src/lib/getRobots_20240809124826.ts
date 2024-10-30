import fs from "fs";
import path from "path";

import { createClient } from "@/prismicio";

export async function getRobots() {
    try {
        const client = createClient({});

        const response = await client.getSingle("settings");

        const robotsTxtContent = response.data.robots as string;

        return robotsTxtContent;
    } catch (error) {
        console.error("Error fetching robots.txt content:", error);
    }
}
