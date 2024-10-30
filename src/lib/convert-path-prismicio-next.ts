import { Route } from "@prismicio/client";

export function convertPrismicioPathToNextJsPath(route: Route): string {
  // Replace optional parameters (:paramName?) with Next.js format ([paramName])
  let nextJsPath = route.path.replace(/:([a-zA-Z0-9]+)\?/g, "[$1]");

  // Replace required parameters (:paramName) with Next.js format ([paramName]), except :uid
  nextJsPath = nextJsPath.replace(/:(?!uid)([a-zA-Z0-9]+)/g, "[$1]");

  // Replace :uid with the type property from the route object
  nextJsPath = nextJsPath.replace(/:uid/g, `[${route.type}]`);

  return nextJsPath;
}
