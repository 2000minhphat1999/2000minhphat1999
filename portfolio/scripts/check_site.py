from html.parser import HTMLParser
import json
import re
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
PAGE = ROOT / "index.html"

class Parser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.title_depth = 0
        self.title_text = []
        self.h1 = 0
        self.ids = []
        self.anchors = []
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "title":
            self.title_depth += 1
        if tag == "h1":
            self.h1 += 1
        if attrs.get("id"):
            self.ids.append(attrs["id"])
        href = attrs.get("href", "")
        if tag == "a" and href.startswith("#") and len(href) > 1:
            self.anchors.append(href[1:])
    def handle_endtag(self, tag):
        if tag == "title" and self.title_depth:
            self.title_depth -= 1
    def handle_data(self, data):
        if self.title_depth:
            self.title_text.append(data)

def main():
    if not PAGE.is_file():
        print("FAIL: portfolio/index.html is missing")
        return 1
    source = PAGE.read_text(encoding="utf-8")
    parser = Parser()
    parser.feed(source)
    errors = []
    if not "".join(parser.title_text).strip():
        errors.append("page title is missing")
    if parser.h1 != 1:
        errors.append(f"expected exactly one h1, found {parser.h1}")
    duplicates = sorted({item for item in parser.ids if parser.ids.count(item) > 1})
    if duplicates:
        errors.append("duplicate IDs: " + ", ".join(duplicates))
    unresolved = sorted(set(parser.anchors) - set(parser.ids))
    if unresolved:
        errors.append("unresolved in-page links: " + ", ".join(unresolved))
    for section in ("work", "rackflow", "fabric-defect-inspection", "supermarket-delivery-monitoring", "ocr-assisted-data-entry", "video", "experience", "capabilities", "education", "contact"):
        if section not in parser.ids:
            errors.append(f"missing section: #{section}")
    for text in ("tranvietminhphat@gmail.com", "Python application engineering", "RackFlow — Mini ERP / WMS", "Fabric Defect Inspection", "Freelance Software Projects", "https://www.youtube.com/embed/tUJHJBcuKA0", "<iframe", "Planning stage"):
        if text not in source:
            errors.append(f"required content missing: {text}")
    # Ensure the website offers a real English/Vietnamese language switch.
    for marker in ('id="langEN"', 'id="langVI"', 'function setLanguage(language)', 'portfolio-language'):
        if marker not in source:
            errors.append(f"bilingual switch marker missing: {marker}")
    # Catch regressions in desktop alignment and responsive navigation.
    for marker in (
        "justify-content:flex-start;gap:22px;position:relative",
        "margin-left:auto}",
        "margin-left:6px",
        "@media(max-width:850px)",
        ".navlinks.is-open{display:flex}",
        "aria-controls=\"navLinks\"",
    ):
        if marker not in source:
            errors.append(f"navigation layout marker missing: {marker}")
    match = re.search(r"var translations=(\{[\s\S]*?\});\n  var textRecords", source)
    if not match:
        errors.append("translation dictionary is missing or malformed")
    else:
        try:
            translations = json.loads(match.group(1))
            if len(translations) < 100:
                errors.append(f"translation dictionary unexpectedly small: {len(translations)} entries")
            for key, value in {
                "I build software for": "Tôi xây dựng phần mềm cho",
                "Problem & objective": "Bài toán và mục tiêu",
                "Employment & fixed-term contract": "Việc làm và hợp đồng có thời hạn",
                "Open to relevant opportunities in Python applications, ERP/WMS, backend development and application support. Computer Vision remains a supplementary direction.": "Quan tâm đến cơ hội phù hợp trong phát triển ứng dụng Python, ERP/WMS, backend và hỗ trợ ứng dụng. Computer Vision vẫn là hướng bổ trợ.",
            }.items():
                if translations.get(key) != value:
                    errors.append(f"missing/incorrect Vietnamese translation: {key}")
        except json.JSONDecodeError:
            errors.append("translation dictionary is not valid JSON")
    if not (ROOT / "favicon.svg").is_file():
        errors.append("favicon.svg is missing")
    if errors:
        print("FAIL: " + "; ".join(errors))
        return 1
    print(f"PASS: title, one h1, {len(parser.ids)} IDs, anchors, required sections and favicon.")
    return 0

if __name__ == "__main__":
    sys.exit(main())
