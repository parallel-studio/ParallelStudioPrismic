export function convertPrismicioPathToNextJsPath(
    prismicioPath: string
): string {
    // Step 1 & 2: Replace optional parameters (:paramName?) with Next.js format ([paramName])
    let nextJsPath = prismicioPath.replace(/:([a-zA-Z0-9]+)\?/g, "[$1]");

    // Step 3: Replace required parameters (:paramName) with Next.js format ([paramName])
    nextJsPath = nextJsPath.replace(/:([a-zA-Z0-9]+)/g, "[$1]");

    // Step 4: Return the transformed path
    return nextJsPath;
}

// Example usage
const prismicioPath = "/:lang?/work/category/:uid";
const nextJsPath = convertPrismicioPathToNextJsPath(prismicioPath);
console.log(nextJsPath); // Output: "/[lang]/work/category/[uid]"
