import assert from "node:assert/strict";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createServer } from "vite";

const routes = [
  ["home", "Hi, I'm Phát."],
  ["projects", "Browse the work"],
  ["projects/ai", "AI"],
  ["projects/backend", "Backend"],
  ["experience", "Experience"],
  ["skills", "Python application development"],
  ["education", "Engineering foundation."],
  ["about", "From Mechatronics"],
  ["contact", "Have an operational workflow"],
  ["project/rackflow", "RackFlow"],
  ["project/supermarket", "Supermarket Delivery Monitoring"],
  ["project/ocr", "OCR-assisted Data Entry"],
  ["project/fabric", "Fabric Defect Inspection"],
  ["project/unknown", "404 / NOT FOUND"]
];

const storage = new Map();
globalThis.window = {
  location: { hash: "#home" },
  localStorage: {
    getItem(key) { return storage.has(key) ? storage.get(key) : null; },
    setItem(key, value) { storage.set(key, String(value)); }
  }
};

const server = await createServer({
  configFile: "./vite.config.js",
  server: { middlewareMode: true },
  appType: "custom"
});

try {
  const { App } = await server.ssrLoadModule("/src/main.jsx");
  assert.equal(typeof App, "function", "App must be exported for render smoke tests");

  for (const lang of ["en", "vi"]) {
    storage.set("portfolio-language", lang);

    for (const [route, expected] of routes) {
      window.location.hash = `#${route}`;
      const html = renderToStaticMarkup(React.createElement(App));

      assert.ok(html.includes('id="main-content"'), `Missing main content: ${lang} / ${route}`);
      assert.ok(!html.includes("PAGE RENDER ERROR"), `Render boundary activated: ${lang} / ${route}`);
      if (route === "home") {
        assert.ok(html.includes(lang === "en" ? "Hi, I'm Phát." : "Xin chào, tôi là Phát."),
          `Homepage headline missing: ${lang}`);
      }
      if (route === "project/fabric") {
        assert.ok(html.includes(lang === "en" ? "Fabric Defect Inspection" : "Kiểm tra lỗi bề mặt vải"),
          `Fabric detail heading missing: ${lang}`);
      }
      if (route === "project/unknown") {
        assert.ok(html.includes(lang === "en" ? "This portfolio page could not be found." : "Không tìm thấy trang này."),
          `Unknown project should render NotFound: ${lang}`);
      }
    }
  }

  console.log(`PASS: React render smoke tests passed for ${routes.length} routes in EN and VI (${routes.length * 2} renders).`);
} finally {
  await server.close();
  delete globalThis.window;
}
