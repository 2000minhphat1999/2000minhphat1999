import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createServer } from "vite";

const routes = [
  ["home", "Hi, I'm Phát.", "Xin chào, tôi là Phát."],
  ["projects", "Projects", "Dự án"],
  ["projects/ai", "AI", "AI"],
  ["projects/backend", "Backend", "Backend"],
  ["experience", "Work, projects and the people behind them.", "Công việc và dự án tôi đã đi qua."],
  ["skills", "The tools I use to turn requirements into working software.", "Công nghệ tôi sử dụng để biến yêu cầu thành phần mềm hoạt động."],
  ["education", "Where my engineering journey began.", "Nơi hành trình kỹ thuật của tôi bắt đầu."],
  ["about", "I enjoy building software that helps everyday work run better.", "Tôi thích xây dựng phần mềm giúp công việc vận hành tốt hơn."],
  ["contact", "Let's talk about software and the work it supports.", "Cùng trao đổi về phần mềm và công việc mà nó hỗ trợ."],
  ["project/rackflow", "RackFlow", "RackFlow"],
  ["project/supermarket", "Supermarket Delivery Monitoring", "Giám sát giao nhận tại siêu thị"],
  ["project/ocr", "OCR-assisted Data Entry", "Nhập liệu tài liệu bằng OCR"],
  ["project/fabric", "Fabric Defect Inspection", "Kiểm tra lỗi bề mặt vải"],
  ["project/unknown", "This portfolio page could not be found.", "Không tìm thấy trang này."]
];

const forbiddenCopy = [
  "Modbus RTU experience is limited",
  "Modbus RTU chỉ giới hạn",
  "limited to my internship",
  "chỉ giới hạn ở kỳ thực tập",
  "not presented as hands-on professional experience",
  "không phải kinh nghiệm triển khai hệ thống SCADA/PLC",
  "mô tả giới hạn theo phần việc"
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

    for (const [route, expectedEn, expectedVi] of routes) {
      window.location.hash = `#${route}`;
      const html = renderToStaticMarkup(React.createElement(App))
        .replaceAll("&#x27;", "'")
        .replaceAll("&amp;", "&");

      const expected = lang === "en" ? expectedEn : expectedVi;
      assert.ok(html.includes('id="main-content"'), `Missing main content: ${lang} / ${route}`);
      assert.ok(!html.includes("PAGE RENDER ERROR"), `Render boundary activated: ${lang} / ${route}`);
      assert.ok(html.includes(expected), `Wrong page content for ${lang} / ${route}; expected marker: ${expected}`);
      assert.ok((html.match(/<h1(?:\s|>)/g) || []).length >= 1, `Page heading missing: ${lang} / ${route}`);
      assert.ok(!html.includes("undefined"), `Undefined content rendered: ${lang} / ${route}`);
      for (const phrase of forbiddenCopy) {
        assert.ok(!html.includes(phrase), `Self-undervaluing copy found on ${lang} / ${route}: ${phrase}`);
      }

      if (route === "skills") {
        assert.equal((html.match(/class="skills-detail-card/g) || []).length, 6,
          `Skills page should render six capability cards: ${lang}`);
        assert.ok(html.includes("Modbus RTU"), `Industrial data capability missing: ${lang}`);
      }
      if (route === "education") {
        assert.ok(html.includes('class="education-grid"'), `Education layout missing: ${lang}`);
        assert.ok(html.includes("REC-ECIT 2023"), `Research publication missing: ${lang}`);
      }
      if (route === "about") {
        assert.ok(html.includes('class="about-story-panel"'), `Personal story panel missing: ${lang}`);
        assert.ok(html.includes("Sumida"), `Professional timeline missing: ${lang}`);
      }
      if (route === "project/fabric") {
        assert.ok(html.includes("0.412") && html.includes("0.426"), `Fabric validation values missing: ${lang}`);
        assert.ok(html.includes("Faster R-CNN"), `Fabric model information missing: ${lang}`);
      }
    }
  }

  const css = await readFile(new URL("../src/styles.css", import.meta.url), "utf8");
  assert.ok(css.includes("@media(max-width:760px)"), "Mobile layout breakpoint missing");
  assert.ok(css.includes("@media(max-width:480px)"), "Small-screen layout breakpoint missing");
  assert.ok(css.includes("prefers-reduced-motion"), "Reduced-motion support missing");

  console.log(`PASS: ${routes.length} routes rendered in EN and VI (${routes.length * 2} renders); route-specific content, Skills, Education, About, Fabric and responsive CSS checks passed.`);
} finally {
  await server.close();
  delete globalThis.window;
}
