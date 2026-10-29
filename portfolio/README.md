# Minh Phat — Professional Portfolio

A responsive, bilingual static portfolio for Python application engineering, ERP/WMS workflows and applied AI projects. Each project has its **own HTML page**; shared styling and navigation keep the experience consistent.

## Site map

- `index.html` — career positioning, experience, skills, education, contact and project directory.
- `fullstack.html` — Full-Stack Systems overview.
- `rackflow.html` — standalone RackFlow Mini ERP/WMS case study; personal project in development.
- `ai-projects.html` — AI / Computer Vision overview.
- `supermarket-delivery-monitoring.html` — past project-based Computer Vision work using YOLOv5 and DeepSORT.
- `ocr-assisted-data-entry.html` — past project-based OCR/document automation.
- `fabric-defect-inspection.html` — proposed industrial visual-inspection experiment, explicitly not implemented or evaluated.

## Shared files

- `styles.css` — Systems Ledger design system and responsive layouts.
- `site.js` — English/Vietnamese switch, navigation labels and per-page metadata.
- `favicon.svg` — site icon.
- `scripts/check_site.py` — checks all HTML pages, local links, H1/IDs and shared assets.

## Navigation

Six persistent destinations: Home, Full-Stack Systems, AI Projects, Experience, Skills and Contact. The current page is highlighted. All links remain visible on mobile; the menu reflows into three columns and then two columns rather than hiding behind a hamburger button.

## Visual system

Warm paper surfaces, ink text, deep teal accents and amber status highlights. Typography uses Georgia, system sans-serif and system monospace fonts. No remote font dependency is required.

## Content integrity

- Sumida is described as 1 year 10 months, with WMS and FEMS scope.
- Halovi is a five-month Computer Vision contract.
- Freelance work is described as intermittent project-based work with two main projects.
- RackFlow is a personal project in development, not a deployed customer system.
- Fabric Defect Inspection is a proposal only. No dataset, trained model, measured metric or factory integration is claimed.
- Workflow strips and evaluation plans are labelled as conceptual/recommended, not measured results.

## Run and validate locally

Static site; no backend or package installation required.

```bash
cd portfolio
python scripts/check_site.py
python -m http.server 8000
```

Open `http://localhost:8000`. Test navigation, every project page and the EN/VI selector.
