from html.parser import HTMLParser
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
    for section in ("projects", "video", "experience", "skills", "education", "contact"):
        if section not in parser.ids:
            errors.append(f"missing section: #{section}")
    for text in ("tranvietminhphat@gmail.com", "RackFlow", "Fabric Defect Inspection", "https://www.youtube.com/embed/tUJHJBcuKA0", "<iframe"):
        if text not in source:
            errors.append(f"required content missing: {text}")
    if not (ROOT / "favicon.svg").is_file():
        errors.append("favicon.svg is missing")
    if errors:
        print("FAIL: " + "; ".join(errors))
        return 1
    print(f"PASS: title, one h1, {len(parser.ids)} IDs, anchors, required sections and favicon.")
    return 0

if __name__ == "__main__":
    sys.exit(main())
