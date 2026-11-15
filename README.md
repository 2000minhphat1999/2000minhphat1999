<div align="center">

# Tran Viet Minh Phat

### Personal Engineering Portfolio · IT Staff / ERP Support · Python · ERP/WMS

I have 1 year 10 months of experience contributing to WMS and FEMS development at Sumida: clarifying warehouse requirements, analysing workflows, implementing application logic, testing, fixing defects and supporting trial runs. I am targeting IT Staff / ERP Support and factory application roles. RackFlow is a personal ERP/WMS project in development; Computer Vision and OCR are supporting project experience.

[**Live Portfolio**](https://2000minhphat1999-portfolio.vercel.app/) · [**Portfolio Source**](https://github.com/2000minhphat1999/2000minhphat1999/tree/main/portfolio) · [LinkedIn](https://www.linkedin.com/in/minhphat-ai/) · [Email](mailto:tranvietminhphat@gmail.com)

</div>

---

## Professional Direction

- **Core:** Python, application logic, SQL, debugging and testing
- **Application stack:** Flask, FastAPI, SQLAlchemy, PostgreSQL
- **Operational context:** WMS workflows, FEMS data processing and dashboards
- **Supporting project work:** YOLOv5, DeepSORT, OCR and image processing

## Selected Work

### RackFlow — Mini ERP/WMS

**Status: In development · Personal portfolio project**

A warehouse operations application focused on inbound receiving, inventory lookup, order lookup, stock reservation and event history.

- Stack: Python, FastAPI, Flask, SQLAlchemy and PostgreSQL.
- Current limitation: outbound workflows and AI-assisted operations remain under development.
- Not presented as a deployed customer or production warehouse system.

[View the RackFlow case study](https://2000minhphat1999-portfolio.vercel.app/#project/rackflow)

### Supermarket Delivery Monitoring

**Status: Past project-based freelance work**

A video-based Computer Vision workflow using YOLOv5 for object detection and DeepSORT for object tracking. No unverified accuracy, FPS or time-saving metrics are claimed.

[View the case study](https://2000minhphat1999-portfolio.vercel.app/#project/supermarket)

### OCR-assisted Data Entry

**Status: Past project-based freelance work**

A workflow that used image processing and OCR to extract information from vehicle-inspection records and automate data entry into the Da Nang Port website. Document-level accuracy and time savings are not asserted without evidence.

[View the case study](https://2000minhphat1999-portfolio.vercel.app/#project/ocr)

### Fabric Defect Inspection

**Status: Experimental prototype · validation ongoing**

A fabric-surface defect detector using Faster R-CNN with a MobileNetV3-FPN backbone. The image-inference interface returns predicted boxes, one of nine Vietnamese defect labels, raw model scores (0–1) and JSON output.

- Three-seed validation mAP50–95: 0.412 / 0.412 / 0.426.
- Model scores are not calibrated probabilities; external/OOD generalization is not established.
- No factory deployment or production KPI is claimed.

[View the case study](https://2000minhphat1999-portfolio.vercel.app/#project/fabric)

## Experience Snapshot

- **Sumida:** 1 year 10 months in software development, focused on WMS workflows and FEMS data/dashboard functions.
- **Halovi:** five-month Computer Vision contract.
- **Freelance:** project-based engagements from 09/2022 to 12/2024, with gaps between projects; not continuous full-time employment.
- **Earlier experience:** research/education work at The University of Technology and Education — The University of Danang, and an engineering internship at Premo Vietnam.

## Education

**B.Eng. in Mechatronics Engineering Technology**  
The University of Technology and Education — The University of Danang · 09/2018–06/2023 · Degree classification: Good

Co-author of “Building An IoT-Based Waste Management System for Hazardous Waste,” REC-ECIT 2023, pp. 193–198.

## Portfolio Implementation

The portfolio is built with React 19 and Vite 7. Its source and deployment configuration are in the portfolio directory. The Vercel project Root Directory should remain portfolio; Vite builds to portfolio/dist.

Run locally:

    cd portfolio
    npm install
    npm run dev

Validate the production build:

    npm run check