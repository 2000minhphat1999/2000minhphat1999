# Minh Phat — Professional Portfolio

A recruiter-first, responsive static portfolio with a working **English / Vietnamese (EN / VI) language switch**. It focuses on **Python application engineering, ERP/WMS workflows and application support**. Computer Vision and OCR are shown as supporting contract/project experience, not as the primary positioning.

## Language support

- Use the **EN / VI** selector in the top navigation to switch the entire page between English and Vietnamese.
- The switch updates visible copy, page language metadata and title/description; the selected language is remembered in the browser when local storage is available.
- Technical names, company names, dates and technology identifiers remain unchanged where translating them would reduce clarity.
- The default language is Vietnamese. Recruiters can select EN for the complete English version; the choice is remembered for later visits.

## Visual system — Systems Ledger

The portfolio uses a **technical editorial** visual identity with warm paper surfaces, a teal hero, amber highlights and explicit project taxonomy. Full-Stack / Business Systems is separate from AI, which is split into Computer Vision, OCR/document automation and planned industrial visual inspection.

- **Canvas:** `#F4F1EA`; paper surface: `#FBF9F3`; primary text: `#1C1917`.
- **Primary accent:** deep teal `#0F4C5C`; **highlight/status accent:** amber `#B45309`.
- **Typography:** Georgia / system sans-serif / system monospace, with no remote font dependency.
- **Project presentation:** RackFlow is the detailed Full-Stack case study. AI separates detection/tracking, OCR/document automation and planned fabric-defect inspection. Workflow strips are conceptual summaries, not verified production architecture.
- **Interaction and accessibility:** the EN / VI switch remains functional; always-visible mobile navigation, keyboard focus, skip link and reduced-motion preferences are preserved; no hidden hamburger menu is required.

## Information architecture

1. **Positioning** — professional direction and direct contact paths.
2. **Full-Stack / Business Systems** — RackFlow Mini ERP/WMS is the primary personal build, with workflow, scope, implementation, evidence limits and next steps.
3. **AI / Computer Vision** — supermarket delivery monitoring using YOLOv5 detection and DeepSORT tracking.
4. **AI / OCR & document automation** — vehicle-inspection document extraction and website data entry.
5. **AI / Industrial visual inspection** — fabric defect inspection remains a planned experiment, with dataset, baseline and evaluation steps identified as future work.
6. **Experience, capabilities, education and contact** — remain separate sections for recruiter scanning.

## Accuracy rules

- Sumida is recorded as 1 year 10 months; do not round it to two years.
- Halovi is recorded as a five-month Computer Vision contract.
- Freelance engagements from 09/2022 to 12/2024 were intermittent, with gaps; they are not shown as continuous full-time employment.
- RackFlow is in development. Only the inbound, inventory lookup, order lookup, stock reservation and event-history scope is presented as current; outbound and AI-assisted workflows are still under development.
- Fabric Defect Inspection is a plan, not a completed experiment. No performance metrics are claimed.
- Computer Vision and OCR project descriptions do not include unverified accuracy, FPS or time-saving metrics.
- Industrial OT/IT tools are not presented as professional hands-on experience.
- No public project-source/demo link is invented. Add one after the repository is safe and ready to share.
- The contact CTA uses an email link; there is no fake contact form or backend.

## Local preview

From this directory:

```bash
python -m http.server 8000
```

Open http://localhost:8000 in a browser.

## Deploy to Vercel

This static website is under `portfolio/` in the GitHub profile repository.

1. Import `2000minhphat1999/2000minhphat1999` in Vercel.
2. Set **Root Directory** to `portfolio`.
3. Choose **Other** / static site if a framework preset is requested.
4. Leave the build command empty.
5. Deploy and inspect the live site on desktop and mobile.

Do not move `index.html` to the repository root unless the Vercel Root Directory is updated as part of the same change.

## Validation

The repository workflow runs `python portfolio/scripts/check_site.py` on changes to the portfolio. It checks the HTML title, single H1, unique IDs, internal navigation targets, required sections, project case-study anchors, video fallback, favicon, language controls and key Vietnamese translation entries.
