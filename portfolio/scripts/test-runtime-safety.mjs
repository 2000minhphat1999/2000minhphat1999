import assert from "node:assert/strict";
import { readStoredLanguage, writeStoredLanguage } from "../src/storage.js";
import { buildPortfolioAnchorHash, isCurrentPortfolioAnchor, isPortfolioRoute, parsePortfolioHash } from "../src/routing.js";

const values = new Map();
const memoryStorage = {
  getItem(key) {
    return values.has(key) ? values.get(key) : null;
  },
  setItem(key, value) {
    values.set(key, String(value));
  }
};

// Normal preference restore and persistence.
assert.equal(readStoredLanguage(() => memoryStorage), "en");
assert.equal(writeStoredLanguage("vi", () => memoryStorage), true);
assert.equal(readStoredLanguage(() => memoryStorage), "vi");

// Unknown values safely fall back to the default language.
memoryStorage.setItem("portfolio-language", "fr");
assert.equal(readStoredLanguage(() => memoryStorage), "en");

// Simulate browsers that deny storage access (SecurityError).
const deniedStorage = () => {
  throw new DOMException("Storage access denied", "SecurityError");
};
assert.equal(readStoredLanguage(deniedStorage), "en");
assert.equal(writeStoredLanguage("vi", deniedStorage), false);

// Simulate a Storage object whose getter/setter methods themselves fail.
const throwingStorage = {
  getItem() {
    throw new DOMException("Storage access denied", "SecurityError");
  },
  setItem() {
    throw new DOMException("Storage access denied", "SecurityError");
  }
};
assert.equal(readStoredLanguage(() => throwingStorage), "en");
assert.equal(writeStoredLanguage("vi", () => throwingStorage), false);

console.log("PASS: language preference works normally and storage denial never aborts startup.");

const projectSlugs = ["rackflow", "supermarket", "ocr", "fabric"];

// App routes remain explicit, and unknown routes remain invalid.
assert.equal(isPortfolioRoute("projects", projectSlugs), true);
assert.equal(isPortfolioRoute("projects/ai", projectSlugs), true);
assert.equal(isPortfolioRoute("project/fabric", projectSlugs), true);
assert.equal(isPortfolioRoute("project/unknown", projectSlugs), false);
assert.equal(isPortfolioRoute("fabric-model", projectSlugs), false);

// In-page links preserve the app route as well as the target anchor.
const anchorHash = buildPortfolioAnchorHash("project/fabric", "fabric-model");
assert.equal(anchorHash, "#project/fabric?anchor=fabric-model");
assert.deepEqual(parsePortfolioHash(anchorHash), {
  route: "project/fabric",
  anchor: "fabric-model"
});
assert.deepEqual(parsePortfolioHash("#projects?anchor=main-content"), {
  route: "projects",
  anchor: "main-content"
});

// Direct app URLs, legacy app hashes and malformed anchors parse safely.
assert.deepEqual(parsePortfolioHash("#project/fabric"), {
  route: "project/fabric",
  anchor: null
});
assert.deepEqual(parsePortfolioHash(""), {
  route: "home",
  anchor: null
});
assert.deepEqual(parsePortfolioHash("#project/fabric?anchor=invalid%20anchor"), {
  route: "project/fabric",
  anchor: null
});

assert.equal(isCurrentPortfolioAnchor("#project/fabric?anchor=fabric-model", "project/fabric", "fabric-model"), true);
assert.equal(isCurrentPortfolioAnchor("#project/fabric?anchor=fabric-model", "project/fabric", "fabric-next"), false);
assert.equal(isCurrentPortfolioAnchor("#project/fabric", "project/fabric", "fabric-model"), false);

console.log("PASS: shareable anchors preserve routes and support same-target click detection.");
