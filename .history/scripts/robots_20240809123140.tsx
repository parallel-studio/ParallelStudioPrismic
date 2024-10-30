import fs from "fs";
import path from "path";

async function fetchRobotsTxt(): Promise<void> {
    try {
        const response = await axios.get(CMS_API_URL);
        const robotsTxtContent = response.data;

        const filePath = path.join(__dirname, "public", "robots.txt");
        fs.writeFileSync(filePath, robotsTxtContent, "utf8");

        console.log("robots.txt file has been created successfully.");
    } catch (error) {
        console.error("Error fetching robots.txt content:", error);
    }
}

fetchRobotsTxt();
