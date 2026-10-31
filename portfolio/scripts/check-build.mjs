import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
const root = new URL("../dist/", import.meta.url).pathname;
const errors = [];
const indexPath = join(root,"index.html");
if (!existsSync(indexPath)) errors.push("dist/index.html is missing");
if (existsSync(indexPath)) {
  const html = readFileSync(indexPath,"utf8");
  if (!html.includes('id="root"')) errors.push("React root element is missing");
  if (!html.includes("assets/")) errors.push("Built asset references are missing");
}
const assetsPath = join(root,"assets");
if (!existsSync(assetsPath)) errors.push("dist/assets is missing");
else {
  const assets = readdirSync(assetsPath);
  if (!assets.some(file=>file.endsWith(".js"))) errors.push("Built JavaScript bundle is missing");
  if (!assets.some(file=>file.endsWith(".css"))) errors.push("Built CSS bundle is missing");
}
if (!existsSync(join(root,"favicon.svg"))) errors.push("favicon.svg was not copied to dist");
if (errors.length) {
  console.error("Portfolio build check failed:");
  for (const error of errors) console.error(" - "+error);
  process.exit(1);
}
console.log("PASS: Vite output contains the React entry page, JavaScript, CSS and favicon.");