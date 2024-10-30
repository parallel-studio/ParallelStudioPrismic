import fs from "fs";
import path from "path";

import { createClient } from "@/prismicio";

export async function getRobots(): Promise<void> {
    try {
        const client = createClient({});

        const response = await client.getSingle("settings");

        const robotsTxtContent = response.data.robots as string;

        const filePath = path.join(__dirname, "public", "robots.txt");
        fs.writeFileSync(filePath, robotsTxtContent, "utf8");

        console.log("robots.txt file has been created successfully.");
    } catch (error) {
        console.error("Error fetching robots.txt content:", error);
    }
}
