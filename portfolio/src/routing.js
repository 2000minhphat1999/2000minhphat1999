const STATIC_ROUTES = new Set([
  "home",
  "projects",
  "projects/ai",
  "projects/backend",
  "experience",
  "skills",
  "education",
  "about",
  "contact"
]);

export function isPortfolioRoute(route, projectSlugs = []) {
  if (STATIC_ROUTES.has(route)) return true;
  const match = /^project\/([^/]+)$/.exec(route);
  return Boolean(match && projectSlugs.includes(match[1]));
}

/**
 * Parse the app route and an optional in-page anchor from one hash.
 * Example: #project/fabric?anchor=fabric-model
 */
export function parsePortfolioHash(hash) {
  const raw = String(hash || "").replace(/^#/, "");
  const [routePart = "", ...queryParts] = raw.split("?");
  const params = new URLSearchParams(queryParts.join("?"));
  const candidate = params.get("anchor");
  const anchor = candidate && /^[A-Za-z][A-Za-z0-9_-]*$/.test(candidate)
    ? candidate
    : null;
  const route = routePart.replace(/^\/+|\/+$/g, "") || "home";
  return { route, anchor };
}

/**
 * Build a shareable in-app anchor URL while preserving the app route.
 */
export function buildPortfolioAnchorHash(route, anchor) {
  if (!route || !anchor || !/^[A-Za-z][A-Za-z0-9_-]*$/.test(anchor)) {
    throw new TypeError("A valid portfolio route and anchor are required.");
  }
  return "#" + route + "?anchor=" + encodeURIComponent(anchor);
}


/**
 * Identifies a click on the anchor already encoded in the current URL.
 * This lets the UI handle repeat clicks because identical hashes do not emit
 * another hashchange event.
 */
export function isCurrentPortfolioAnchor(currentHash, route, anchor) {
  return String(currentHash || "") === buildPortfolioAnchorHash(route, anchor);
}
