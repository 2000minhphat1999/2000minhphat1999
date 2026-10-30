from html.parser import HTMLParser
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
EXPECTED = {
    "index.html", "backend.html", "ai-projects.html", "rackflow.html",
    "supermarket-delivery-monitoring.html", "ocr-assisted-data-entry.html",
    "fabric-defect-inspection.html",
}

class PageParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = []
        self.anchors = []
        self.links = []
        self.h1 = 0
        self.title_depth = 0
        self.title = []
        self.styles = []
        self.scripts = []
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "h1":
            self.h1 += 1
        if tag == "title":
            self.title_depth += 1
        if attrs.get("id"):
            self.ids.append(attrs["id"])
        href = attrs.get("href", "")
        if tag == "a" and href:
            self.links.append(href)
            if href.startswith("#") and len(href) > 1:
                self.anchors.append(href[1:])
        if tag == "link" and attrs.get("rel") == "stylesheet":
            self.styles.append(attrs.get("href", ""))
        if tag == "script" and attrs.get("src"):
            self.scripts.append(attrs["src"])
    def handle_endtag(self, tag):
        if tag == "title" and self.title_depth:
            self.title_depth -= 1
    def handle_data(self, data):
        if self.title_depth:
            self.title.append(data)

def main():
    errors = []
    paths = {p.name: p for p in ROOT.glob("*.html")}
    if set(paths) != EXPECTED:
        errors.append("HTML page set mismatch: found " + ", ".join(sorted(paths)))
    for asset in ("styles.css", "site.js", "favicon.svg"):
        if not (ROOT / asset).is_file():
            errors.append(asset + " missing")
    parsed = {}
    sources = {}
    for name, path in paths.items():
        source = path.read_text(encoding="utf-8")
        sources[name] = source
        parser = PageParser()
        parser.feed(source)
        parsed[name] = parser
        if not "".join(parser.title).strip():
            errors.append(f"{name}: document title missing")
        if parser.h1 != 1:
            errors.append(f"{name}: expected exactly one h1, found {parser.h1}")
        duplicates = sorted({v for v in parser.ids if parser.ids.count(v) > 1})
        if duplicates:
            errors.append(f"{name}: duplicate IDs " + ", ".join(duplicates))
        unresolved = sorted(set(parser.anchors) - set(parser.ids))
        if unresolved:
            errors.append(f"{name}: unresolved fragment links " + ", ".join(unresolved))
        if "styles.css" not in parser.styles:
            errors.append(f"{name}: does not load shared styles.css")
        if "site.js" not in parser.scripts:
            errors.append(f"{name}: does not load shared site.js")
        for link in ("index.html#top", "backend.html", "ai-projects.html",
                     "index.html#experience", "index.html#capabilities", "index.html#contact"):
            if link not in parser.links:
                errors.append(f"{name}: common navigation link missing: {link}")
        if 'id="langEN"' not in source or 'id="langVI"' not in source:
            errors.append(f"{name}: language switch missing")
        if 'id="navLinks"' not in source or 'aria-current="page"' not in source:
            errors.append(f"{name}: visible navigation/current-page marker missing")

    for name in sources:
        for href in parsed[name].links:
            if href.startswith(("http://", "https://", "mailto:", "tel:", "javascript:")):
                continue
            target, _, fragment = href.partition("#")
            target_name = target or name
            if target_name not in paths:
                errors.append(f"{name}: local link target missing: {href}")
                continue
            if fragment and fragment not in parsed[target_name].ids:
                errors.append(f"{name}: local fragment target missing: {href}")

    required = {
        "index.html": ["Trần Viết Minh Phát", "PYTHON BACKEND",
                       "COMPUTER VISION &amp; OCR", 'id="experience"', 'id="contact"'],
        "backend.html": ["RackFlow — Mini ERP / WMS", "In development", "rackflow.html"],
        "ai-projects.html": ["supermarket-delivery-monitoring.html", "ocr-assisted-data-entry.html",
                             "fabric-defect-inspection.html", "PLANNING STAGE"],
        "rackflow.html": ["Problem &amp; objective", "FastAPI", "PostgreSQL", "personal project"],
        "supermarket-delivery-monitoring.html": ["YOLOv5", "DeepSORT", "Evaluation plan"],
        "ocr-assisted-data-entry.html": ["OCR", "Da Nang Port website", "field-level exact match"],
        "fabric-defect-inspection.html": ["PLANNED EXPERIMENT", "No dataset has been selected", "false-negative"],
    }
    for name, markers in required.items():
        source = sources.get(name, "")
        for marker in markers:
            if marker.lower() not in source.lower():
                errors.append(f"{name}: required content missing: {marker}")

    css_path = ROOT / "styles.css"
    if css_path.is_file():
        css = css_path.read_text(encoding="utf-8")
        for marker in (".nav-shell", ".navlinks{display:grid", "@media(max-width:850px)",
                       "grid-template-columns:repeat(2,minmax(0,1fr))", "prefers-reduced-motion:reduce"):
            if marker not in css:
                errors.append(f"styles.css: missing layout/accessibility rule: {marker}")
    js_path = ROOT / "site.js"
    if js_path.is_file():
        js = js_path.read_text(encoding="utf-8")
        for marker in ("function setLanguage(language)", "portfolio-language-v2",
                       "pageBody.dataset.pageTitleEn", 'href="backend.html"', 'href="ai-projects.html"'):
            if marker not in js:
                errors.append(f"site.js: missing language/navigation behavior: {marker}")

    if errors:
        print("FAIL:")
        for error in errors:
            print(" - " + error)
        return 1
    print(f"PASS: {len(paths)} separate HTML pages, unique H1/IDs, local links, shared assets, visible responsive navigation and required project evidence.")
    return 0

if __name__ == "__main__":
    sys.exit(main())
