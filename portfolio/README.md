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

- `styles.css` — one shared visual system, page layouts and responsive styling.
- `site.js` — English/Vietnamese switch, navigation labels and per-page metadata.
- `favicon.svg` — site icon.
- `scripts/check_site.py` — checks all HTML pages, local links, H1/IDs and shared assets.

## Navigation

Navigation links stay visible across pages. On smaller screens they move to a second row and can scroll horizontally when space is limited.

## Visual system

A high-contrast editorial interface: deep navy hero and footer, warm off-white content areas, coral calls to action and a restrained indigo secondary accent. Motion is limited to short hover feedback and subtle card elevation; no large gradients, animated backgrounds or decorative effects that obscure project status. Past work, current development and planned experiments are labelled separately; unverified metrics are not displayed. System font stacks avoid remote font dependencies.

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
