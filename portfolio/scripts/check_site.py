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
    # Put the candidate's identity and professional direction above the fold.
    for marker in (
        '<h1 id="heroHeadline">Trần Việt Minh Phát</h1>',
        'id="heroRole"',
        "Python Application Engineer · ERP/WMS &amp; Factory Applications",
        "My experience includes 1 year 10 months at Sumida",
    ):
        if marker not in source:
            errors.append(f"candidate identity marker missing: {marker}")
    # The first visit should be a complete Vietnamese experience; later user choice uses a new preference key.
    for marker in (
        '<html lang="vi">',
        'var initialLanguage="vi";',
        'portfolio-language-v2',
        'window.localStorage.setItem("portfolio-language-v2",language)',
    ):
        if marker not in source:
            errors.append(f"default language marker missing: {marker}")
    # Ensure the website offers a real English/Vietnamese language switch.
    for marker in ('id="langEN"', 'id="langVI"', 'function setLanguage(language)', 'portfolio-language-v2'):
        if marker not in source:
            errors.append(f"bilingual switch marker missing: {marker}")
    # Catch regressions in desktop alignment and responsive navigation.
    for marker in (
        ".nav{min-height:76px;display:flex;align-items:center;gap:22px;position:relative}",
        ".navlinks{display:flex;align-items:center;gap:clamp(12px,1.6vw,22px);margin-left:auto}",
        ".nav-tools{display:flex;align-items:center;gap:8px;flex:none}",
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
                "Python application development · ERP/WMS": "Phát triển ứng dụng Python · ERP/WMS",
                "Python Application Engineer · ERP/WMS & Factory Applications": "Kỹ sư phát triển ứng dụng Python · ERP/WMS và ứng dụng nhà máy",
                "Problem & objective": "Bài toán và mục tiêu",
                "Employment & fixed-term contract": "Việc làm và hợp đồng có thời hạn",
                "Open to relevant opportunities in Python applications, ERP/WMS, backend development and application support. Computer Vision remains a supplementary direction.": "Tôi quan tâm đến cơ hội phù hợp trong phát triển ứng dụng Python, ERP/WMS, lập trình phía máy chủ và hỗ trợ ứng dụng. Thị giác máy tính vẫn là hướng bổ trợ.",
            }.items():
                if translations.get(key) != value:
                    errors.append(f"missing/incorrect Vietnamese translation: {key}")
            for key, value in {
                "Python application development · ERP/WMS": "Phát triển ứng dụng Python · ERP/WMS",
                "How I approach a workflow": "Cách tôi tiếp cận quy trình",
                "Workflow sketch": "Phác thảo quy trình",
                "Things I’ve built — and what still needs proof.": "Những gì tôi đã làm — và những gì cần thêm bằng chứng.",
            }.items():
                if translations.get(key) != value:
                    errors.append(f"personal portfolio translation missing/incorrect: {key}")
            for key in ("Menu", "A project-based freelance workflow using video to detect and track activity related to supermarket deliveries.", "Computer Vision & OCR"):
                if key not in translations:
                    errors.append(f"missing Vietnamese localization entry: {key}")
            for key in (
                "A project-based freelance workflow using video to detect and track activity related to supermarket deliveries.",
                "Computer Vision & OCR",
                "Menu",
            ):
                value = translations.get(key, "")
                if any(term in value.lower() for term in ("freelance", "computer vision", "portfolio", "production")):
                    errors.append(f"English prose remains in Vietnamese translation for: {key}")
        except json.JSONDecodeError:
            errors.append("translation dictionary is not valid JSON")
    # Verify button and CTA labels are localized as complete units in both languages.
    for marker in (
        "setControlLabel('.navlinks a[href=\"#work\"]',\"Selected work\",\"Dự án\")",
        "setControlLabel('.menu-button',\"Menu\",\"Danh mục\")",
        "Xem các dự án tôi đã thực hiện <span aria-hidden=\"true\">↘</span>",
        "setControlLabel('.contact-actions a.btn-primary',\"Email me ↗\",\"Gửi email ↗\")",
        "setControlLabel('.footer-links a[href=\"#top\"]',\"Back to top ↑\",\"Về đầu trang ↑\")",
        'if(focus) focus.setAttribute("aria-label",language==="vi"?"Cách tôi tiếp cận quy trình"',
        'if(sketch) sketch.setAttribute("aria-label",language==="vi"?"Mô hình quy trình RackFlow"',
    ):
        if marker not in source:
            errors.append(f"localized control marker missing: {marker}")
    # Protect the personal portfolio identity and readability-focused style.
    for marker in (
        "--accent:#b94e32",
        "Python application development · ERP/WMS",
        "How I approach a workflow",
        "Things I’ve built — and what still needs proof.",
        "workflow-sketch",
        "Illustrative model · not a product screenshot",
        ".case-study{background:var(--paper);border:0;border-left:3px solid var(--accent)",
        ".project-card{display:flex;flex-direction:column;position:relative;background:transparent",
        "prefers-reduced-motion:reduce",
    ):
        if marker not in source:
            errors.append(f"personal portfolio style marker missing: {marker}")
    if not (ROOT / "favicon.svg").is_file():
        errors.append("favicon.svg is missing")
    if errors:
        print("FAIL: " + "; ".join(errors))
        return 1
    print(f"PASS: title, one h1, {len(parser.ids)} IDs, anchors, required sections and favicon.")
    return 0

if __name__ == "__main__":
    sys.exit(main())
