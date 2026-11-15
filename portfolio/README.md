# Trần Việt Minh Phát — Personal Engineering Portfolio

A bilingual (English/Vietnamese) personal portfolio about my work in Python applications, ERP/WMS, WMS/FEMS development, Computer Vision, OCR and industrial engineering data.

## Structure

- `src/main.jsx` — React application, page content, hash navigation and language switch.
- `src/storage.js` — language preference persistence with a safe fallback when browser storage is unavailable.
- `src/routing.js` — application routes and route-preserving in-page anchors.
- `src/styles.css` — editorial visual system, responsive layouts and interaction states.
- `public/favicon.svg` — site icon.
- `public/fabric-surface-study.svg` — illustration used in the Fabric engineering article.
- `scripts/check-build.mjs` — production-output checks.
- `scripts/test-runtime-safety.mjs` — storage and routing regression checks.
- `scripts/test-render-smoke.mjs` — English/Vietnamese render checks for every route.
- `vite.config.js` — Vite build configuration.

## Portfolio sections

- **Home:** personal introduction, experience snapshot and selected projects.
- **Projects:** RackFlow, supermarket delivery monitoring, OCR-assisted data entry and Fabric Defect Inspection.
- **Experience:** employment, contract, independent projects, research/education and internship.
- **Skills:** Python/backend, business applications, databases, Computer Vision/OCR and industrial data.
- **Education:** Mechatronics degree, publication and research awards.
- **About me:** personal story, career journey and working approach.
- **Contact:** email, LinkedIn and GitHub.

## Run locally

Requires Node.js 20.19+ or 22.12+.

    cd portfolio
    npm install
    npm run dev

Open the local URL printed by Vite.

## Validate and build

    npm run check
    npm run preview

The production build is written to `dist/`.

## Vercel

Keep the Vercel project Root Directory set to `portfolio`. The `vercel.json` in this directory configures the Vite build and `dist` output. The application uses hash-based navigation, so page selection does not depend on server-side route rewrites.

## Project status

- **RackFlow:** personal ERP/WMS project in development; inbound receiving, inventory lookup, order lookup, reservation and event history are part of the current scope. Outbound and Gemini-assisted workflows are being developed.
- **Supermarket Delivery Monitoring:** YOLOv5 detection and DeepSORT tracking applied to supermarket delivery video.
- **OCR-assisted Data Entry:** vehicle-registration document extraction and Selenium-based website entry.
- **Fabric Defect Inspection:** Faster R-CNN / MobileNetV3-FPN experiment with E1 validation results across three random seeds. Current evaluation work includes independent-data testing and score calibration.

Work and project descriptions distinguish employment, contract, project-based engagements, research/education and internship experience.

## Contact

The site links directly to email, LinkedIn and GitHub. It does not display a form that submits nowhere.
