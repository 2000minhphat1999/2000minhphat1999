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
 * Route hashes take precedence. Other hashes are treated as in-page anchors
 * when the current document contains a matching id; unknown hashes still
 * fall through to the application's Not Found page.
 */
export function shouldHandleHashAsRoute(route, elementExists, projectSlugs = []) {
  return isPortfolioRoute(route, projectSlugs) || !elementExists;
}
