# Minh Phat — React Portfolio

A bilingual (English/Vietnamese) React portfolio for Python application engineering, ERP/WMS workflows and applied AI project work.

## Structure

- src/main.jsx — React application, hash-based navigation, language switch and project content.
- src/storage.js — optional, failure-safe language preference persistence.
- src/routing.js — distinguishes application routes from in-page fragment anchors.
- src/styles.css — responsive visual system, page layouts and interaction states.
- public/favicon.svg — site icon.
- public/fabric-surface-study.svg — explicitly labelled editorial illustration for the Fabric blog.
- scripts/check-build.mjs — verifies the generated production output.
- scripts/test-runtime-safety.mjs — tests normal and denied browser-storage behaviour.
- vite.config.js — Vite build configuration.

## Project navigation

Projects is the parent section with two branches:

- Backend — RackFlow Mini ERP/WMS, a personal project in development.
- AI — past freelance Computer Vision and OCR work, plus the Fabric Defect Inspection experimental prototype.

Project detail pages describe the problem, individual role, scope, implementation, evidence, limitations and next steps.

## Run locally

Requires Node.js 20.19+ or 22.12+.

    cd portfolio
    npm install
    npm run dev

Open the local URL printed by Vite.

## Validate and build

    npm run check
    npm run preview

The production build is written to dist/.

## Vercel

Keep the Vercel project Root Directory set to portfolio. The vercel.json in this directory configures the Vite build and dist output. The application uses hash-based navigation, so page selection does not depend on server-side route rewrites.

## Content integrity

- Sumida is listed as 1 year 10 months; the current CV should remain the source of truth for exact dates and title.
- Halovi is a five-month Computer Vision contract.
- Freelance work from 09/2022 to 12/2024 is intermittent and limited to two main projects.
- RackFlow is a personal project in development, not a deployed customer system.
- Fabric Defect Inspection is an experimental Faster R-CNN / MobileNetV3-FPN prototype. The listed validation values are experimental; scores are uncalibrated, OOD generalization is not established, and no factory deployment is claimed.
- The Fabric case study reserves a YouTube video area. Set its `youtubeUrl` field in `src/main.jsx` when a real demo URL is available.
- No unverified KPI, production metric or industrial OT/IT hands-on experience is claimed.
- Contact actions use direct email, LinkedIn and GitHub links. There is no fake form submission.