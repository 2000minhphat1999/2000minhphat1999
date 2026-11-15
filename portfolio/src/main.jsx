import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { readStoredLanguage, writeStoredLanguage } from "./storage.js";
import { buildPortfolioAnchorHash, isCurrentPortfolioAnchor, isUnmodifiedPrimaryClick, parsePortfolioHash } from "./routing.js";
import "./styles.css";

const text = {
  en: {
    home:"Home", projects:"Projects", all:"All projects", ai:"AI", backend:"Backend", experience:"Experience", about:"About me", contact:"Contact",
    projectsPageIntro:"These are the projects and systems I have worked on, with a closer look at the decisions behind each one.",
    experiencePageIntro:"A look at the teams, projects and engineering environments that have shaped my work.",
    skillsPageIntro:"The tools I use and the kinds of problems I enjoy working on.",
    educationPageIntro:"My engineering education, research and academic work.",
    aboutPageIntro:"I started in Mechatronics and found my direction in software for everyday operations.",
    contactPageIntro:"Open to conversations about IT Staff, ERP Support, Python development and business applications.",
    homeFocusKicker:"WHAT MATTERS TO ME",
    homeFocusTitle:"Software should make the work clearer, not harder.",
    homeFocusText:"I like understanding how a task is done before writing code for it. That means listening to the people who use the system, following the data through each step, and building features that make the process easier to manage.",
    eyebrow:"IT STAFF / ERP SUPPORT · QUANG NGAI", regionLabel:"QUANG NGAI, VIETNAM",
    headlineA:"Hi, I'm Phát.", headlineB:"I build software around real work.",
    heroRole:"Python · WMS / FEMS · Business applications",
    intro:"I spent 1 year and 10 months working on WMS and FEMS at Sumida. I worked with warehouse users, turned operational steps into application logic, built and tested features, and fixed issues along the way. Earlier, I worked on Computer Vision, OCR and industrial data projects. Today, my focus is Python and business applications.",
    explore:"See my work", getInTouch:"Get in touch",
    personalNoteLabel:"A LITTLE ABOUT ME", personalNoteTitle:"An engineering background, a software mindset.",
    personalNoteText:"I studied Mechatronics Engineering Technology. Working with equipment, data and warehouse systems gradually drew me toward software that helps people get their work done.",
    personalFact1Label:"EDUCATION", personalFact1Title:"Mechatronics Engineering", personalFact1Meta:"UTE – The University of Danang · Good classification",
    personalFact2Label:"MY APPROACH", personalFact2Title:"Understand · build · test", personalFact2Meta:"Start with the people, process and expected outcome",
    personalFact3Label:"WHAT I'M BUILDING", personalFact3Title:"RackFlow — Mini ERP / WMS", personalFact3Meta:"A personal warehouse application project",
    experienceStripLabel:"WHERE I'VE WORKED", experienceStripIntro:"A few of the teams and projects that shaped my experience.",
    sumidaPeriod:"02/2025 – 11/2026", sumidaStripText:"WMS & FEMS · Software development",
    haloviPeriod:"11/2023 – 03/2024", haloviStripText:"Computer Vision Engineer · 5-month contract",
    freelancePeriod:"09/2022 – 12/2024", freelanceStripText:"Computer Vision and OCR projects",
    homeWorkKicker:"SELECTED PROJECTS", homeWorkTitle:"A few things I've built.",
    homeWorkIntro:"From warehouse applications to image recognition and document automation, these projects show the kind of problems I have worked on.",
    homeWorkMore:"See all projects",
    personalAboutLink:"More about me", personalExperienceLink:"Experience", personalSkillsLink:"Skills",
    footer:"Thanks for stopping by. Feel free to get in touch.",
    selected:"SELECTED WORK", featuredTitle:"Projects shaped by real problems.",
    featuredIntro:"Take a look at the work, the decisions behind it and what each project does.",
    seeCase:"Explore project", viewAll:"View all projects", inProgress:"In development", past:"Completed project", prototype:"Research prototype", planned:"Planned",
    domains:"AREAS I WORK IN", domainsTitle:"Business applications, with a background in applied AI.",
    domainsIntro:"Python and enterprise workflows are my main direction. Computer Vision and OCR are part of the path that brought me here.",
    backendDesc:"Python applications, business rules, data and warehouse workflows. RackFlow brings these ideas together in a personal ERP/WMS project.",
    aiDesc:"Computer Vision for delivery monitoring, OCR for document data entry, and a fabric-defect detection experiment built with Faster R-CNN.",
    experienceTitle:"Work, projects and the people behind them.",
    experienceIntro:"The roles and projects that have helped me grow as an engineer.",
    employment:"EMPLOYMENT & CONTRACT", earlier:"PROJECT-BASED & EARLIER EXPERIENCE",
    skills:"SKILLS", skillsTitle:"The tools I use to turn requirements into working software.",
    skillsIntro:"A practical mix of software development, business workflows and applied engineering.",
    core:"SOFTWARE DEVELOPMENT", data:"DATA & BUSINESS WORKFLOWS", supporting:"APPLIED ENGINEERING",
    education:"EDUCATION", educationTitle:"Where my engineering journey began.",
    contactTitle:"Let's talk about software and the work it supports.",
    contactText:"I am interested in IT Staff / ERP Support roles, Python development and business applications for manufacturing, warehouse and operations teams.",
    email:"Email", linkedin:"LinkedIn", github:"GitHub profile",
    problem:"The problem", role:"What I did", approach:"How I built it", scope:"What it covers",
    evidence:"Project status", next:"What's next", technologies:"TECHNOLOGIES", videoShowcaseLabel:"VIDEO DEMO · YOUTUBE", videoShowcaseTitle:"Model demonstration", videoPlaceholderTitle:"YouTube demo will appear here", videoPlaceholderText:"A 16:9 video space is reserved. Add a YouTube URL to the youtubeUrl field in the fabric project entry to display the video.", videoFrameTitle:"Fabric defect inspection demo", back:"Back to projects",
    noOt:"",
    sumidaRole:"Software Development Technical Team Lead",
    sumidaWms:"WMS: clarified requirements with warehouse users, analysed workflows, implemented application logic, tested features, fixed defects and supported trial deployment.",
    sumidaFems:"FEMS: contributed to data-processing functions, an electricity-monitoring dashboard and electricity-cost calculations.",
    haloviRole:"Computer Vision Engineer",
    haloviText:"Worked as a Computer Vision Engineer on a five-month contract, contributing to Computer Vision development.",
    freelanceText:"Worked on two main software projects: video-based delivery monitoring for a supermarket and OCR-assisted data entry for Da Nang Port.",
    uniRole:"Research Engineer",
    uniText:"Developed educational websites, designed and assembled STEAM robot systems, and contributed to project-based learning activities.",
    premoRole:"Kaizen Engineer Intern",
    premoText:"Used Python to collect performance data from industrial sensors over Modbus RTU and took part in analysing assembly processes.",
    freelanceType:"Independent software projects", research:"Research & education", internship:"Engineering internship",
    degree:"B.Eng. in Mechatronics Engineering Technology",
    publication:"Co-author of “Building An IoT-Based Waste Management System for Hazardous Waste,” REC-ECIT 2023, pp. 193–198.",
    award:"Encouragement Prize, Student Science and Technology Awards at Higher Education Institutions (2023); Second Prize, Da Nang City Student Scientific Research Competition (2022).",
    rackSummary:"A personal ERP/WMS project built around receiving stock, checking inventory, reserving items and keeping a clear history of warehouse activity.",
    cvSummary:"A Computer Vision project that detects and tracks delivery-related activity from supermarket video.",
    ocrSummary:"A document workflow that extracts information from vehicle registration books and enters it into the Da Nang Port website.",
    fabricSummary:"A fabric-defect detection project using Faster R-CNN and MobileNetV3-FPN, with repeatable validation experiments and an image-inference interface.",
    rackProblem:"Warehouse teams need reliable inventory information and a clear view of what has happened to each order. RackFlow brings the core steps into one application.",
    rackRole:"I designed and am building RackFlow as a personal ERP/WMS project, from the data model and business rules through to the user-facing workflows.",
    rackScope:"Inbound receiving, inventory lookup, order lookup, stock reservation and an event history for tracking changes. Outbound workflows are being added.",
    rackApproach:"Built with Python, FastAPI, Flask, SQLAlchemy and PostgreSQL. The application models stock movements and operational states as explicit business rules.",
    rackEvidence:"Receiving, inventory lookup, order lookup, reservation and event history are implemented. Manual dispatch and Gemini-assisted dispatch are in development.",
    rackNext:"Finish the outbound workflow, then add the Gemini-assisted flow with stock checks, user confirmation and event history.",
    cvProblem:"Make supermarket delivery activity easier to follow by detecting and tracking relevant objects in video.",
    cvRole:"Built a video analytics workflow with YOLOv5 for object detection and DeepSORT for tracking objects across frames.",
    cvEvidence:"The project brought together object detection and tracking in a practical supermarket delivery-monitoring workflow.",
    cvNext:"Extend the evaluation with representative video sequences, tracking stability and clear examples of difficult scenes.",
    ocrProblem:"Reduce repetitive data entry from vehicle registration books into the Da Nang Port website.",
    ocrRole:"Combined image pre-processing and OCR to extract document fields, then used Selenium to enter the extracted information into the website.",
    ocrEvidence:"The workflow connects document capture, text extraction, field handling and browser-based data entry.",
    ocrNext:"Add a review step for uncertain fields and evaluate field-level extraction accuracy on a labelled document set.",
    fabricProblem:"Locate visible fabric defects in an image and identify the corresponding defect category.",
    fabricRole:"I developed the experiment from model selection and dataset preparation through training, validation and an image-inference interface.",
    fabricScope:"Upload a fabric image and receive predicted bounding boxes, one of nine Vietnamese defect labels, a raw model score (0–1) and JSON output.",
    fabricApproach:"Faster R-CNN with a MobileNetV3-FPN backbone, trained on Google Colab with a T4 GPU. I used repeatable validation runs with multiple random seeds.",
    fabricEvidence:"E1 validation mAP50–95 across three seeds: 0.412, 0.412 and 0.426. The interface returns a raw model score; score calibration and evaluation on independent fabric sources are the next steps.",
    fabricNext:"Evaluate the model on independent fabric images, review precision and recall by defect class, and assess score calibration.",
    fabricBlogKicker:"ENGINEERING NOTES · COMPUTER VISION",
    fabricBlogLead:"How I approached fabric-defect detection with Faster R-CNN, checked the model across repeatable validation runs, and built an interface for inspecting image predictions.",
    fabricImageAlt:"Illustration of textile surfaces with different weave textures and example fabric irregularities.",
    fabricImageCaption:"A visual introduction to the fabric-inspection problem.",
    fabricBlogToc:"IN THIS ARTICLE",
    fabricBlogChallengeTitle:"Starting with the inspection problem",
    fabricBlogChallengeP1:"Fabric defects can affect the appearance and quality of material used in sofa manufacturing. For this project, I wanted the model to do more than classify an image: it needed to locate a visible defect and assign it to a category.",
    fabricBlogChallengeP2:"That made object detection a natural fit. The interface presents the model output in a way that a person can inspect, including the predicted location and defect label.",
    fabricBlogModelTitle:"Choosing a model that fits the constraints",
    fabricBlogModelP1:"I chose Faster R-CNN with a MobileNetV3-FPN backbone. The project constraints led me away from the Ultralytics/YOLO11n route and toward a detector that I could train and evaluate in the available environment.",
    fabricBlogModelP2:"The implementation follows a familiar detection workflow: prepare labelled images, train the detector, review its validation behaviour and make predictions available through a small inference interface.",
    fabricBlogSetupTitle:"Setting up repeatable experiments",
    fabricBlogSetupP1:"I trained and evaluated the model on Google Colab with a T4 GPU. For E1, I ran the validation experiment with three random seeds so I could compare results across runs.",
    fabricBlogSetupP2:"The three validation mAP50–95 results were 0.412, 0.412 and 0.426. The similar values give a useful view of repeatability within this experiment.",
    fabricBlogInterfaceTitle:"Turning predictions into something people can inspect",
    fabricBlogInterfaceP1:"The demo flow is deliberately straightforward: upload a fabric image, run inference, inspect the predicted boxes and labels, and access the structured JSON output.",
    fabricBlogInterfaceP2:"Each prediction includes one of nine Vietnamese defect labels and a raw model score between 0 and 1. The score is shown as the model output, separate from a calibrated probability.",
    fabricBlogLimitsTitle:"Validation and further evaluation",
    fabricBlogLimitsP1:"The E1 figures come from the validation split used during development. The next evaluation step is to test on independent fabric sources, lighting conditions and cameras.",
    fabricBlogLimitsP2:"A closer review of per-class precision, recall and missed defects will help show where the model performs well and where the dataset or model needs more work.",
    fabricBlogNextTitle:"What I would test next",
    fabricBlogNextP1:"I plan to evaluate the detector on independent fabric images and inspect representative false positives and missed defects for each category.",
    fabricBlogNextP2:"I will also assess score calibration before introducing confidence thresholds into a human-review workflow.",
    fabricBlogMetricsLabel:"VALIDATION · E1 · THREE SEEDS",
    fabricBlogMetricName:"mAP50–95",
    fabricBlogMetricNote:"E1 validation split · three random seeds",
    fabricBlogTechTitle:"Experiment setup",
    fabricBlogTechModel:"Detector",
    fabricBlogTechBackbone:"Backbone",
    fabricBlogTechRuntime:"Training environment",
    fabricBlogTechTask:"Task",
    fabricBlogTaskValue:"Object detection · bounding boxes",
    fabricBlogClosing:"This project brings together model development, repeatable evaluation and an image-inference interface. The next stage is broader testing on independent fabric data.",
    flow:"WORKFLOW MODEL · ILLUSTRATIVE", receive:"Receive stock", inventory:"Check inventory", reserve:"Reserve stock", trace:"Trace changes",
    video:"Video frames", detection:"YOLOv5 detection", tracking:"DeepSORT tracking", tracks:"Track output",
    document:"Document image", ocr:"Image processing / OCR", fields:"Extracted fields", entry:"Web entry",
    dataset:"Fabric images", training:"Faster R-CNN training", inference:"Image inference", evaluation:"Validation & review", notFound:"This portfolio page could not be found.", homeAction:"Back to home",
    backTop:"Back to top", viDegree:"Degree classification: Good",
    skipToContent:"Skip to content", brandHome:"Minh Phat — home", toggleNavigation:"Toggle navigation", mainNavigation:"Main navigation", language:"Language",
    projectWord:"PROJECT", projectIndex:"INDEX", brandName:"TRẦN VIẾT MINH PHÁT", brandDescriptor:"PERSONAL PORTFOLIO", categoryBackend:"PYTHON BACKEND · ERP / WMS", categoryAi:"COMPUTER VISION · OCR", categoryPlanned:"PROPOSED COMPUTER VISION",
    projectAiNav:"Computer Vision · OCR", projectBackendNav:"Python · ERP / WMS",
    aboutWho:"WHO I AM", aboutJourney:"02 / MY JOURNEY", aboutMindset:"03 / PROFESSIONAL MINDSET", aboutBring:"04 / WHAT I BRING", aboutDirection:"05 / CAREER DIRECTION",
    areaMechatronics:"MECHATRONICS", areaIndustrialData:"INDUSTRIAL DATA", areaWmsFems:"WMS & FEMS", areaPython:"PYTHON", areaVision:"COMPUTER VISION & OCR",
    jobKind:"EMPLOYMENT", haloviKind:"5-month contract", researchLabel:"RESEARCH", notFoundLabel:"404 / NOT FOUND", notFoundTitle:"Oops.",
    pageRenderError:"PAGE RENDER ERROR", reloadPage:"Reload page", backHome:"Back to home",
    footerStack:"PYTHON APPLICATIONS · ERP / WMS", githubLabel:"GITHUB"
  },
  vi: {
    home:"Trang chủ", projects:"Dự án", all:"Tất cả dự án", ai:"AI", backend:"Backend", experience:"Kinh nghiệm", about:"Về tôi", contact:"Liên hệ",
    projectsPageIntro:"Các dự án và hệ thống tôi đã thực hiện. Mỗi trang chi tiết đi sâu hơn vào bài toán và cách tôi triển khai.",
    experiencePageIntro:"Những công việc, dự án và môi trường kỹ thuật đã góp phần hình thành kinh nghiệm của tôi.",
    skillsPageIntro:"Các công nghệ tôi sử dụng và những dạng bài toán tôi muốn tiếp tục phát triển.",
    educationPageIntro:"Nền tảng đào tạo kỹ thuật, hoạt động nghiên cứu và các dấu mốc học thuật.",
    aboutPageIntro:"Tôi bắt đầu từ ngành Cơ điện tử và tìm thấy hướng đi của mình trong phát triển phần mềm phục vụ vận hành.",
    contactPageIntro:"Trao đổi về cơ hội IT Staff, ERP Support, phát triển Python và ứng dụng nghiệp vụ.",
    homeFocusKicker:"ĐIỀU TÔI QUAN TÂM",
    homeFocusTitle:"Phần mềm nên giúp công việc rõ ràng và dễ làm hơn.",
    homeFocusText:"Tôi thích tìm hiểu cách một công việc đang diễn ra trước khi viết code. Đó là lúc cần lắng nghe người trực tiếp sử dụng hệ thống, theo dõi dữ liệu qua từng bước và xây dựng chức năng giúp quy trình dễ quản lý hơn.",
    eyebrow:"IT STAFF / ERP SUPPORT · QUẢNG NGÃI", regionLabel:"QUẢNG NGÃI, VIỆT NAM",
    headlineA:"Xin chào, tôi là Phát.", headlineB:"Tôi làm phần mềm từ quy trình thực tế.",
    heroRole:"Python · WMS / FEMS · Ứng dụng nghiệp vụ",
    intro:"Tôi có 1 năm 10 tháng tham gia phát triển WMS và FEMS tại Sumida. Tôi làm việc với người dùng kho, chuyển các bước vận hành thành logic ứng dụng, phát triển và kiểm thử chức năng, đồng thời xử lý lỗi phát sinh. Trước đó, tôi thực hiện các dự án Computer Vision, OCR và dữ liệu công nghiệp. Hiện tại, tôi tập trung vào Python và ứng dụng nghiệp vụ.",
    explore:"Xem các dự án của tôi", getInTouch:"Liên hệ",
    personalNoteLabel:"ĐÔI NÉT VỀ TÔI", personalNoteTitle:"Nền tảng kỹ thuật, tư duy phát triển phần mềm.",
    personalNoteText:"Tôi tốt nghiệp Công nghệ Kỹ thuật Cơ điện tử. Quá trình làm việc với thiết bị, dữ liệu và hệ thống kho đã đưa tôi đến gần hơn với phần mềm phục vụ công việc hằng ngày.",
    personalFact1Label:"HỌC VẤN", personalFact1Title:"Công nghệ Kỹ thuật Cơ điện tử", personalFact1Meta:"ĐH Sư phạm Kỹ thuật – ĐH Đà Nẵng · Xếp loại Khá",
    personalFact2Label:"CÁCH TÔI LÀM VIỆC", personalFact2Title:"Hiểu · xây dựng · kiểm thử", personalFact2Meta:"Bắt đầu từ người dùng, quy trình và kết quả cần đạt",
    personalFact3Label:"DỰ ÁN ĐANG XÂY DỰNG", personalFact3Title:"RackFlow — Mini ERP / WMS", personalFact3Meta:"Ứng dụng quản lý quy trình kho",
    experienceStripLabel:"KINH NGHIỆM CỦA TÔI", experienceStripIntro:"Một vài môi trường làm việc và dự án đã tạo nên hành trình của tôi.",
    sumidaPeriod:"02/2025 – 11/2026", sumidaStripText:"WMS & FEMS · Phát triển phần mềm",
    haloviPeriod:"11/2023 – 03/2024", haloviStripText:"Computer Vision Engineer · Hợp đồng 5 tháng",
    freelancePeriod:"09/2022 – 12/2024", freelanceStripText:"Các dự án Computer Vision và OCR",
    homeWorkKicker:"DỰ ÁN TIÊU BIỂU", homeWorkTitle:"Một vài sản phẩm tôi đã xây dựng.",
    homeWorkIntro:"Từ ứng dụng kho đến nhận diện hình ảnh và tự động hóa nhập liệu, các dự án dưới đây cho thấy những bài toán tôi đã trực tiếp làm việc.",
    homeWorkMore:"Xem tất cả dự án",
    personalAboutLink:"Tìm hiểu về tôi", personalExperienceLink:"Kinh nghiệm", personalSkillsLink:"Kỹ năng",
    footer:"Cảm ơn bạn đã ghé thăm. Rất vui được kết nối và trao đổi.",
    selected:"DỰ ÁN TIÊU BIỂU", featuredTitle:"Những dự án bắt đầu từ bài toán thực tế.",
    featuredIntro:"Mời bạn xem các sản phẩm, cách tôi triển khai và trạng thái hiện tại của từng dự án.",
    seeCase:"Xem dự án", viewAll:"Xem tất cả dự án", inProgress:"Đang phát triển", past:"Đã hoàn thành", prototype:"Nguyên mẫu nghiên cứu", planned:"Dự kiến",
    domains:"LĨNH VỰC TÔI LÀM VIỆC", domainsTitle:"Ứng dụng nghiệp vụ, cùng nền tảng AI ứng dụng.",
    domainsIntro:"Python và hệ thống nghiệp vụ là hướng đi chính. Computer Vision và OCR là những trải nghiệm đã đưa tôi đến với con đường này.",
    backendDesc:"Ứng dụng Python, quy tắc nghiệp vụ, dữ liệu và quy trình kho. RackFlow kết hợp các nội dung này trong một dự án ERP/WMS cá nhân.",
    aiDesc:"Computer Vision theo dõi giao nhận, OCR hỗ trợ nhập liệu tài liệu và thử nghiệm phát hiện lỗi vải bằng Faster R-CNN.",
    experienceTitle:"Công việc và dự án tôi đã đi qua.",
    experienceIntro:"Những vai trò và dự án đã giúp tôi trưởng thành hơn trong công việc kỹ thuật.",
    employment:"CÔNG VIỆC & HỢP ĐỒNG", earlier:"DỰ ÁN TỰ DO & KINH NGHIỆM TRƯỚC ĐÓ",
    skills:"KỸ NĂNG", skillsTitle:"Công nghệ tôi sử dụng để biến yêu cầu thành phần mềm hoạt động.",
    skillsIntro:"Kết hợp giữa phát triển phần mềm, quy trình nghiệp vụ và nền tảng kỹ thuật ứng dụng.",
    core:"PHÁT TRIỂN PHẦN MỀM", data:"DỮ LIỆU & QUY TRÌNH NGHIỆP VỤ", supporting:"KỸ THUẬT ỨNG DỤNG",
    education:"HỌC VẤN", educationTitle:"Nơi hành trình kỹ thuật của tôi bắt đầu.",
    contactTitle:"Cùng trao đổi về phần mềm và công việc mà nó hỗ trợ.",
    contactText:"Tôi quan tâm đến các vị trí IT Staff / ERP Support, phát triển Python và ứng dụng nghiệp vụ cho môi trường sản xuất, kho vận và vận hành.",
    email:"Email", linkedin:"LinkedIn", github:"GitHub cá nhân",
    problem:"Bài toán", role:"Phần việc của tôi", approach:"Cách triển khai", scope:"Chức năng chính",
    evidence:"Trạng thái dự án", next:"Hướng phát triển tiếp theo", technologies:"CÔNG NGHỆ SỬ DỤNG", videoShowcaseLabel:"VIDEO MINH HỌA · YOUTUBE", videoShowcaseTitle:"Trình diễn mô hình", videoPlaceholderTitle:"Vị trí video YouTube", videoPlaceholderText:"Đã chừa khung video tỷ lệ 16:9. Thêm URL YouTube vào trường youtubeUrl trong mục dự án Fabric để hiển thị video.", videoFrameTitle:"Video trình diễn mô hình phát hiện lỗi vải", back:"Quay lại danh mục dự án",
    noOt:"",
    sumidaRole:"Trưởng nhóm kỹ thuật phát triển phần mềm",
    sumidaWms:"WMS: làm rõ yêu cầu với người dùng kho, phân tích quy trình, triển khai logic ứng dụng, kiểm thử chức năng, sửa lỗi và hỗ trợ chạy thử.",
    sumidaFems:"FEMS: tham gia phát triển chức năng xử lý dữ liệu, bảng điều khiển giám sát điện năng và tính toán chi phí điện.",
    haloviRole:"Kỹ sư thị giác máy tính",
    haloviText:"Làm việc với vai trò Computer Vision Engineer trong hợp đồng 5 tháng, tham gia phát triển các thành phần thị giác máy tính.",
    freelanceText:"Thực hiện hai dự án phần mềm chính: theo dõi giao nhận tại siêu thị qua video và tự động hóa nhập liệu bằng OCR cho Cảng Đà Nẵng.",
    uniRole:"Kỹ sư nghiên cứu",
    uniText:"Phát triển trang web giáo dục, thiết kế và lắp ráp hệ thống robot STEAM, tham gia hoạt động học tập theo dự án.",
    premoRole:"Thực tập sinh kỹ thuật Kaizen",
    premoText:"Sử dụng Python để thu thập dữ liệu hiệu suất từ cảm biến công nghiệp qua Modbus RTU, đồng thời tham gia phân tích quy trình lắp ráp.",
    freelanceType:"Dự án phần mềm độc lập", research:"Nghiên cứu & giáo dục", internship:"Thực tập kỹ thuật",
    degree:"Kỹ sư Công nghệ Kỹ thuật Cơ điện tử",
    publication:"Đồng tác giả bài báo “Building An IoT-Based Waste Management System for Hazardous Waste,” REC-ECIT 2023, trang 193–198.",
    award:"Giải Khuyến khích Giải thưởng Khoa học và Công nghệ sinh viên tại các cơ sở giáo dục đại học (2023); Giải Nhì Cuộc thi Nghiên cứu khoa học sinh viên TP. Đà Nẵng (2022).",
    rackSummary:"Dự án ERP/WMS cá nhân tập trung vào nhập kho, tra cứu tồn, giữ hàng và lưu lại lịch sử hoạt động kho.",
    cvSummary:"Ứng dụng Computer Vision phát hiện và theo dõi hoạt động giao nhận từ video tại siêu thị.",
    ocrSummary:"Quy trình xử lý tài liệu: trích xuất thông tin từ sổ đăng kiểm và nhập dữ liệu lên website Cảng Đà Nẵng.",
    fabricSummary:"Dự án phát hiện lỗi vải sử dụng Faster R-CNN và MobileNetV3-FPN, đi kèm các lần đánh giá validation có thể lặp lại và giao diện suy luận ảnh.",
    rackProblem:"Bộ phận kho cần thông tin tồn kho đáng tin cậy và lịch sử rõ ràng cho từng thao tác. RackFlow đưa các bước nghiệp vụ chính vào cùng một ứng dụng.",
    rackRole:"Tôi tự thiết kế và phát triển RackFlow như một dự án ERP/WMS cá nhân, từ mô hình dữ liệu, quy tắc nghiệp vụ đến các luồng thao tác trên giao diện.",
    rackScope:"Nhập kho, tra cứu tồn, tra cứu đơn hàng, giữ tồn và lịch sử sự kiện để theo dõi thay đổi. Luồng xuất kho đang được phát triển.",
    rackApproach:"Xây dựng bằng Python, FastAPI, Flask, SQLAlchemy và PostgreSQL. Ứng dụng mô hình hóa luân chuyển tồn kho và trạng thái nghiệp vụ thành các quy tắc xử lý rõ ràng.",
    rackEvidence:"Đã có các chức năng nhập kho, tra cứu tồn, tra cứu đơn hàng, giữ tồn và lịch sử sự kiện. Luồng xuất kho thủ công và luồng có Gemini hỗ trợ đang được phát triển.",
    rackNext:"Hoàn thiện luồng xuất kho, sau đó bổ sung cơ chế Gemini hỗ trợ với bước kiểm tra tồn, xác nhận của người dùng và lịch sử thao tác.",
    cvProblem:"Giúp việc theo dõi giao nhận tại siêu thị thuận tiện hơn thông qua phát hiện và theo dõi đối tượng trong video.",
    cvRole:"Xây dựng quy trình xử lý video: YOLOv5 phát hiện đối tượng và DeepSORT theo dõi đối tượng qua các khung hình.",
    cvEvidence:"Dự án kết hợp phát hiện và theo dõi đối tượng trong một quy trình giám sát giao nhận tại siêu thị.",
    cvNext:"Mở rộng đánh giá với các đoạn video đại diện, độ ổn định theo dõi và những tình huống hình ảnh phức tạp.",
    ocrProblem:"Giảm thao tác nhập liệu lặp lại từ sổ đăng kiểm phương tiện lên website Cảng Đà Nẵng.",
    ocrRole:"Kết hợp tiền xử lý ảnh và OCR để trích xuất các trường dữ liệu, sau đó dùng Selenium nhập thông tin lên website.",
    ocrEvidence:"Quy trình kết nối xử lý ảnh tài liệu, trích xuất văn bản, tách trường dữ liệu và tự động nhập liệu qua trình duyệt.",
    ocrNext:"Bổ sung bước rà soát các trường dữ liệu chưa rõ ràng và đánh giá độ chính xác trích xuất trên tập tài liệu đã gán nhãn.",
    fabricProblem:"Định vị các lỗi nhìn thấy trên bề mặt vải và xác định nhóm lỗi tương ứng từ ảnh đầu vào.",
    fabricRole:"Tôi phát triển thử nghiệm từ lựa chọn mô hình, chuẩn bị dữ liệu, huấn luyện, validation đến giao diện suy luận ảnh.",
    fabricScope:"Tải ảnh vải lên và nhận về bounding box dự đoán, một trong chín nhãn lỗi tiếng Việt, model score (0–1) và dữ liệu JSON.",
    fabricApproach:"Sử dụng Faster R-CNN với backbone MobileNetV3-FPN, huấn luyện trên Google Colab với GPU T4. Thử nghiệm E1 được đánh giá qua nhiều random seed để so sánh kết quả.",
    fabricEvidence:"mAP50–95 trên tập validation E1 qua ba seed: 0.412, 0.412 và 0.426. Giao diện trả về raw model score; các bước tiếp theo là hiệu chuẩn score và đánh giá trên nguồn ảnh vải độc lập.",
    fabricNext:"Đánh giá mô hình trên ảnh vải độc lập, xem xét precision/recall theo từng lớp lỗi và kiểm tra hiệu chuẩn score.",
    fabricBlogKicker:"GHI CHÚ KỸ THUẬT · COMPUTER VISION",
    fabricBlogLead:"Cách tôi tiếp cận bài toán phát hiện lỗi vải bằng Faster R-CNN, kiểm tra mô hình qua các lần validation có thể lặp lại và xây dựng giao diện quan sát dự đoán trên ảnh.",
    fabricImageAlt:"Hình minh họa các bề mặt vải với kết cấu dệt khác nhau và một số dạng bất thường trên sợi vải.",
    fabricImageCaption:"Hình ảnh giới thiệu bối cảnh của bài toán kiểm tra bề mặt vải.",
    fabricBlogToc:"NỘI DUNG BÀI VIẾT",
    fabricBlogChallengeTitle:"Bắt đầu từ bài toán kiểm tra vải",
    fabricBlogChallengeP1:"Lỗi trên bề mặt vải có thể ảnh hưởng đến ngoại quan và chất lượng vật liệu dùng trong sản xuất sofa. Với dự án này, tôi muốn mô hình không chỉ phân loại ảnh mà còn xác định vị trí lỗi và gán đúng nhóm lỗi tương ứng.",
    fabricBlogChallengeP2:"Vì vậy, object detection là lựa chọn phù hợp. Giao diện trình bày kết quả dự đoán để người xem có thể quan sát vị trí và nhãn lỗi trên ảnh.",
    fabricBlogModelTitle:"Chọn mô hình theo các ràng buộc kỹ thuật",
    fabricBlogModelP1:"Tôi chọn Faster R-CNN với backbone MobileNetV3-FPN. Các ràng buộc của dự án đưa tôi đến một hướng detection khác với Ultralytics/YOLO11n, phù hợp để huấn luyện và đánh giá trong môi trường hiện có.",
    fabricBlogModelP2:"Quy trình triển khai gồm chuẩn bị ảnh đã gán nhãn, huấn luyện detector, xem xét kết quả validation và đưa dự đoán ra giao diện suy luận ảnh.",
    fabricBlogSetupTitle:"Thiết lập thực nghiệm có thể đối chiếu",
    fabricBlogSetupP1:"Tôi huấn luyện và đánh giá mô hình trên Google Colab với GPU T4. Trong thử nghiệm E1, tôi chạy validation với ba random seed để so sánh độ ổn định giữa các lần chạy.",
    fabricBlogSetupP2:"Ba kết quả mAP50–95 trên tập validation lần lượt là 0.412, 0.412 và 0.426. Các giá trị khá gần nhau, cung cấp một góc nhìn về tính lặp lại trong thử nghiệm này.",
    fabricBlogInterfaceTitle:"Đưa kết quả dự đoán thành giao diện có thể kiểm tra",
    fabricBlogInterfaceP1:"Luồng demo được giữ đơn giản: tải ảnh vải lên, chạy suy luận, quan sát bounding box và nhãn lỗi, sau đó truy cập dữ liệu JSON có cấu trúc.",
    fabricBlogInterfaceP2:"Mỗi dự đoán gồm một trong chín nhãn lỗi tiếng Việt và raw model score từ 0 đến 1. Score được hiển thị như đầu ra mô hình, tách biệt với xác suất đã hiệu chuẩn.",
    fabricBlogLimitsTitle:"Đọc kết quả mà không suy diễn quá mức",
    fabricBlogLimitsP1:"Các số liệu E1 đến từ tập validation sử dụng trong quá trình phát triển. Bước đánh giá tiếp theo là thử nghiệm trên nguồn ảnh vải, điều kiện ánh sáng và camera độc lập.",
    fabricBlogLimitsP2:"Việc xem xét precision, recall theo từng lớp, false positive và missed defect sẽ giúp xác định phần dữ liệu và thuật toán cần tiếp tục cải thiện.",
    fabricBlogNextTitle:"Những gì cần kiểm tra tiếp theo",
    fabricBlogNextP1:"Tôi dự định đánh giá detector trên các ảnh vải độc lập và kiểm tra false positive, missed defect tiêu biểu theo từng nhóm lỗi.",
    fabricBlogNextP2:"Tôi cũng sẽ đánh giá score calibration trước khi sử dụng confidence threshold trong quy trình có người kiểm tra.",
    fabricBlogMetricsLabel:"VALIDATION · E1 · BA SEED",
    fabricBlogMetricName:"mAP50–95",
    fabricBlogMetricNote:"Tập validation E1 · ba random seed",
    fabricBlogTechTitle:"Cấu hình thực nghiệm",
    fabricBlogTechModel:"Mô hình phát hiện",
    fabricBlogTechBackbone:"Backbone",
    fabricBlogTechRuntime:"Môi trường huấn luyện",
    fabricBlogTechTask:"Bài toán",
    fabricBlogTaskValue:"Phát hiện đối tượng · bounding box",
    fabricBlogClosing:"Dự án kết hợp phát triển mô hình, đánh giá có thể lặp lại và giao diện suy luận ảnh. Giai đoạn tiếp theo là mở rộng kiểm thử trên dữ liệu vải độc lập.",
    flow:"MÔ HÌNH QUY TRÌNH · MINH HỌA", receive:"Nhập kho", inventory:"Kiểm tra tồn", reserve:"Giữ tồn", trace:"Truy vết",
    video:"Khung hình video", detection:"YOLOv5 phát hiện", tracking:"Theo dõi đối tượng bằng DeepSORT", tracks:"Kết quả theo dõi",
    document:"Ảnh tài liệu", ocr:"Xử lý ảnh / OCR", fields:"Trường thông tin", entry:"Nhập dữ liệu lên trang web",
    dataset:"Ảnh vải", training:"Huấn luyện Faster R-CNN", inference:"Suy luận ảnh", evaluation:"Validation & rà soát", notFound:"Không tìm thấy trang này.", homeAction:"Về trang chủ",
    backTop:"Lên đầu trang", viDegree:"Xếp loại Khá",
    skipToContent:"Chuyển đến nội dung chính", brandHome:"Minh Phát — trang chủ", toggleNavigation:"Mở hoặc đóng điều hướng", mainNavigation:"Điều hướng chính", language:"Ngôn ngữ",
    projectWord:"DỰ ÁN", projectIndex:"DANH MỤC", brandName:"TRẦN VIẾT MINH PHÁT", brandDescriptor:"HỒ SƠ CÁ NHÂN", categoryBackend:"PYTHON BACKEND · ERP / WMS", categoryAi:"THỊ GIÁC MÁY TÍNH · OCR", categoryPlanned:"ĐỀ XUẤT THỬ NGHIỆM THỊ GIÁC MÁY TÍNH",
    projectAiNav:"Thị giác máy tính · OCR", projectBackendNav:"Python · ERP / WMS",
    aboutWho:"GIỚI THIỆU BẢN THÂN", aboutJourney:"02 / HÀNH TRÌNH CHUYÊN MÔN", aboutMindset:"03 / TƯ DUY NGHỀ NGHIỆP", aboutBring:"04 / GIÁ TRỊ TÔI MANG LẠI", aboutDirection:"05 / ĐỊNH HƯỚNG NGHỀ NGHIỆP",
    areaMechatronics:"CƠ ĐIỆN TỬ", areaIndustrialData:"DỮ LIỆU THIẾT BỊ", areaWmsFems:"WMS & FEMS", areaPython:"PYTHON", areaVision:"THỊ GIÁC MÁY TÍNH & OCR",
    jobKind:"CÔNG VIỆC CHÍNH THỨC", haloviKind:"Hợp đồng 5 tháng", researchLabel:"NGHIÊN CỨU", notFoundLabel:"404 / KHÔNG TÌM THẤY", notFoundTitle:"Rất tiếc.",
    pageRenderError:"LỖI HIỂN THỊ TRANG", reloadPage:"Tải lại trang", backHome:"Về trang chủ",
    footerStack:"ỨNG DỤNG PYTHON · ERP / WMS", githubLabel:"GITHUB"
  }
};

const projects = [
  { slug:"rackflow", category:"backend", number:"01", title:"RackFlow — Mini ERP / WMS", status:"progress", tags:["Python","FastAPI","Flask","SQLAlchemy","PostgreSQL"], summaryKey:"rackSummary", fields:[["problem","rackProblem"],["role","rackRole"],["scope","rackScope"],["approach","rackApproach"],["evidence","rackEvidence"],["next","rackNext"]], flow:["receive","inventory","reserve","trace"] },
  { slug:"supermarket", category:"ai", number:"02", title:"Supermarket Delivery Monitoring", status:"past", tags:["Python","YOLOv5","DeepSORT","Video tracking"], summaryKey:"cvSummary", fields:[["problem","cvProblem"],["role","cvRole"],["evidence","cvEvidence"],["next","cvNext"]], flow:["video","detection","tracking","tracks"] },
  { slug:"ocr", category:"ai", number:"03", title:"OCR-assisted Data Entry", status:"past", tags:["Python","OCR","Image processing","Automation"], summaryKey:"ocrSummary", fields:[["problem","ocrProblem"],["role","ocrRole"],["evidence","ocrEvidence"],["next","ocrNext"]], flow:["document","ocr","fields","entry"] },
  { slug:"fabric", category:"ai", number:"04", title:"Fabric Defect Inspection", status:"prototype", tags:["PyTorch","Faster R-CNN","MobileNetV3-FPN","Object Detection","Google Colab"], summaryKey:"fabricSummary", youtubeUrl:"", fields:[["problem","fabricProblem"],["role","fabricRole"],["scope","fabricScope"],["approach","fabricApproach"],["evidence","fabricEvidence"],["next","fabricNext"]], flow:["dataset","training","inference","evaluation"] }
];

function Icon({ name, size=18 }) {
  const props={width:size,height:size,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:1.7,strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":true};
  const shapes={
    arrow:<><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></>,
    up:<><path d="M7 17 17 7"/><path d="M7 7h10v10"/></>,
    down:<path d="m6 9 6 6 6-6"/>,
    mail:<><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></>,
    github:<><path d="M9 19c-4 1-4-2-6-2m12 4v-3.2c0-1 .1-1.4-.5-2 3.2-.4 6.5-1.6 6.5-7A5.4 5.4 0 0 0 19.5 5 5 5 0 0 0 19.4 1S18.2.6 15 2.7a13.5 13.5 0 0 0-7 0C4.8.6 3.6 1 3.6 1A5 5 0 0 0 3.5 5 5.4 5.4 0 0 0 2 8.8c0 5.4 3.3 6.6 6.5 7-.6.6-.6 1.2-.5 2V21"/></>,
    linkedin:<><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6Z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></>,
    code:<><path d="m8 8-4 4 4 4M16 8l4 4-4 4M14 4l-4 16"/></>,
    grid:<><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
    check:<path d="m5 12 4 4L19 6"/>
  };
  return <svg {...props}>{shapes[name] || shapes.arrow}</svg>;
}

function Brand({ lang }) {
  const t=text[lang];
  return <a className="brand" href="#home" aria-label={t.brandHome}><span className="brand-name">{t.brandName}<small>{t.brandDescriptor}</small></span></a>;
}

function Header({ lang, setLang, route }) {
  const t=text[lang];
  const [mobile,setMobile]=useState(false);
  const [projectsOpen,setProjectsOpen]=useState(false);
  const close=()=>{setMobile(false);setProjectsOpen(false);};
  return <header className="site-header"><div className="nav-wrap">
    <Brand lang={lang}/>
    <button className="mobile-toggle" type="button" aria-label={t.toggleNavigation} aria-expanded={mobile} onClick={()=>setMobile(!mobile)}><span/><span/><span/></button>
    <nav className={"main-nav"+(mobile?" is-open":"")} aria-label={t.mainNavigation}>
      <a className={route==="home"?"nav-active":""} aria-current={route==="home"?"page":undefined} href="#home" onClick={close}>{t.home}</a>
      <div className="nav-project">
        <button type="button" className={"nav-project-trigger"+(route.startsWith("projects")||route.startsWith("project/")?" nav-active":"")} aria-expanded={projectsOpen} onClick={()=>setProjectsOpen(!projectsOpen)}>{t.projects}<Icon name="down" size={14}/></button>
        <div className={"project-dropdown"+(projectsOpen?" is-open":"")}>
          <a className={route==="projects"?"nav-active":""} aria-current={route==="projects"?"page":undefined} href="#projects" onClick={close}><span>{t.all}</span><Icon name="arrow" size={15}/></a>
          <a className={route==="projects/ai"?"nav-active":""} aria-current={route==="projects/ai"?"page":undefined} href="#projects/ai" onClick={close}><span>{t.ai}</span><small>{t.projectAiNav}</small></a>
          <a className={route==="projects/backend"?"nav-active":""} aria-current={route==="projects/backend"?"page":undefined} href="#projects/backend" onClick={close}><span>{t.backend}</span><small>{t.projectBackendNav}</small></a>
        </div>
      </div>
      <a className={route==="experience"?"nav-active":""} aria-current={route==="experience"?"page":undefined} href="#experience" onClick={close}>{t.experience}</a>
      <a className={route==="skills"?"nav-active":""} aria-current={route==="skills"?"page":undefined} href="#skills" onClick={close}>{t.skills}</a>
      <a className={route==="education"?"nav-active":""} aria-current={route==="education"?"page":undefined} href="#education" onClick={close}>{t.education}</a>
      <a className={route==="about"?"nav-active":""} aria-current={route==="about"?"page":undefined} href="#about" onClick={close}>{t.about}</a>
      <a className={"nav-contact"+(route==="contact"?" nav-active":"")} aria-current={route==="contact"?"page":undefined} href="#contact" onClick={close}>{t.contact}<Icon name="up" size={14}/></a>
      <div className="language-switch" role="group" aria-label={t.language}>
        <button type="button" className={lang==="en"?"active":""} aria-pressed={lang==="en"} onClick={()=>setLang("en")}>EN</button>
        <button type="button" className={lang==="vi"?"active":""} aria-pressed={lang==="vi"} onClick={()=>setLang("vi")}>VI</button>
      </div>
    </nav>
  </div></header>;
}

function PageHeading({ index="01",kicker,title,intro }) {
  return <div className="page-hero">
    <div className="section-kicker"><span>{index}</span>{kicker}</div>
    <h1>{title}</h1>
    {intro&&<p>{intro}</p>}
  </div>;
}

function SectionHeading({ index,kicker,title,intro }) {
  return <div className="section-heading"><div><div className="section-kicker"><span>{index}</span>{kicker}</div><h2>{title}</h2></div>{intro&&<p>{intro}</p>}</div>;
}

function Status({ status,lang }) {
  const t=text[lang];
  const label=status==="progress"?t.inProgress:status==="prototype"?t.prototype:status==="planned"?t.planned:t.past;
  return <span className={"status status-"+status}><i/>{label}</span>;
}

function Flow({ project,lang }) {
  const t=text[lang];
  return <div className="flow-wrap"><div className="flow-label">{t.flow}<span>↗</span></div><div className="flow-line">
    {project.flow.map((key,index)=><React.Fragment key={key}><div className="flow-step"><span>0{index+1}</span><strong>{t[key]}</strong></div>{index<project.flow.length-1&&<span className="flow-arrow">→</span>}</React.Fragment>)}
  </div></div>;
}

function displayProjectTitle(project,lang) {
  if(lang!=="vi") return project.title;
  const titles={
    supermarket:"Giám sát giao nhận tại siêu thị",
    ocr:"Nhập liệu tài liệu bằng OCR",
    fabric:"Kiểm tra lỗi bề mặt vải"
  };
  return titles[project.slug]||project.title;
}

function displayTag(tag,lang) {
  if(lang!=="vi") return tag;
  const labels={"Video tracking":"Theo dõi video","Image processing":"Xử lý ảnh","Automation":"Tự động hóa","REST APIs":"API dịch vụ","Dataset design":"Thiết kế tập dữ liệu","Model evaluation":"Đánh giá mô hình","Computer Vision":"Thị giác máy tính","Workflow analysis":"Phân tích quy trình","Business logic":"Logic nghiệp vụ","Data validation":"Kiểm tra dữ liệu","Mechatronics":"Cơ điện tử","STEAM robotics":"Robot STEAM","Slave ID discovery":"Dò địa chỉ Slave","Register mapping":"Xác định thanh ghi"};
  return labels[tag]||tag;
}

function ProjectCard({ project,lang,featured=false }) {
  const t=text[lang];
  const category=project.category==="backend"?t.categoryBackend:project.status==="planned"?t.categoryPlanned:t.categoryAi;
  return <article className={"project-card"+(featured?" project-card-featured":"")}>
    <div className="project-card-top"><span className="project-number">{t.projectWord} / {project.number}</span><Status status={project.status} lang={lang}/></div>
    <div className="project-card-main"><div className="project-card-text">
      <span className="project-category">{category}</span><h3>{displayProjectTitle(project,lang)}</h3><p>{t[project.summaryKey]}</p>
      <div className="tag-list">{project.tags.map(tag=><span key={tag}>{displayTag(tag,lang)}</span>)}</div>
      <a className="text-link" href={"#project/"+project.slug}>{t.seeCase}<Icon name="arrow" size={16}/></a>
    </div>{featured&&<Flow project={project} lang={lang}/>}</div>
  </article>;
}

function Hero({ lang }) {
  const t=text[lang];
  const facts=[
    [t.personalFact1Label,t.personalFact1Title,t.personalFact1Meta],
    [t.personalFact2Label,t.personalFact2Title,t.personalFact2Meta],
    [t.personalFact3Label,t.personalFact3Title,t.personalFact3Meta]
  ];
  return <section className="hero-section" id="top">
    <div className="container hero-container">
      <div className="hero-copy">
        <div className="hero-kicker">{t.eyebrow}<span>—</span>{t.regionLabel}</div>
        <h1>{t.headlineA}<br/><em>{t.headlineB}</em></h1>
        <p className="hero-role">{t.heroRole}</p>
        <p className="hero-intro">{t.intro}</p>
        <div className="hero-actions">
          <a className="button button-primary" href="#projects">{t.explore}<Icon name="arrow" size={17}/></a>
          <a className="button button-quiet" href="mailto:tranvietminhphat@gmail.com">{t.getInTouch}<Icon name="up" size={15}/></a>
        </div>
        <div className="hero-socials">
          <a href="https://github.com/2000minhphat1999" target="_blank" rel="noopener noreferrer"><Icon name="github" size={16}/>GitHub</a>
          <a href="https://www.linkedin.com/in/minhphat-ai/" target="_blank" rel="noopener noreferrer"><Icon name="linkedin" size={16}/>LinkedIn</a>
          <span>{t.regionLabel}</span>
        </div>
      </div>
      <aside className="personal-note" aria-label={t.personalNoteLabel}>
        <div className="personal-note-top"><span>{t.personalNoteLabel}</span><span>01 / 03</span></div>
        <h2>{t.personalNoteTitle}</h2>
        <p className="personal-note-intro">{t.personalNoteText}</p>
        <div className="personal-facts">
          {facts.map(([label,title,detail],index)=><div className="personal-fact" key={label}>
            <span className="personal-fact-index">0{index+1}</span>
            <div><small>{label}</small><strong>{title}</strong><span>{detail}</span></div>
          </div>)}
        </div>
      </aside>
    </div>
  </section>;
}

function HomeExperienceStrip({ lang }) {
  const t=text[lang];
  const items=[
    {period:t.sumidaPeriod,company:"Sumida",detail:t.sumidaStripText},
    {period:t.haloviPeriod,company:"Halovi",detail:t.haloviStripText},
    {period:t.freelancePeriod,company:lang==="vi"?"Độc lập / Freelance":"Independent",detail:t.freelanceStripText}
  ];
  return <section className="personal-experience-strip">
    <div className="container">
      <div className="personal-experience-heading">
        <span>{t.experienceStripLabel}</span>
        <p>{t.experienceStripIntro}</p>
      </div>
      <div className="personal-experience-list">
        {items.map((item,index)=><article className="personal-experience-item" key={item.company}>
          <span className="personal-experience-period">{item.period}</span>
          <strong>{item.company}</strong>
          <p>{item.detail}</p>
        </article>)}
      </div>
    </div>
  </section>;
}

function HomeWorkPreview({ lang }) {
  const t=text[lang];
  return <section className="home-work-section">
    <div className="container">
      <div className="home-work-heading">
        <div><div className="section-kicker">{t.homeWorkKicker}</div><h2>{t.homeWorkTitle}</h2></div>
        <p>{t.homeWorkIntro}</p>
      </div>
      <div className="home-work-grid">
        {projects.map(project=><ProjectCard key={project.slug} project={project} lang={lang}/>)}
      </div>
      <div className="home-work-footer"><a className="text-link" href="#projects">{t.homeWorkMore}<Icon name="arrow" size={16}/></a></div>
    </div>
  </section>;
}

function HomePage({ lang }) {
  const t=text[lang];
  return <main id="main-content" className="home-page">
    <Hero lang={lang}/>
    <HomeExperienceStrip lang={lang}/>
    <HomeWorkPreview lang={lang}/>
    <section className="home-focus">
      <div className="container home-focus-inner">
        <div><div className="section-kicker">{t.homeFocusKicker}</div><h2>{t.homeFocusTitle}</h2><p>{t.homeFocusText}</p></div>
        <div className="home-focus-links">
          <a href="#about">{t.personalAboutLink}<Icon name="arrow" size={16}/></a>
          <a href="#experience">{t.personalExperienceLink}<Icon name="arrow" size={16}/></a>
          <a href="#skills">{t.personalSkillsLink}<Icon name="arrow" size={16}/></a>
        </div>
      </div>
    </section>
  </main>;
}

function ExperiencePreview({ lang }) {
  const t=text[lang];
  const entries=[
    {date:"02/2025 – 11/2026",kind:t.jobKind,role:t.sumidaRole,company:"Sumida",bullets:[t.sumidaWms,t.sumidaFems]},
    {date:"11/2023 – 03/2024",kind:t.haloviKind,role:t.haloviRole,company:"Halovi",bullets:[t.haloviText]}
  ];
  return <main id="main-content" className="inner-page page-section-page experience-page"><div className="container">
    <PageHeading index="01" kicker={t.experience} title={t.experienceTitle} intro={t.experiencePageIntro}/>
    <div className="experience-block-label">{t.employment}</div>
    <div className="timeline">
      {entries.map(entry=><article className="timeline-entry" key={entry.company}>
        <div className="timeline-date"><time>{entry.date}</time><span>{entry.kind}</span></div>
        <div className="timeline-body"><h3>{entry.role}</h3><div className="timeline-company">{entry.company}</div><ul>{entry.bullets.map((line,i)=><li key={i}>{line}</li>)}</ul></div>
      </article>)}
    </div>
    <div className="experience-block-label earlier-label">{t.earlier}</div>
    <div className="history-grid">
      <article className="history-card"><span className="history-date">09/2022 – 12/2024</span><span className="history-type">{t.freelanceType}</span><h3>{lang==="vi"?"Các dự án phần mềm theo từng hợp đồng":"Freelance Software Projects"}</h3><p>{t.freelanceText}</p><ul><li>{lang==="vi"?"Giám sát giao nhận tại siêu thị":"Supermarket Delivery Monitoring"} — YOLOv5 và DeepSORT.</li><li>{lang==="vi"?"Trích xuất dữ liệu hồ sơ kiểm định bằng OCR":"OCR-assisted data entry"} — hồ sơ kiểm định phương tiện và trang web Cảng Đà Nẵng.</li></ul></article>
      <article className="history-card"><span className="history-date">03/2024 – 08/2024</span><span className="history-type">{t.research}</span><h3>{t.uniRole}</h3><p className="history-company">{lang==="vi"?"Trường Đại học Sư phạm Kỹ thuật – Đại học Đà Nẵng":"The University of Technology and Education — The University of Danang"}</p><p>{t.uniText}</p></article>
      <article className="history-card"><span className="history-date">05/2022 – 07/2022</span><span className="history-type">{t.internship}</span><h3>{t.premoRole}</h3><p className="history-company">Premo Vietnam</p><p>{t.premoText}</p></article>
    </div>
  </div></main>;
}function SkillsSection({ lang }) {
  const t=text[lang], vi=lang==="vi";
  const groups=vi?[
    {n:"01",kind:"PHÁT TRIỂN ỨNG DỤNG",title:"Python và backend",desc:"Python là ngôn ngữ tôi dùng chính. Tôi đã phát triển logic ứng dụng và chức năng nghiệp vụ bằng Flask; trong RackFlow, tôi sử dụng FastAPI và SQLAlchemy để xây dựng các luồng xử lý kho.",proof:"Công việc WMS/FEMS tại Sumida · Dự án RackFlow",tags:["Python","Flask","FastAPI","REST API","SQLAlchemy"]},
    {n:"02",kind:"HỆ THỐNG DOANH NGHIỆP",title:"ERP · WMS · FEMS",desc:"Làm việc với người dùng kho để làm rõ yêu cầu, phân tích luồng nghiệp vụ và chuyển thành logic xử lý. Với FEMS, tôi phát triển chức năng xử lý dữ liệu, dashboard điện năng và tính toán chi phí điện.",proof:"Phát triển phần mềm tại Sumida · 1 năm 10 tháng",tags:["ERP","WMS","FEMS","Workflow analysis","Business logic"]},
    {n:"03",kind:"DỮ LIỆU & LƯU TRỮ",title:"SQL và cơ sở dữ liệu quan hệ",desc:"Sử dụng SQL và PostgreSQL trong ứng dụng nghiệp vụ; tổ chức dữ liệu, tra cứu, kiểm tra và ghi nhận thay đổi. RackFlow sử dụng SQLAlchemy để kết nối logic nghiệp vụ với dữ liệu.",proof:"PostgreSQL trong công việc và dự án · SQLAlchemy trong RackFlow",tags:["SQL","PostgreSQL","SQLAlchemy","Data validation"]},
    {n:"04",kind:"THỊ GIÁC MÁY TÍNH",title:"Computer Vision và theo dõi đối tượng",desc:"Phát triển luồng xử lý video dùng YOLOv5 để phát hiện đối tượng và DeepSORT để theo dõi qua các khung hình. Tôi cũng có 5 tháng làm Computer Vision Engineer tại Halovi.",proof:"Dự án giám sát giao nhận tại siêu thị · Hợp đồng Halovi",tags:["YOLOv5","DeepSORT","Object detection","Video tracking"]},
    {n:"05",kind:"XỬ LÝ TÀI LIỆU",title:"OCR và tự động hóa nhập liệu",desc:"Kết hợp tiền xử lý ảnh và OCR để trích xuất thông tin từ sổ đăng kiểm, tách trường dữ liệu và dùng Selenium nhập thông tin lên website Cảng Đà Nẵng.",proof:"Dự án OCR nhập liệu cho Cảng Đà Nẵng",tags:["OCR","Image processing","Field extraction","Selenium"]},
    {n:"06",kind:"DỮ LIỆU THIẾT BỊ",title:"Cơ điện tử và Modbus RTU",desc:"Nền tảng Cơ điện tử, lập trình C, IoT và robot STEAM. Tại Premo, tôi dùng Python thu thập dữ liệu cảm biến qua Modbus RTU; làm việc với RS-485, Slave ID, địa chỉ thanh ghi và đọc/đối chiếu giá trị.",proof:"Phân tích dữ liệu cảm biến và quy trình lắp ráp tại Premo",tags:["Mechatronics","C","IoT","Modbus RTU","RS-485","Register mapping"]}
  ]:[
    {n:"01",kind:"APPLICATION DEVELOPMENT",title:"Python and backend",desc:"Python is my primary language. I have built application logic and business features with Flask. In RackFlow, I use FastAPI and SQLAlchemy to implement warehouse workflows.",proof:"WMS/FEMS development at Sumida · RackFlow project",tags:["Python","Flask","FastAPI","REST APIs","SQLAlchemy"]},
    {n:"02",kind:"BUSINESS SYSTEMS",title:"ERP · WMS · FEMS",desc:"Worked with warehouse users to clarify requirements, analyse operational flows and turn them into application logic. For FEMS, I developed data-processing features, an electricity dashboard and cost calculations.",proof:"Software development at Sumida · 1 year 10 months",tags:["ERP","WMS","FEMS","Workflow analysis","Business logic"]},
    {n:"03",kind:"DATA & PERSISTENCE",title:"SQL and relational databases",desc:"Used SQL and PostgreSQL in business applications for data organisation, lookups, validation and recorded changes. RackFlow uses SQLAlchemy to connect application logic with its data layer.",proof:"PostgreSQL in work and projects · SQLAlchemy in RackFlow",tags:["SQL","PostgreSQL","SQLAlchemy","Data validation"]},
    {n:"04",kind:"COMPUTER VISION",title:"Object detection and tracking",desc:"Built a video workflow using YOLOv5 for object detection and DeepSORT to track objects across frames. I also worked as a Computer Vision Engineer at Halovi on a five-month contract.",proof:"Supermarket delivery-monitoring project · Halovi contract",tags:["YOLOv5","DeepSORT","Object detection","Video tracking"]},
    {n:"05",kind:"DOCUMENT PROCESSING",title:"OCR and data-entry automation",desc:"Combined image pre-processing and OCR to extract information from vehicle-registration books, split the fields and use Selenium to enter the data into the Da Nang Port website.",proof:"OCR-assisted data-entry project for Da Nang Port",tags:["OCR","Image processing","Field extraction","Selenium"]},
    {n:"06",kind:"INDUSTRIAL DATA",title:"Mechatronics and Modbus RTU",desc:"My background includes Mechatronics, C programming, IoT and STEAM robotics. At Premo, I used Python to collect sensor data over Modbus RTU and worked with RS-485, slave IDs, register addresses and reading/checking values.",proof:"Sensor-data collection and assembly-process analysis at Premo",tags:["Mechatronics","C","IoT","Modbus RTU","RS-485","Register mapping"]}
  ];
  const steps=vi?[
    ["01","Làm rõ yêu cầu","Trao đổi với người sử dụng, hiểu mục tiêu và các bước công việc cần hỗ trợ."],
    ["02","Mô hình hóa dữ liệu và quy trình","Xác định đầu vào, đầu ra, trạng thái nghiệp vụ và các tình huống cần xử lý."],
    ["03","Xây dựng chức năng","Chuyển quy trình thành logic ứng dụng, API và thao tác dữ liệu bằng Python."],
    ["04","Kiểm thử và hoàn thiện","Kiểm tra luồng chính, xử lý lỗi và điều chỉnh theo kết quả chạy thử."]
  ]:[
    ["01","Understand the requirement","Talk with the people using the system and learn what the work needs to achieve."],
    ["02","Model the data and workflow","Define inputs, outputs, business states and the situations the application needs to handle."],
    ["03","Build the feature","Translate the workflow into application logic, APIs and data operations with Python."],
    ["04","Test and refine","Check the main flows, fix issues and improve the feature through trial use."]
  ];
  return <main id="main-content" className="inner-page page-section-page skills-page"><div className="container">
    <PageHeading index="01" kicker={t.skills} title={t.skillsTitle} intro={t.skillsPageIntro}/>
    <section className="skills-profile-strip" aria-label={vi?"Tóm tắt năng lực":"Skills overview"}>
      <div><span>{vi?"TRỌNG TÂM":"MAIN FOCUS"}</span><strong>Python · ERP / WMS</strong></div>
      <div><span>{vi?"ỨNG DỤNG":"APPLIED WORK"}</span><strong>FEMS · Computer Vision · OCR</strong></div>
      <div><span>{vi?"NỀN TẢNG":"FOUNDATION"}</span><strong>{vi?"Cơ điện tử · Dữ liệu thiết bị":"Mechatronics · Industrial data"}</strong></div>
    </section>
    <section className="skills-capabilities" aria-labelledby="skills-capabilities-title">
      <div className="skills-section-heading"><div><span>{vi?"01 / NĂNG LỰC":"01 / CAPABILITIES"}</span><h2 id="skills-capabilities-title">{vi?"Những việc tôi đã trực tiếp làm":"What I have worked on"}</h2></div><p>{vi?"Mỗi nhóm gắn với công việc, hợp đồng hoặc dự án cụ thể.":"Each area is connected to a role, contract or project."}</p></div>
      <div className="skills-detail-grid">{groups.map(g=><article className={"skills-detail-card"+(g.n==="01"||g.n==="02"?" skills-detail-primary":"")} key={g.n}>
        <div className="skills-detail-top"><span className="skills-detail-number">{g.n}</span><span className="skills-detail-kind">{g.kind}</span></div>
        <h3>{g.title}</h3><p>{g.desc}</p><div className="skills-proof">{g.proof}</div>
        <div className="tag-list">{g.tags.map(tag=><span key={tag}>{displayTag(tag,lang)}</span>)}</div>
      </article>)}</div>
    </section>
    <section className="skills-method" aria-labelledby="skills-method-title">
      <div className="skills-section-heading"><div><span>{vi?"02 / CÁCH LÀM VIỆC":"02 / HOW I WORK"}</span><h2 id="skills-method-title">{vi?"Từ yêu cầu đến chức năng có thể sử dụng":"From requirements to working features"}</h2></div><p>{vi?"Quy trình tôi thường áp dụng khi phát triển một chức năng nghiệp vụ.":"The approach I use when developing a business feature."}</p></div>
      <div className="skills-method-grid">{steps.map(step=><article key={step[0]}><span>{step[0]}</span><h3>{step[1]}</h3><p>{step[2]}</p></article>)}</div>
    </section>
    <section className="skills-stack" aria-labelledby="skills-stack-title">
      <div className="skills-section-heading"><div><span>{vi?"03 / CÔNG NGHỆ":"03 / TECHNOLOGIES"}</span><h2 id="skills-stack-title">{vi?"Công nghệ theo từng bối cảnh":"Technologies by context"}</h2></div></div>
      <div className="skills-stack-list">
        <div><strong>{vi?"Ứng dụng và API":"Applications and APIs"}</strong><p>Python · Flask · FastAPI · REST APIs</p><small>{vi?"Flask trong công việc và dự án; FastAPI trong RackFlow.":"Flask in work and projects; FastAPI in RackFlow."}</small></div>
        <div><strong>{vi?"Dữ liệu và cơ sở dữ liệu":"Data and databases"}</strong><p>SQL · PostgreSQL · SQLAlchemy</p><small>{vi?"PostgreSQL trong ứng dụng; SQLAlchemy trong RackFlow.":"PostgreSQL in applications; SQLAlchemy in RackFlow."}</small></div>
        <div><strong>{vi?"Thị giác máy tính và tài liệu":"Computer Vision and documents"}</strong><p>YOLOv5 · DeepSORT · OCR · Selenium</p><small>{vi?"Theo dõi video và tự động hóa nhập liệu hồ sơ.":"Video tracking and document data-entry automation."}</small></div>
        <div><strong>{vi?"Kỹ thuật và dữ liệu thiết bị":"Engineering and industrial data"}</strong><p>C · IoT · Modbus RTU · RS-485</p><small>{vi?"Robot STEAM, thu thập dữ liệu cảm biến và phân tích quy trình lắp ráp.":"STEAM robotics, sensor data collection and assembly-process analysis."}</small></div>
      </div>
    </section>
  </div></main>;
}

function EducationSection({ lang }) {
  const t=text[lang], vi=lang==="vi";
  return <main id="main-content" className="inner-page page-section-page education-page"><div className="container">
    <PageHeading index="01" kicker={t.education} title={t.educationTitle} intro={t.educationPageIntro}/>
    <div className="education-grid">
      <article className="education-card"><div className="education-symbol">ED / 01</div><span className="history-type">{t.education}</span><h3>{t.degree}</h3><p>{vi?"Trường Đại học Sư phạm Kỹ thuật – Đại học Đà Nẵng":"The University of Technology and Education — The University of Danang"}</p><div className="education-meta">09/2018 – 06/2023 <b>·</b> {t.viDegree}</div></article>
      <article className="education-card"><div className="education-symbol">RE / 02</div><span className="history-type">{t.researchLabel}</span><h3>IoT-Based Waste Management System for Hazardous Waste</h3><p>{t.publication}</p><div className="education-meta">{t.award}</div></article>
    </div>
  </div></main>;
}

function ContactSection({ lang }) {
  const t=text[lang];
  return <main id="main-content" className="inner-page page-section-page contact-page"><div className="container">
    <PageHeading index="01" kicker={t.contact} title={t.contactTitle} intro={t.contactPageIntro}/>
    <div className="contact-page-panel">
      <p>{t.contactText}</p>
      <div className="contact-links">
        <a className="contact-link-card" href="mailto:tranvietminhphat@gmail.com"><span><Icon name="mail" size={19}/>{t.email}</span><strong>tranvietminhphat@gmail.com<Icon name="up" size={17}/></strong></a>
        <a className="contact-link-card" href="https://www.linkedin.com/in/minhphat-ai/" target="_blank" rel="noopener noreferrer"><span><Icon name="linkedin" size={19}/>{t.linkedin}</span><strong>minhphat-ai<Icon name="up" size={17}/></strong></a>
        <a className="contact-link-card" href="https://github.com/2000minhphat1999" target="_blank" rel="noopener noreferrer"><span><Icon name="github" size={19}/>{t.github}</span><strong>2000minhphat1999<Icon name="up" size={17}/></strong></a>
      </div>
    </div>
  </div></main>;
}function ProjectsPage({ lang,category }) {
  const t=text[lang];
  const list=category==="ai"?projects.filter(p=>p.category==="ai"):category==="backend"?projects.filter(p=>p.category==="backend"):projects;
  const heading=category==="ai"?t.ai:category==="backend"?t.backend:t.projects;
  const intro=category==="ai"?t.aiDesc:category==="backend"?t.backendDesc:t.projectsPageIntro;
  return <main id="main-content" className="inner-page projects-page"><div className="container">
    <PageHeading index="01" kicker={category?(category==="ai"?t.ai.toUpperCase():t.backend.toUpperCase()):t.projectIndex} title={heading} intro={intro}/>
    <div className="page-branch-links"><a className={!category?"selected":""} href="#projects">{t.all}</a><a className={category==="ai"?"selected":""} href="#projects/ai">{t.ai}</a><a className={category==="backend"?"selected":""} href="#projects/backend">{t.backend}</a></div>
    <div className="project-list">{list.map(project=><ProjectCard key={project.slug} project={project} lang={lang} featured={project.slug==="rackflow"}/>)}</div>
  </div></main>;
}function getYouTubeEmbedUrl(value) {
  if(!value) return "";
  try {
    const url=new URL(value);
    if(url.protocol!=="https:") return "";
    const host=url.hostname.toLowerCase().startsWith("www.")?url.hostname.slice(4).toLowerCase():url.hostname.toLowerCase();
    let id="";
    if(host==="youtu.be") id=url.pathname.split("/").filter(Boolean)[0]||"";
    else if(host==="youtube.com"||host==="m.youtube.com") {
      const parts=url.pathname.split("/").filter(Boolean);
      const routeIndex=parts.findIndex(part=>part==="embed"||part==="shorts");
      id=url.searchParams.get("v")||(routeIndex>=0?parts[routeIndex+1]||"":"");
    }
    return /^[A-Za-z0-9_-]{11}$/.test(id)?`https://www.youtube-nocookie.com/embed/${id}`:"";
  } catch {
    return "";
  }
}
function YouTubeShowcase({ url,lang }) {
  const t=text[lang];
  const embedUrl=getYouTubeEmbedUrl(url);
  return <section className="video-showcase" aria-label={t.videoShowcaseTitle}>
    <div className="video-showcase-heading"><span>{t.videoShowcaseLabel}</span><h2>{t.videoShowcaseTitle}</h2></div>
    {embedUrl?<div className="video-frame"><iframe src={embedUrl} title={t.videoFrameTitle} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen/></div>:<div className="video-placeholder"><span className="video-placeholder-mark">YT</span><div><strong>{t.videoPlaceholderTitle}</strong><p>{t.videoPlaceholderText}</p></div></div>}
  </section>;
}

function scrollToPortfolioAnchor(event,route,anchor) {
  if(!isUnmodifiedPrimaryClick(event) || !isCurrentPortfolioAnchor(window.location.hash,route,anchor)) return;
  event.preventDefault();
  document.getElementById(anchor)?.scrollIntoView({behavior:"auto",block:"start"});
}

function FabricBlog({ project,lang }) {
  const t=text[lang];
  const stageLabels=lang==="vi"
    ? ["BỐI CẢNH","QUYẾT ĐỊNH MÔ HÌNH","THỰC NGHIỆM","ỨNG DỤNG","ĐÁNH GIÁ","BƯỚC TIẾP THEO"]
    : ["CONTEXT","MODEL DECISION","EXPERIMENT","APPLICATION","EVALUATION","NEXT STEPS"];
  const sections=[
    ["challenge","01",t.fabricBlogChallengeTitle,[t.fabricBlogChallengeP1,t.fabricBlogChallengeP2]],
    ["model","02",t.fabricBlogModelTitle,[t.fabricBlogModelP1,t.fabricBlogModelP2]],
    ["setup","03",t.fabricBlogSetupTitle,[t.fabricBlogSetupP1,t.fabricBlogSetupP2]],
    ["interface","04",t.fabricBlogInterfaceTitle,[t.fabricBlogInterfaceP1,t.fabricBlogInterfaceP2]],
    ["limits","05",t.fabricBlogLimitsTitle,[t.fabricBlogLimitsP1,t.fabricBlogLimitsP2]],
    ["next","06",t.fabricBlogNextTitle,[t.fabricBlogNextP1,t.fabricBlogNextP2]]
  ];
  return <main id="main-content" className="inner-page fabric-blog-page"><div className="container">
    <a href="#projects/ai" className="back-link">← {t.back}</a>
    <header className="fabric-blog-header">
      <div className="section-kicker">{t.fabricBlogKicker} <span>—</span> {t.projectWord} / {project.number}</div>
      <div className="fabric-blog-title-row"><h1>{displayProjectTitle(project,lang)}</h1><Status status={project.status} lang={lang}/></div>
      <p className="fabric-blog-lead">{t.fabricBlogLead}</p>
      <div className="tag-list">{project.tags.map(tag=><span key={tag}>{displayTag(tag,lang)}</span>)}</div>
    </header>
    <figure className="fabric-blog-image">
      <img src="/fabric-surface-study.svg" alt={t.fabricImageAlt} loading="lazy"/>
      <figcaption>{t.fabricImageCaption}</figcaption>
    </figure>
    <section className="fabric-blog-metrics" aria-label={t.fabricBlogMetricsLabel}>
      <div className="fabric-blog-metric-label">{t.fabricBlogMetricsLabel}</div>
      <div className="fabric-blog-metric-values">
        {[["Seed 1","0.412"],["Seed 2","0.412"],["Seed 3","0.426"]].map(([label,value])=><div className="fabric-blog-metric" key={label}><span>{label}</span><strong>{value}</strong></div>)}
      </div>
      <div className="fabric-blog-metric-foot"><strong>{t.fabricBlogMetricName}</strong><span>{t.fabricBlogMetricNote}</span></div>
    </section>
    <div className="fabric-blog-layout">
      <aside className="fabric-blog-toc"><span>{t.fabricBlogToc}</span><nav>{sections.map(([id,num,title])=><a key={id} href={buildPortfolioAnchorHash("project/fabric","fabric-"+id)} onClick={event=>scrollToPortfolioAnchor(event,"project/fabric","fabric-"+id)}><i>{num}</i>{title}</a>)}</nav></aside>
      <article className="fabric-blog-article">
        <section className="fabric-blog-section" id="fabric-challenge"><div className="fabric-blog-section-kicker">01 / {stageLabels[0]}</div><h2>{sections[0][2]}</h2>{sections[0][3].map((p,i)=><p key={i}>{p}</p>)}</section>
        <section className="fabric-blog-section" id="fabric-model"><div className="fabric-blog-section-kicker">02 / {stageLabels[1]}</div><h2>{sections[1][2]}</h2>{sections[1][3].map((p,i)=><p key={i}>{p}</p>)}
          <div className="fabric-blog-specs"><div><span>{t.fabricBlogTechModel}</span><strong>Faster R-CNN</strong></div><div><span>{t.fabricBlogTechBackbone}</span><strong>MobileNetV3-FPN</strong></div><div><span>{t.fabricBlogTechRuntime}</span><strong>Google Colab · T4 GPU</strong></div><div><span>{t.fabricBlogTechTask}</span><strong>{t.fabricBlogTaskValue}</strong></div></div>
        </section>
        <section className="fabric-blog-section" id="fabric-setup"><div className="fabric-blog-section-kicker">03 / {stageLabels[2]}</div><h2>{sections[2][2]}</h2>{sections[2][3].map((p,i)=><p key={i}>{p}</p>)}</section>
        <section className="fabric-blog-section" id="fabric-interface"><div className="fabric-blog-section-kicker">04 / {stageLabels[3]}</div><h2>{sections[3][2]}</h2>{sections[3][3].map((p,i)=><p key={i}>{p}</p>)}
          <div className="fabric-blog-pipeline">{(lang==="vi"?["Ảnh đầu vào","Faster R-CNN","Bounding box + 9 nhãn","JSON đầu ra"]:["Input image","Faster R-CNN","Boxes + 9 labels","JSON output"]).map((item,i)=><React.Fragment key={item}><div><span>0{i+1}</span><strong>{item}</strong></div>{i<3&&<b>→</b>}</React.Fragment>)}</div>
        </section>
        <YouTubeShowcase url={project.youtubeUrl} lang={lang}/>
        <section className="fabric-blog-section" id="fabric-limits"><div className="fabric-blog-section-kicker">05 / {stageLabels[4]}</div><h2>{sections[4][2]}</h2>{sections[4][3].map((p,i)=><p key={i}>{p}</p>)}</section>
        <section className="fabric-blog-section fabric-blog-next" id="fabric-next"><div className="fabric-blog-section-kicker">06 / {stageLabels[5]}</div><h2>{sections[5][2]}</h2>{sections[5][3].map((p,i)=><p key={i}>{p}</p>)}</section>
        <p className="fabric-blog-closing">{t.fabricBlogClosing}</p>
        <div className="fabric-blog-footer"><div><span>{t.technologies}</span><div className="tag-list">{project.tags.map(tag=><span key={tag}>{displayTag(tag,lang)}</span>)}</div></div><a className="text-link" href="#projects/ai">{t.back}<Icon name="arrow" size={16}/></a></div>
      </article>
    </div>
  </div></main>;
}

function ProjectDetail({ project,lang }) {
  const t=text[lang];
  if(!project) return <NotFound lang={lang}/>;
  if(project.slug==="fabric") return <FabricBlog project={project} lang={lang}/>;
  const labels={problem:t.problem,role:t.role,scope:t.scope,approach:t.approach,evidence:t.evidence,next:t.next};
  return <main id="main-content" className="inner-page detail-page"><div className="container">
    <a href={project.category==="backend"?"#projects/backend":"#projects/ai"} className="back-link">← {t.back}</a>
    <div className="detail-heading"><div className="section-kicker">{t.projectWord} / {project.number} <span>—</span> {project.category==="backend"?t.backend.toUpperCase():t.ai.toUpperCase()}</div>
      <div className="detail-title-row"><h1>{displayProjectTitle(project,lang)}</h1><Status status={project.status} lang={lang}/></div><p>{t[project.summaryKey]}</p>
      <div className="tag-list">{project.tags.map(tag=><span key={tag}>{displayTag(tag,lang)}</span>)}</div>
    </div>
    <Flow project={project} lang={lang}/>
    {project.youtubeUrl!==undefined&&<YouTubeShowcase url={project.youtubeUrl} lang={lang}/>}
    <div className="case-grid">{project.fields.map(([label,key])=><article className={"case-panel case-"+label} key={key}><span>{labels[label]}</span><p>{t[key]}</p></article>)}</div>
    <div className="detail-footer"><span>{t.technologies}</span><div className="tag-list">{project.tags.map(tag=><span key={tag}>{displayTag(tag,lang)}</span>)}</div><a className="text-link" href="#projects">{t.viewAll}<Icon name="arrow" size={16}/></a></div>
  </div></main>;
}

function AboutPage({ lang }) {
  const vi=lang==="vi";
  const journey=vi?[
    ["02/2025 – 11/2026","SUMIDA","Trưởng nhóm kỹ thuật phát triển phần mềm","Tham gia phát triển WMS và FEMS. Với WMS, tôi làm việc cùng bộ phận kho để làm rõ yêu cầu, mô hình hóa quy trình, phát triển logic xử lý, kiểm thử và sửa lỗi. Với FEMS, tôi phát triển chức năng xử lý dữ liệu, dashboard điện năng và tính toán chi phí điện."],
    ["11/2023 – 03/2024","HALOVI · HỢP ĐỒNG 5 THÁNG","Computer Vision Engineer","Tham gia phát triển các thành phần thị giác máy tính trong nhóm dự án tại Halovi."],
    ["09/2022 – 12/2024","DỰ ÁN ĐỘC LẬP","Computer Vision và OCR","Thực hiện hai dự án chính: ứng dụng theo dõi giao nhận tại siêu thị bằng YOLOv5 và DeepSORT; công cụ OCR trích xuất thông tin từ sổ đăng kiểm và tự động nhập dữ liệu lên website Cảng Đà Nẵng."],
    ["03/2024 – 08/2024","ĐH SƯ PHẠM KỸ THUẬT – ĐH ĐÀ NẴNG","Research Engineer","Phát triển website giáo dục, thiết kế và lắp ráp robot STEAM, đồng thời xây dựng hoạt động học tập theo dự án."],
    ["05/2022 – 07/2022","PREMO VIETNAM","Kaizen Engineer Intern","Sử dụng Python thu thập dữ liệu hiệu suất từ cảm biến công nghiệp qua Modbus RTU, kết hợp phân tích quy trình lắp ráp và hoạt động cải tiến."]
  ]:[
    ["02/2025 – 11/2026","SUMIDA","Software Development Technical Team Lead","Contributed to WMS and FEMS. For WMS, I worked with warehouse users to clarify requirements, model workflows, develop application logic, test features and fix issues. For FEMS, I worked on data-processing features, an electricity dashboard and cost calculations."],
    ["11/2023 – 03/2024","HALOVI · 5-MONTH CONTRACT","Computer Vision Engineer","Contributed to Computer Vision development as part of the Halovi project team."],
    ["09/2022 – 12/2024","INDEPENDENT PROJECTS","Computer Vision and OCR","Worked on two main projects: a YOLOv5 and DeepSORT application for supermarket delivery monitoring, and an OCR tool that extracted vehicle-registration data and entered it into the Da Nang Port website."],
    ["03/2024 – 08/2024","UTE – THE UNIVERSITY OF DANANG","Research Engineer","Developed educational websites, designed and assembled STEAM robots, and helped create project-based learning activities."],
    ["05/2022 – 07/2022","PREMO VIETNAM","Kaizen Engineer Intern","Used Python to collect performance data from industrial sensors over Modbus RTU, alongside assembly-process analysis and continuous-improvement work."]
  ];
  const ways=vi?[
    ["01","Bắt đầu từ người sử dụng","Tôi muốn hiểu ai sẽ dùng chức năng, họ đang làm việc theo trình tự nào và điều gì khiến quy trình bị gián đoạn."],
    ["02","Biến quy trình thành logic","Tôi làm rõ dữ liệu đầu vào, trạng thái cần quản lý và cách hệ thống phản hồi trước khi triển khai chức năng."],
    ["03","Kiểm tra trong bối cảnh sử dụng","Tôi kiểm thử các luồng chính, xử lý tình huống lỗi và trao đổi lại với người dùng trong quá trình chạy thử."]
  ]:[
    ["01","Start with the people using it","I want to understand who uses a feature, how the work flows today and where the process gets interrupted."],
    ["02","Turn the workflow into application logic","I clarify the inputs, states and expected system behaviour before implementing the feature."],
    ["03","Test it in the context of the work","I check the main flows, handle errors and work through feedback during trial use."]
  ];
  return <main id="main-content" className="inner-page about-page"><div className="container">
    <PageHeading index="01" kicker={vi?"VỀ TÔI":"ABOUT ME"}
      title={vi?"Tôi thích xây dựng phần mềm giúp công việc vận hành tốt hơn.":"I enjoy building software that helps everyday work run better."}
      intro={vi?"Tôi học Cơ điện tử, từng làm việc với dữ liệu thiết bị, Computer Vision và OCR, rồi tập trung vào các ứng dụng nghiệp vụ như WMS và FEMS. Tôi thích kết nối hiểu biết về quy trình với cách phần mềm xử lý dữ liệu và hỗ trợ người dùng.":"I studied Mechatronics, worked with equipment data, Computer Vision and OCR, and then moved toward business applications such as WMS and FEMS. I enjoy connecting the way people work with the way software handles information and supports their day."}/>
    <section className="about-story-panel">
      <div className="about-story-mark"><span>{vi?"CÂU CHUYỆN CỦA TÔI":"MY STORY"}</span><strong>MP.</strong></div>
      <div><h2>{vi?"Từ nền tảng Cơ điện tử đến phát triển ứng dụng.":"From Mechatronics to application development."}</h2>
        <p>{vi?"Tôi bắt đầu với kỹ thuật cơ điện tử, nơi thiết bị, cảm biến và quy trình sản xuất gắn liền với nhau. Trong quá trình học và làm việc, tôi nhận ra mình hứng thú với phần mềm: cách dữ liệu được thu thập, cách một quy trình được mô hình hóa và cách một chức năng có thể giúp người dùng làm việc thuận tiện hơn.":"My starting point was Mechatronics, where equipment, sensors and production processes come together. Through study and work, I found myself drawn to software: how data is collected, how a process can be modelled, and how a well-built feature can make someone's work easier."}</p>
        <p>{vi?"Tại Sumida, tôi có cơ hội tham gia phát triển WMS và FEMS trong 1 năm 10 tháng. Đây là giai đoạn giúp tôi kết nối phân tích quy trình, logic ứng dụng, kiểm thử và hỗ trợ vận hành thành một công việc kỹ thuật liền mạch.":"At Sumida, I spent 1 year and 10 months contributing to WMS and FEMS. That experience brought workflow analysis, application logic, testing and operational support together as part of the same engineering job."}</p>
      </div>
    </section>
    <section className="about-block about-journey">
      <div className="about-block-heading"><span>{vi?"HÀNH TRÌNH":"THE JOURNEY"}</span><h2>{vi?"Những nơi tôi đã học hỏi và làm việc.":"The teams and projects I've learned from."}</h2><p>{vi?"Mỗi giai đoạn đem lại cho tôi một góc nhìn khác nhau về kỹ thuật, dữ liệu và phần mềm.":"Each stage has given me a different perspective on engineering, data and software."}</p></div>
      <div className="about-journey-list">{journey.map(item=><article className="about-journey-item" key={item[0]+item[2]}><div className="about-journey-meta"><time>{item[0]}</time><span>{item[1]}</span></div><div className="about-journey-content"><h3>{item[2]}</h3><p>{item[3]}</p></div></article>)}</div>
    </section>
    <section className="about-block about-mindset">
      <div className="about-block-heading"><span>{vi?"CÁCH TÔI LÀM VIỆC":"HOW I WORK"}</span><h2>{vi?"Lắng nghe, xây dựng và kiểm chứng.":"Listen, build and validate."}</h2><p>{vi?"Cách tôi tiếp cận một yêu cầu phần mềm, từ lúc bắt đầu đến khi chức năng được sử dụng thử.":"How I approach a software requirement, from the first conversation to a feature being tried in practice."}</p></div>
      <div className="about-mindset-grid">{ways.map(item=><article key={item[0]}><span>{item[0]}</span><h3>{item[1]}</h3><p>{item[2]}</p></article>)}</div>
    </section>
    <section className="about-direction"><span>{vi?"ĐỊNH HƯỚNG TIẾP THEO":"WHAT'S NEXT"}</span>
      <div><h2>{vi?"Tiếp tục phát triển Python và hệ thống nghiệp vụ.":"Going deeper with Python and business systems."}</h2>
        <p>{vi?"Tôi muốn tiếp tục phát triển các ứng dụng Python, hệ thống ERP/WMS và những chức năng giúp dữ liệu, quy trình và người sử dụng kết nối tốt hơn. Computer Vision và OCR vẫn là những mảng tôi muốn tiếp tục ứng dụng khi bài toán thực tế cần đến.":"I want to keep developing Python applications, ERP/WMS systems and features that connect data, processes and the people who use them. Computer Vision and OCR remain areas I enjoy applying when a practical problem calls for them."}</p>
        <div className="about-direction-tags"><span>Python</span><span>ERP / WMS</span><span>FEMS</span><span>Computer Vision</span><span>OCR</span></div>
      </div>
    </section>
  </div></main>;
}

function NotFound({ lang }) {
  const t=text[lang];
  return <main id="main-content" className="inner-page not-found"><div className="container"><div className="section-kicker">{t.notFoundLabel}</div><h1>{t.notFoundTitle}</h1><p>{t.notFound}</p><a className="button button-primary" href="#home">{t.homeAction}<Icon name="arrow" size={16}/></a></div></main>;
}

function Footer({ lang }) {
  const t=text[lang];
  return <footer className="site-footer"><div className="container footer-top"><Brand lang={lang}/><p>{t.footer}</p><a href="#home" className="back-top">{t.backTop} ↑</a></div>
    <div className="container footer-bottom"><span>© {new Date().getFullYear()} TRAN VIET MINH PHAT</span><span>{t.footerStack}</span><a href="https://github.com/2000minhphat1999" target="_blank" rel="noopener noreferrer">{t.githubLabel} <Icon name="up" size={13}/></a></div>
  </footer>;
}

function resolvePortfolioLocation() {
  return parsePortfolioHash(window.location.hash);
}

function resolvePortfolioRoute() {
  return resolvePortfolioLocation().route;
}

class RenderErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state={hasError:false};
  }
  static getDerivedStateFromError() {
    return {hasError:true};
  }
  componentDidCatch(error,info) {
    console.error("Portfolio page render failed:",error,info.componentStack);
  }
  render() {
    if(this.state.hasError) {
      const vi=this.props.lang==="vi" || (!this.props.lang && typeof document!=="undefined" && document.documentElement.lang==="vi");
      return <main className="inner-page page-error-state" role="alert">
        <div className="container">
          <div className="section-kicker">{vi?text.vi.pageRenderError:text.en.pageRenderError}</div>
          <h1>{vi?"Trang này đang gặp lỗi hiển thị.":"This page could not be displayed."}</h1>
          <p>{vi?"Nội dung không tải được do lỗi khi render. Hãy tải lại trang; lỗi đã được ghi nhận trong console để kiểm tra.":"A rendering error prevented this page from loading. Reload the page; technical details are available in the browser console."}</p>
          <button type="button" className="button button-primary" onClick={()=>window.location.reload()}>{vi?text.vi.reloadPage:text.en.reloadPage}</button>
          <a className="text-link" href="#home">{vi?text.vi.backHome:text.en.backHome}</a>
        </div>
      </main>;
    }
    return this.props.children;
  }
}

export function App() {
  const [lang,setLang]=useState(readStoredLanguage);
  const [route,setRoute]=useState(()=>resolvePortfolioLocation().route);
  const [anchor,setAnchor]=useState(()=>resolvePortfolioLocation().anchor);
  useEffect(()=>{
    const change=()=>{
      const next=resolvePortfolioLocation();
      setRoute(next.route);
      setAnchor(next.anchor);
    };
    window.addEventListener("hashchange",change);
    if(!window.location.hash) window.location.hash="home";
    return ()=>window.removeEventListener("hashchange",change);
  },[]);
  useEffect(()=>{
    if(anchor) {
      window.requestAnimationFrame(()=>document.getElementById(anchor)?.scrollIntoView({behavior:"auto",block:"start"}));
    } else {
      window.scrollTo({top:0,behavior:"auto"});
    }
  },[route,anchor]);
  useEffect(()=>{
    writeStoredLanguage(lang);
    document.documentElement.lang=lang;
    const slug=route.startsWith("project/")?route.split("/")[1]:null;
    const selected=projects.find(p=>p.slug===slug);
    const sectionTitles={
      projects:lang==="vi"?"Dự án | Minh Phat":"Projects | Minh Phat",
      "projects/ai":lang==="vi"?"Dự án AI | Minh Phat":"AI Projects | Minh Phat",
      "projects/backend":lang==="vi"?"Dự án Backend | Minh Phat":"Backend Projects | Minh Phat",
      experience:lang==="vi"?"Kinh nghiệm | Minh Phat":"Experience | Minh Phat",
      skills:lang==="vi"?"Kỹ năng | Minh Phat":"Skills | Minh Phat",
      education:lang==="vi"?"Học vấn | Minh Phat":"Education | Minh Phat",
      about:lang==="vi"?"Giới thiệu | Minh Phat":"About | Minh Phat",
      contact:lang==="vi"?"Liên hệ | Minh Phat":"Contact | Minh Phat"
    };
    document.title=selected?displayProjectTitle(selected,lang)+" | Minh Phat":(sectionTitles[route]||(lang==="vi"?"Minh Phat | IT Staff / Hỗ trợ ERP":"Tran Viet Minh Phat | IT Staff / ERP Support"));
    const pageDescriptions={
      home:text[lang].intro,
      projects:text[lang].projectsPageIntro,
      "projects/ai":text[lang].aiDesc,
      "projects/backend":text[lang].backendDesc,
      experience:text[lang].experiencePageIntro,
      skills:text[lang].skillsPageIntro,
      education:text[lang].educationPageIntro,
      about:text[lang].aboutPageIntro,
      contact:text[lang].contactPageIntro
    };
    const description=document.querySelector('meta[name="description"]');
    if(description) description.content=selected?text[lang][selected.summaryKey]:(pageDescriptions[route]||text[lang].intro);
    const ogTitle=document.querySelector('meta[property="og:title"]');
    const ogDescription=document.querySelector('meta[property="og:description"]');
    const ogLocale=document.querySelector('meta[property="og:locale"]');
    if(ogTitle) ogTitle.content=document.title;
    if(ogDescription) ogDescription.content=description?.content||text[lang].intro;
    if(ogLocale) ogLocale.content=lang==="vi"?"vi_VN":"en_US";
  },[lang,route]);
  const parts=route.split("/");
  let content;
  if(route==="home"||route==="") content=<HomePage lang={lang}/>;
  else if(route==="projects") content=<ProjectsPage lang={lang}/>;
  else if(route==="projects/ai") content=<ProjectsPage lang={lang} category="ai"/>;
  else if(route==="projects/backend") content=<ProjectsPage lang={lang} category="backend"/>;
  else if(route==="experience") content=<ExperiencePreview lang={lang}/>;
  else if(route==="skills") content=<SkillsSection lang={lang}/>;
  else if(route==="education") content=<EducationSection lang={lang}/>;
  else if(route==="about") content=<AboutPage lang={lang}/>;
  else if(route==="contact") content=<ContactSection lang={lang}/>;
  else if(parts[0]==="project") content=<ProjectDetail project={projects.find(p=>p.slug===parts[1])} lang={lang}/>;
  else content=<NotFound lang={lang}/>;
  return <><a className="skip-link" href={buildPortfolioAnchorHash(route,"main-content")} onClick={event=>scrollToPortfolioAnchor(event,route,"main-content")}>{text[lang].skipToContent}</a><Header lang={lang} setLang={setLang} route={route}/><RenderErrorBoundary key={`${route}:${lang}`} lang={lang}>{content}</RenderErrorBoundary><Footer lang={lang}/></>;
}

if (typeof document !== "undefined") {
  const rootElement = document.getElementById("root");
  if (rootElement) {
    createRoot(rootElement).render(<React.StrictMode><RenderErrorBoundary><App/></RenderErrorBoundary></React.StrictMode>);
  }
}