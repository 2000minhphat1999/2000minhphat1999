# Minh Phat — Professional Portfolio

A responsive, bilingual static portfolio for Python application engineering, ERP/WMS workflows and applied AI projects. Each project has its **own HTML page**; shared styling and navigation keep the experience consistent.

## Site map

- `index.html` — career positioning, experience, skills, education, contact and project directory.
- `backend.html` — Backend Development overview.
- `rackflow.html` — standalone RackFlow Mini ERP/WMS case study; personal project in development.
- `ai-projects.html` — AI / Computer Vision overview.
- `supermarket-delivery-monitoring.html` — past project-based Computer Vision work using YOLOv5 and DeepSORT.
- `ocr-assisted-data-entry.html` — past project-based OCR/document automation.
- `fabric-defect-inspection.html` — proposed industrial visual-inspection experiment, explicitly not implemented or evaluated.

## Shared files

- `styles.css` — shared visual system, page layouts and responsive styling.
- `site.js` — English/Vietnamese switch, navigation labels and per-page metadata.
- `favicon.svg` — site icon.
- `scripts/check_site.py` — checks all HTML pages, local links, H1/IDs and shared assets.

## Navigation

Six persistent destinations: Home, Backend Development, AI Projects, Experience, Skills and Contact. The current page is highlighted. On smaller screens, navigation moves to a second row and remains horizontally scrollable when space is limited.

## Visual system

A clean engineering-focused interface with white surfaces, soft blue backgrounds, dark navy typography and restrained blue accents. Clear spacing and consistent project/status styles help recruiters scan the work quickly. System font stacks avoid remote font dependencies.

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
