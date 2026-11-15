import assert from "node:assert/strict";
import { readStoredLanguage, writeStoredLanguage } from "../src/storage.js";
import { shouldHandleHashAsRoute } from "../src/routing.js";

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

// App routes must be handled by the hash router.
assert.equal(shouldHandleHashAsRoute("projects", true, projectSlugs), true);
assert.equal(shouldHandleHashAsRoute("projects/ai", false, projectSlugs), true);
assert.equal(shouldHandleHashAsRoute("project/fabric", false, projectSlugs), true);

// Existing in-page targets must not be mistaken for app routes.
assert.equal(shouldHandleHashAsRoute("main-content", true, projectSlugs), false);
assert.equal(shouldHandleHashAsRoute("fabric-challenge", true, projectSlugs), false);
assert.equal(shouldHandleHashAsRoute("fabric-model", true, projectSlugs), false);

// Unknown hashes without a matching target still render the app's Not Found page.
assert.equal(shouldHandleHashAsRoute("not-a-route", false, projectSlugs), true);

console.log("PASS: app routes and in-page anchors are handled separately.");
