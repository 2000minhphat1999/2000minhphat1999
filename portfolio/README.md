# Minh Phat — React Portfolio

A bilingual (English/Vietnamese) React portfolio for Python application engineering, ERP/WMS workflows and applied AI project work.

## Structure

- src/main.jsx — React application, hash-based navigation, language switch and project content.
- src/styles.css — responsive visual system, page layouts and interaction states.
- public/favicon.svg — site icon.
- scripts/check-build.mjs — verifies the generated production output.
- vite.config.js — Vite build configuration.

## Project navigation

Projects is the parent section with two branches:

- Backend — RackFlow Mini ERP/WMS, a personal project in development.
- AI — past freelance Computer Vision and OCR work, plus a separately labelled planned fabric-inspection experiment.

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
- Fabric Defect Inspection is a proposal only. No dataset, trained model, measured result or factory integration is claimed.
- No unverified KPI, production metric or industrial OT/IT hands-on experience is claimed.
- Contact actions use direct email, LinkedIn and GitHub links. There is no fake form submission.