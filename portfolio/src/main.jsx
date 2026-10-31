import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const text = {
  en: {
    home:"Home", projects:"Projects", all:"All projects", ai:"AI", backend:"Backend", experience:"Experience", about:"About", contact:"Contact",
    projectsPageIntro:"Browse the work by engineering domain, then open an individual case study for scope and evidence.",
    experiencePageIntro:"Employment, a fixed-term contract, intermittent freelance engagements and earlier engineering experience — kept separate by type and duration.",
    skillsPageIntro:"A practical view of the tools and domains used in the work described in this portfolio. No percentage ratings or unsupported proficiency claims.",
    educationPageIntro:"Formal engineering education and documented research activity.",
    aboutPageIntro:"My professional mindset combines systems thinking, solution design and continuous improvement.",
    contactPageIntro:"For Python business applications, ERP/WMS, backend engineering and AI-integrated workflow opportunities.",
    homeFocusTitle:"Design for operational efficiency.",
    homeFocusText:"Explore how my Python and business-systems foundation connects to my goal of building AI-integrated software for real business workflows.",
    availability:"Open to relevant opportunities", eyebrow:"PYTHON · AI-INTEGRATED BUSINESS SOFTWARE",
    headlineA:"Business software designed", headlineB:"to work smarter with AI.",
    intro:"My direction is to design Python-based business software that integrates AI into real operational workflows—reducing repetitive work, supporting decisions and helping companies use their workforce more effectively. My current foundation is Python applications and ERP/WMS; Computer Vision and OCR come from separate project experience.",
    explore:"Explore projects", getInTouch:"Get in touch", snapshot:"PROFESSIONAL SNAPSHOT", sumida:"at Sumida", halovi:"contract at Halovi", freelance:"main freelance projects",
    selected:"SELECTED WORK", featuredTitle:"Projects with a clear problem, scope and status.",
    featuredIntro:"Professional experience, past project engagements and work still in development are clearly separated.",
    seeCase:"View case study", viewAll:"View all projects", inProgress:"In development", past:"Past project", planned:"Planned experiment",
    domains:"PROJECT AREAS", domainsTitle:"One primary direction. Two supporting domains.",
    domainsIntro:"Projects is the parent section; AI and Backend are its two branches.",
    backendDesc:"Python services, business rules, persistence and warehouse workflows. RackFlow is a personal project in development.",
    aiDesc:"Past work in video-based detection and tracking, OCR-assisted document entry, and a separately labelled future experiment.",
    experienceTitle:"Experience grounded in actual scope.",
    experienceIntro:"Employment, fixed-term contract, intermittent freelance work, research/education and internship are listed separately.",
    employment:"EMPLOYMENT & CONTRACT", earlier:"PROJECT-BASED & EARLIER EXPERIENCE",
    skills:"CAPABILITIES", skillsTitle:"Tools and domains I can discuss with evidence.",
    skillsIntro:"No percentage skill bars. These groups describe technologies used in the work listed here.",
    core:"CORE", data:"DATA & WORKFLOWS", supporting:"SUPPORTING EXPERIENCE",
    education:"EDUCATION", educationTitle:"Engineering foundation.",
    contactTitle:"Have an operational workflow to improve?",
    contactText:"Interested in Python business applications, ERP/WMS and backend roles that can grow toward AI-integrated workflows and measurable operational improvements. Computer Vision remains a supporting project domain.",
    email:"Email", linkedin:"LinkedIn", github:"GitHub profile", footer:"Practical systems. Clear scope. Verifiable work.",
    problem:"Problem & objective", role:"My role", approach:"Solution & implementation", scope:"Scope",
    evidence:"Evidence & limitations", next:"Next step", technologies:"TECHNOLOGIES", back:"Back to projects",
    noOt:"Industrial OT/IT technologies such as Siemens S7, SCADA, MQTT and OPC UA are not presented as hands-on professional experience.",
    sumidaRole:"Software Development Technical Team Lead",
    sumidaWms:"WMS: clarified requirements with warehouse users, analysed workflows, implemented application logic, tested features, fixed defects and supported trial deployment.",
    sumidaFems:"FEMS: contributed to data-processing functions, an electricity-monitoring dashboard and electricity-cost calculations.",
    haloviRole:"Computer Vision Engineer",
    haloviText:"Worked on Computer Vision components during a five-month contract. The scope is limited to the confirmed contract and field; unverified production responsibilities are not added.",
    freelanceText:"Two main engagements carried out in separate project periods, with gaps between them; this was not continuous full-time employment.",
    uniRole:"Research Engineer",
    uniText:"Developed educational websites, designed and assembled STEAM robot systems, and contributed to project-based learning activities.",
    premoRole:"Kaizen Engineer Intern",
    premoText:"Supported assembly-process analysis and continuous-improvement activities during an engineering internship. This is not presented as professional OT/IT systems engineering.",
    freelanceType:"Intermittent freelance engagements", research:"Research / education", internship:"Internship",
    degree:"B.Eng. in Mechatronics Engineering Technology",
    publication:"Co-author of “Building An IoT-Based Waste Management System for Hazardous Waste,” REC-ECIT 2023, pp. 193–198.",
    award:"Student research recognition in 2022–2023, including a second prize at the Da Nang City Student Scientific Research Competition in 2022.",
    rackSummary:"A warehouse operations application focused on inbound receiving, inventory lookup, order lookup, stock reservation and traceable state changes.",
    cvSummary:"A project-based freelance Computer Vision workflow using video to detect and track activity related to supermarket deliveries.",
    ocrSummary:"A project-based workflow for extracting information from vehicle-inspection documents and entering data into a website.",
    fabricSummary:"A proposed Computer Vision experiment for fabric inspection. No dataset, implementation, trained model or evaluation result is claimed.",
    rackProblem:"Warehouse workflows need consistent stock information and clear records of operational actions. RackFlow models these flows in a small ERP/WMS portfolio application.",
    rackRole:"Personal project. I define the scope and implement the application incrementally; this is not a deployed customer system or production warehouse platform.",
    rackScope:"Inbound receiving and inventory lookup; order lookup and stock reservation; event history for operational traceability.",
    rackApproach:"Python services using FastAPI and Flask, SQLAlchemy and PostgreSQL. The project focuses on business rules, data persistence, workflow behaviour and explicit state changes.",
    rackEvidence:"The listed features define the current portfolio scope. Outbound workflows and AI-assisted operations remain under development; no production deployment or business KPI is claimed.",
    rackNext:"Complete and verify manual outbound first, then add AI-assisted operations with validation, human confirmation and traceable events.",
    cvProblem:"Support delivery monitoring by identifying and following relevant objects through video.",
    cvRole:"Implemented a Computer Vision workflow using YOLOv5 for object detection and DeepSORT for object tracking.",
    cvEvidence:"Past freelance project delivered in a project-based engagement. No verified accuracy, throughput or time-saving metrics are claimed.",
    cvNext:"For a reproducible demo, report detector precision/recall and representative failure cases; for tracking, document identity switches and occlusion behaviour.",
    ocrProblem:"Reduce repetitive manual entry from paper vehicle-inspection records into the Da Nang Port website.",
    ocrRole:"Used image processing and OCR in a workflow that extracted document information and automated website data entry.",
    ocrEvidence:"Past project-based freelance work. Document samples, field-level accuracy and time-saved measurements are not published as verified evidence here.",
    ocrNext:"For a reproducible demo, measure field-level exact match, correction rate and failure handling on labelled documents.",
    fabricProblem:"Fabric defects can affect material quality in sofa manufacturing. The proposed goal is to test whether visible defects can be detected consistently before considering factory integration.",
    fabricApproach:"Inspect the dataset and annotations first; then select a reproducible baseline suited to the label format. Choose detection, segmentation or classical image processing only after examining the data.",
    fabricEvidence:"Planning-stage proposal only. No dataset has been selected, and no implementation, training, model evaluation or factory integration has been completed or verified.",
    fabricNext:"Confirm dataset licensing and inspect sample images before choosing a model or claiming results.",
    flow:"WORKFLOW MODEL · ILLUSTRATIVE", receive:"Receive stock", inventory:"Check inventory", reserve:"Reserve stock", trace:"Trace changes",
    video:"Video frames", detection:"YOLOv5 detection", tracking:"DeepSORT tracking", tracks:"Track output",
    document:"Document image", ocr:"Image processing / OCR", fields:"Extracted fields", entry:"Web entry",
    dataset:"Dataset", baseline:"Baseline", evaluation:"Evaluation", notFound:"This portfolio page could not be found.", homeAction:"Back to home",
    backTop:"Back to top", viDegree:"Degree classification: Good",
    skipToContent:"Skip to content", brandHome:"Minh Phat — home", toggleNavigation:"Toggle navigation", mainNavigation:"Main navigation", language:"Language",
    projectWord:"PROJECT", projectIndex:"INDEX", regionLabel:"VIETNAM", brandDescriptor:"PYTHON · ERP / WMS", categoryBackend:"PYTHON BACKEND · ERP / WMS", categoryAi:"COMPUTER VISION · OCR", categoryPlanned:"PROPOSED COMPUTER VISION",
    projectAiNav:"Computer Vision · OCR", projectBackendNav:"Python · ERP / WMS",
    sumidaDuration:"1 yr 10 mo", haloviDuration:"5 months", homeFocusKicker:"PROFILE / OVERVIEW", heroProfile:"01 / 04 — PROFILE",
    heroArtLabel:"Illustration of an operational software workflow", artTopLeft:"ENGINEERING / 01", artTopRight:"BUSINESS APPLICATIONS",
    artTitle1:"Software with", artTitle2:"business impact.", artSubtitle:"AI-enabled business solutions",
    artNeed:"NEED", artNeedText:"Business challenge", artSolution:"SOLUTION", artSolutionText:"Applied software", artImpact:"IMPACT", artImpactText:"Useful outcomes",
    artFootLeft:"BUILT FOR PRACTICAL VALUE", artFootRight:"MP / SYSTEMS",
    aboutWho:"WHO I AM", aboutJourney:"02 / MY JOURNEY", aboutMindset:"03 / PROFESSIONAL MINDSET", aboutBring:"04 / WHAT I BRING", aboutDirection:"05 / CAREER DIRECTION",
    areaMechatronics:"MECHATRONICS", areaIndustrialData:"INDUSTRIAL DATA", areaWmsFems:"WMS & FEMS", areaPython:"PYTHON", areaVision:"COMPUTER VISION & OCR",
    jobKind:"EMPLOYMENT", haloviKind:"5-month contract", researchLabel:"RESEARCH", notFoundLabel:"404 / NOT FOUND", notFoundTitle:"Oops.",
    pageRenderError:"PAGE RENDER ERROR", reloadPage:"Reload page", backHome:"Back to home",
    footerStack:"PYTHON APPLICATIONS · ERP / WMS", githubLabel:"GITHUB"
  },
  vi: {
    home:"Trang chủ", projects:"Dự án", all:"Tất cả dự án", ai:"AI", backend:"Backend", experience:"Kinh nghiệm", about:"Giới thiệu", contact:"Liên hệ",
    projectsPageIntro:"Xem các dự án theo lĩnh vực kỹ thuật, sau đó mở trang chi tiết để tìm hiểu phạm vi thực hiện và bằng chứng.",
    experiencePageIntro:"Công việc chính thức, hợp đồng có thời hạn, các dự án tự do thực hiện theo từng đợt và trải nghiệm kỹ thuật trước đó được phân loại riêng.",
    skillsPageIntro:"Tổng quan về công nghệ và lĩnh vực đã được sử dụng trong công việc, hợp đồng và dự án. Không dùng thang điểm phần trăm hoặc tự nhận mức độ thành thạo khi chưa có căn cứ.",
    educationPageIntro:"Quá trình đào tạo kỹ thuật và hoạt động nghiên cứu có thông tin xác nhận.",
    aboutPageIntro:"Tư duy nghề nghiệp của tôi kết hợp góc nhìn hệ thống, thiết kế giải pháp và cải tiến liên tục.",
    contactPageIntro:"Trao đổi cơ hội về phát triển ứng dụng Python, hệ thống ERP/WMS, phần mềm phía máy chủ và các giải pháp doanh nghiệp tích hợp AI.",
    homeFocusTitle:"Thiết kế để nâng cao hiệu suất vận hành.",
    homeFocusText:"Từ nền tảng Python và hệ thống nghiệp vụ, tôi hướng đến phần mềm tích hợp AI để cải thiện quy trình và sử dụng nguồn lực doanh nghiệp hiệu quả hơn.",
    availability:"Sẵn sàng trao đổi cơ hội phù hợp", eyebrow:"PYTHON · PHẦN MỀM DOANH NGHIỆP TÍCH HỢP AI",
    headlineA:"Thiết kế phần mềm doanh nghiệp", headlineB:"tích hợp AI để vận hành hiệu quả hơn.",
    intro:"Tôi định hướng thiết kế phần mềm doanh nghiệp, đưa AI vào quy trình vận hành thực tế để giảm thao tác lặp lại, hỗ trợ ra quyết định và sử dụng nguồn lực nhân sự hiệu quả hơn. Nền tảng hiện tại của tôi là phát triển ứng dụng Python và hệ thống ERP/WMS; thị giác máy tính (Computer Vision) và OCR đến từ những dự án riêng biệt.",
    explore:"Khám phá dự án", getInTouch:"Liên hệ", snapshot:"TÓM TẮT KINH NGHIỆM", sumida:"tại Sumida", halovi:"hợp đồng tại Halovi", freelance:"dự án tự do chính",
    selected:"DỰ ÁN TIÊU BIỂU", featuredTitle:"Dự án có bài toán, phạm vi và trạng thái rõ ràng.",
    featuredIntro:"Hồ sơ năng lực phân biệt kinh nghiệm công việc, dự án đã thực hiện theo từng đợt và phần đang phát triển.",
    seeCase:"Xem chi tiết dự án", viewAll:"Xem tất cả dự án", inProgress:"Đang phát triển", past:"Dự án đã thực hiện", planned:"Dự kiến thử nghiệm",
    domains:"NHÓM DỰ ÁN", domainsTitle:"Một hướng chính, hai nhánh chuyên môn.",
    domainsIntro:"Dự án là danh mục chính, gồm hai nhánh chuyên môn: AI và Backend.",
    backendDesc:"Dịch vụ Python, quy tắc nghiệp vụ, lưu trữ dữ liệu và quy trình kho. RackFlow là dự án cá nhân đang phát triển.",
    aiDesc:"Các dự án đã thực hiện về phát hiện và theo dõi đối tượng qua video, OCR hỗ trợ nhập liệu tài liệu, cùng một thử nghiệm dự kiến được ghi rõ trạng thái.",
    experienceTitle:"Kinh nghiệm với phạm vi thực tế được phân định.",
    experienceIntro:"Công việc chính thức, hợp đồng có thời hạn, dự án tự do không liên tục, hoạt động nghiên cứu – giáo dục và kỳ thực tập được trình bày riêng.",
    employment:"CÔNG VIỆC & HỢP ĐỒNG", earlier:"DỰ ÁN TỰ DO & KINH NGHIỆM TRƯỚC ĐÓ",
    skills:"NĂNG LỰC", skillsTitle:"Công nghệ và lĩnh vực có thể trình bày bằng bằng chứng.",
    skillsIntro:"Không dùng thanh phần trăm để tự đánh giá kỹ năng. Các nhóm thể hiện công nghệ gắn với công việc được mô tả.",
    core:"NỀN TẢNG CHÍNH", data:"DỮ LIỆU & QUY TRÌNH", supporting:"KINH NGHIỆM BỔ TRỢ",
    education:"HỌC VẤN", educationTitle:"Nền tảng kỹ thuật.",
    contactTitle:"Bạn có quy trình vận hành cần cải thiện?",
    contactText:"Tôi quan tâm đến các vị trí Python, ERP/WMS và phát triển hệ thống phía máy chủ, có cơ hội mở rộng sang tích hợp AI vào quy trình nghiệp vụ và cải thiện hiệu quả vận hành. Thị giác máy tính là lĩnh vực dự án bổ trợ.",
    email:"Email", linkedin:"LinkedIn", github:"GitHub cá nhân", footer:"Hệ thống thực tế. Phạm vi rõ ràng. Công việc có thể kiểm chứng.",
    problem:"Bài toán & mục tiêu", role:"Vai trò cá nhân", approach:"Giải pháp & triển khai", scope:"Phạm vi",
    evidence:"Bằng chứng & giới hạn", next:"Bước tiếp theo", technologies:"CÔNG NGHỆ SỬ DỤNG", back:"Quay lại danh mục dự án",
    noOt:"Các công nghệ OT/IT công nghiệp như Siemens S7, SCADA, MQTT và OPC UA không được trình bày như kinh nghiệm thực chiến chuyên nghiệp.",
    sumidaRole:"Trưởng nhóm kỹ thuật phát triển phần mềm",
    sumidaWms:"WMS: làm rõ yêu cầu với người dùng kho, phân tích quy trình, triển khai logic ứng dụng, kiểm thử chức năng, sửa lỗi và hỗ trợ chạy thử.",
    sumidaFems:"FEMS: tham gia phát triển chức năng xử lý dữ liệu, bảng điều khiển giám sát điện năng và tính toán chi phí điện.",
    haloviRole:"Kỹ sư thị giác máy tính",
    haloviText:"Tham gia phát triển các thành phần thị giác máy tính trong hợp đồng 5 tháng. Mô tả chỉ giới hạn ở lĩnh vực và thời hạn đã xác nhận; không bổ sung trách nhiệm triển khai thực tế khi chưa có căn cứ.",
    freelanceText:"Hai dự án chính được thực hiện ở các giai đoạn riêng biệt, có khoảng thời gian gián đoạn giữa các đợt; không phải công việc toàn thời gian liên tục.",
    uniRole:"Kỹ sư nghiên cứu",
    uniText:"Phát triển trang web giáo dục, thiết kế và lắp ráp hệ thống robot STEAM, tham gia hoạt động học tập theo dự án.",
    premoRole:"Thực tập sinh kỹ thuật Kaizen",
    premoText:"Hỗ trợ phân tích quy trình lắp ráp và hoạt động cải tiến liên tục trong kỳ thực tập kỹ thuật. Không trình bày đây là kinh nghiệm kỹ sư OT/IT chuyên nghiệp.",
    freelanceType:"Dự án tự do theo từng đợt", research:"Nghiên cứu / giáo dục", internship:"Thực tập",
    degree:"Kỹ sư Công nghệ Kỹ thuật Cơ điện tử",
    publication:"Đồng tác giả bài báo “Building An IoT-Based Waste Management System for Hazardous Waste,” REC-ECIT 2023, trang 193–198.",
    award:"Thành tích nghiên cứu sinh viên năm 2022–2023, bao gồm giải Nhì Cuộc thi Sinh viên nghiên cứu khoa học TP. Đà Nẵng năm 2022.",
    rackSummary:"Ứng dụng vận hành kho tập trung vào nhập kho, tra cứu tồn, tra cứu đơn, giữ tồn và lịch sử thay đổi có thể truy vết.",
    cvSummary:"Quy trình thị giác máy tính thực hiện theo dự án, sử dụng video để phát hiện và theo dõi hoạt động giao nhận tại siêu thị.",
    ocrSummary:"Quy trình thực hiện theo dự án, trích xuất thông tin từ hồ sơ kiểm định phương tiện và nhập dữ liệu vào trang web.",
    fabricSummary:"Đề xuất thử nghiệm thị giác máy tính để kiểm tra bề mặt vải. Chưa chọn tập dữ liệu, chưa triển khai mã nguồn, huấn luyện mô hình hoặc có kết quả đánh giá được xác minh.",
    rackProblem:"Quy trình kho cần dữ liệu tồn nhất quán và lịch sử rõ ràng cho từng thao tác. RackFlow mô hình hóa các luồng này trong một ứng dụng ERP/WMS thuộc hồ sơ năng lực cá nhân.",
    rackRole:"Dự án cá nhân. Tôi xác định phạm vi và triển khai ứng dụng theo từng bước; đây chưa phải hệ thống bàn giao cho khách hàng hoặc nền tảng đang được sử dụng tại nhà kho thực tế.",
    rackScope:"Nhập kho và tra cứu tồn; tra cứu đơn và giữ tồn; lịch sử sự kiện phục vụ truy vết vận hành.",
    rackApproach:"Các dịch vụ Python sử dụng FastAPI, Flask, SQLAlchemy và PostgreSQL. Trọng tâm là quy tắc nghiệp vụ, lưu trữ dữ liệu, hành vi quy trình và thay đổi trạng thái rõ ràng.",
    rackEvidence:"Các tính năng được liệt kê xác định phạm vi hiện tại của dự án. Quy trình xuất kho và chức năng hỗ trợ vận hành bằng AI vẫn đang phát triển; chưa có tuyên bố về triển khai thực tế hoặc chỉ số hiệu quả nghiệp vụ.",
    rackNext:"Hoàn thiện và kiểm thử quy trình xuất kho thủ công trước, sau đó mới bổ sung AI cùng các bước kiểm tra dữ liệu, xác nhận của người vận hành và ghi nhận lịch sử có thể truy vết.",
    cvProblem:"Hỗ trợ giám sát hoạt động giao nhận bằng cách nhận diện và theo dõi các đối tượng liên quan trong video.",
    cvRole:"Triển khai quy trình thị giác máy tính sử dụng YOLOv5 để phát hiện đối tượng và DeepSORT để theo dõi đối tượng.",
    cvEvidence:"Dự án tự do được thực hiện theo từng đợt. Chưa có bằng chứng xác minh về độ chính xác, tốc độ xử lý hoặc thời gian tiết kiệm nên không đưa ra các chỉ số này.",
    cvNext:"Để có bản minh họa có thể tái lập, cần báo cáo độ chính xác (precision), độ bao phủ (recall) và các trường hợp lỗi; với theo dõi đối tượng, cần ghi nhận lỗi đổi định danh và hành vi khi đối tượng bị che khuất.",
    ocrProblem:"Giảm thao tác nhập liệu lặp lại từ hồ sơ kiểm định phương tiện dạng giấy vào trang web Cảng Đà Nẵng.",
    ocrRole:"Sử dụng xử lý ảnh và OCR để trích xuất thông tin tài liệu, sau đó tự động nhập dữ liệu lên trang web.",
    ocrEvidence:"Dự án tự do được thực hiện theo từng đợt. Chưa có bộ tài liệu mẫu, độ chính xác trích xuất theo từng trường hoặc số liệu thời gian tiết kiệm đã được xác minh để công bố.",
    ocrNext:"Để có bản minh họa có thể tái lập, cần đo tỷ lệ trích xuất khớp hoàn toàn ở từng trường, tỷ lệ phải sửa và khả năng xử lý lỗi trên bộ tài liệu đã được gán nhãn.",
    fabricProblem:"Lỗi bề mặt vải có thể ảnh hưởng chất lượng vật liệu trong sản xuất sofa. Mục tiêu đề xuất là kiểm tra khả năng phát hiện lỗi ổn định trước khi cân nhắc tích hợp vào quy trình nhà máy.",
    fabricApproach:"Kiểm tra tập dữ liệu và nhãn chú thích trước; sau đó chọn mô hình nền có thể tái lập, phù hợp với định dạng nhãn. Chỉ quyết định dùng phương pháp phát hiện, phân đoạn hay xử lý ảnh truyền thống sau khi đã xem dữ liệu.",
    fabricEvidence:"Mới ở giai đoạn đề xuất. Chưa chọn tập dữ liệu, chưa triển khai mã nguồn, huấn luyện, đánh giá mô hình hay xác minh việc tích hợp vào nhà máy.",
    fabricNext:"Xác nhận giấy phép sử dụng tập dữ liệu và kiểm tra ảnh mẫu trước khi chọn mô hình hoặc công bố kết quả.",
    flow:"MÔ HÌNH QUY TRÌNH · MINH HỌA", receive:"Nhập kho", inventory:"Kiểm tra tồn", reserve:"Giữ tồn", trace:"Truy vết",
    video:"Khung hình video", detection:"YOLOv5 phát hiện", tracking:"Theo dõi đối tượng bằng DeepSORT", tracks:"Kết quả theo dõi",
    document:"Ảnh tài liệu", ocr:"Xử lý ảnh / OCR", fields:"Trường thông tin", entry:"Nhập dữ liệu lên trang web",
    dataset:"Tập dữ liệu", baseline:"Mô hình cơ sở", evaluation:"Đánh giá", notFound:"Không tìm thấy trang này.", homeAction:"Về trang chủ",
    backTop:"Lên đầu trang", viDegree:"Xếp loại Khá",
    skipToContent:"Chuyển đến nội dung chính", brandHome:"Minh Phát — trang chủ", toggleNavigation:"Mở hoặc đóng điều hướng", mainNavigation:"Điều hướng chính", language:"Ngôn ngữ",
    projectWord:"DỰ ÁN", projectIndex:"DANH MỤC", regionLabel:"VIỆT NAM", brandDescriptor:"ỨNG DỤNG PYTHON · ERP / WMS", categoryBackend:"PYTHON BACKEND · ERP / WMS", categoryAi:"THỊ GIÁC MÁY TÍNH · OCR", categoryPlanned:"ĐỀ XUẤT THỬ NGHIỆM THỊ GIÁC MÁY TÍNH",
    projectAiNav:"Thị giác máy tính · OCR", projectBackendNav:"Python · ERP / WMS",
    sumidaDuration:"1 năm 10 tháng", haloviDuration:"5 tháng", homeFocusKicker:"HỒ SƠ / TỔNG QUAN", heroProfile:"01 / 04 — HỒ SƠ",
    heroArtLabel:"Minh họa quy trình vận hành phần mềm", artTopLeft:"KỸ THUẬT / 01", artTopRight:"ỨNG DỤNG NGHIỆP VỤ",
    artTitle1:"Phần mềm tạo", artTitle2:"giá trị thực tiễn.", artSubtitle:"Giải pháp doanh nghiệp tích hợp AI",
    artNeed:"NHU CẦU", artNeedText:"Bài toán nghiệp vụ", artSolution:"GIẢI PHÁP", artSolutionText:"Ứng dụng phần mềm", artImpact:"KẾT QUẢ", artImpactText:"Giá trị sử dụng",
    artFootLeft:"ƯU TIÊN GIÁ TRỊ THỰC TẾ", artFootRight:"MP / HỆ THỐNG",
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
  { slug:"fabric", category:"ai", number:"04", title:"Fabric Defect Inspection", status:"planned", tags:["Computer Vision","Dataset design","Model evaluation"], summaryKey:"fabricSummary", fields:[["problem","fabricProblem"],["approach","fabricApproach"],["evidence","fabricEvidence"],["next","fabricNext"]], flow:["dataset","baseline","evaluation"] }
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
  return <a className="brand" href="#home" aria-label={t.brandHome}><span className="brand-mark">MP<span>.</span></span><span className="brand-name">MINH PHAT<small>{t.brandDescriptor}</small></span></a>;
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
  const label=status==="progress"?t.inProgress:status==="planned"?t.planned:t.past;
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
  const labels={"Video tracking":"Theo dõi video","Image processing":"Xử lý ảnh","Automation":"Tự động hóa","REST APIs":"API dịch vụ","Dataset design":"Thiết kế tập dữ liệu","Model evaluation":"Đánh giá mô hình","Computer Vision":"Thị giác máy tính"};
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
  return <section className="hero-section" id="top"><div className="hero-grid-bg"/>
    <div className="container hero-container">
      <div className="hero-copy">
        <div className="availability"><span className="availability-dot"/>{t.availability}</div>
        <div className="hero-kicker">{t.eyebrow}<span>—</span>{t.regionLabel}</div>
        <h1>{t.headlineA}<br/><em>{t.headlineB}</em></h1>
        <p className="hero-intro">{t.intro}</p>
        <div className="hero-actions"><a className="button button-primary" href="#projects">{t.explore}<Icon name="arrow" size={17}/></a><a className="button button-quiet" href="mailto:tranvietminhphat@gmail.com">{t.getInTouch}<Icon name="up" size={15}/></a></div>
        <div className="hero-socials"><a href="https://github.com/2000minhphat1999" target="_blank" rel="noopener noreferrer"><Icon name="github" size={16}/>GitHub</a><a href="https://www.linkedin.com/in/minhphat-ai/" target="_blank" rel="noopener noreferrer"><Icon name="linkedin" size={16}/>LinkedIn</a><span>{t.heroProfile}</span></div>
      </div>
      <div className="hero-art" aria-label={t.heroArtLabel}>
        <div className="art-topline"><span>{t.artTopLeft}</span><span>{t.artTopRight}</span></div>
        <div className="art-title">{t.artTitle1}<br/>{t.artTitle2}</div><div className="art-subtitle">{t.artSubtitle}</div>
        <div className="art-node node-one"><span className="node-index">01</span><div><small>{t.artNeed}</small><strong>{t.artNeedText}</strong></div><span className="node-symbol">↘</span></div>
        <div className="art-connector"/><div className="art-node"><span className="node-index">02</span><div><small>{t.artSolution}</small><strong>{t.artSolutionText}</strong></div><span className="node-symbol">⌘</span></div>
        <div className="art-connector"/><div className="art-node"><span className="node-index">03</span><div><small>{t.artImpact}</small><strong>{t.artImpactText}</strong></div><span className="node-symbol">▤</span></div>
        <div className="art-foot"><span><i/>{t.artFootLeft}</span><span>{t.artFootRight}</span></div><div className="art-orbit orbit-a"/><div className="art-orbit orbit-b"/>
      </div>
    </div>
    <div className="container hero-stats"><div className="stats-label">{t.snapshot}</div>
      <div className="stat-item"><strong>{t.sumidaDuration}</strong><span>{t.sumida}</span></div><div className="stat-item"><strong>{t.haloviDuration}</strong><span>{t.halovi}</span></div><div className="stat-item"><strong>2</strong><span>{t.freelance}</span></div><div className="stats-end">{lang==="vi"?"PYTHON · ỨNG DỤNG · ERP / WMS":"PYTHON · APPLICATIONS · ERP / WMS"}</div>
    </div>
  </section>;
}

function HomePage({ lang }) {
  const t=text[lang];
  return <main id="main-content" className="home-page">
    <Hero lang={lang}/>
    <section className="home-focus">
      <div className="container home-focus-inner">
        <div><div className="section-kicker">{t.homeFocusKicker}</div><h2>{t.homeFocusTitle}</h2><p>{t.homeFocusText}</p></div>
        <div className="home-focus-links">
          <a href="#projects">{t.projects}<Icon name="arrow" size={16}/></a>
          <a href="#experience">{t.experience}<Icon name="arrow" size={16}/></a>
          <a href="#skills">{t.skills}<Icon name="arrow" size={16}/></a>
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
  const t=text[lang];
  const groups=[
    {n:"01",name:t.core,title:lang==="vi"?"Ứng dụng Python":"Python applications",desc:lang==="vi"?"Logic ứng dụng, triển khai quy trình, gỡ lỗi và xác thực từng bước.":"Application logic, workflow implementation, debugging and incremental validation.",tags:["Python","Flask","FastAPI","REST APIs"]},
    {n:"02",name:t.data,title:lang==="vi"?"Quy trình ERP / WMS":"ERP / WMS workflows",desc:lang==="vi"?"Yêu cầu nghiệp vụ, xử lý dữ liệu bằng SQL, quản lý thông tin tồn kho, kiểm tra dữ liệu và ghi nhận thay đổi trạng thái để có thể truy vết.":"Business requirements, SQL-backed workflows, inventory concepts, data checking and traceable state changes.",tags:["SQL","PostgreSQL","SQLAlchemy","WMS / FEMS"]},
    {n:"03",name:t.supporting,title:lang==="vi"?"Thị giác máy tính & OCR":"Computer Vision & OCR",desc:lang==="vi"?"Đã sử dụng trong các dự án trước đây để phát hiện, theo dõi đối tượng và trích xuất dữ liệu từ tài liệu. Đánh giá mô hình vẫn là lĩnh vực đang tiếp tục phát triển.":"Prior project use for object detection, tracking and document data extraction. Model evaluation remains a developing area.",tags:["YOLOv5","DeepSORT","OCR","Image processing"]}
  ];
  return <main id="main-content" className="inner-page page-section-page skills-page"><div className="container">
    <PageHeading index="01" kicker={t.skills} title={t.skillsTitle} intro={t.skillsPageIntro}/>
    <div className="skill-grid">{groups.map(g=><article className="skill-card" key={g.n}><div className="skill-top"><span>{g.n}</span><small>{g.name}</small></div><h3>{g.title}</h3><p>{g.desc}</p><div className="tag-list">{g.tags.map(tag=><span key={tag}>{displayTag(tag,lang)}</span>)}</div></article>)}</div>
    <p className="scope-note"><Icon name="check" size={17}/>{t.noOt}</p>
  </div></main>;
}function EducationSection({ lang }) {
  const t=text[lang];
  return <main id="main-content" className="inner-page page-section-page education-page"><div className="container">
    <PageHeading index="01" kicker={t.education} title={t.educationTitle} intro={t.educationPageIntro}/>
    <div className="education-grid">
      <article className="education-card"><div className="education-symbol">ED / 01</div><span className="history-type">{t.education}</span><h3>{t.degree}</h3><p>{lang==="vi"?"Trường Đại học Sư phạm Kỹ thuật – Đại học Đà Nẵng":"The University of Technology and Education — The University of Danang"}</p><div className="education-meta">09/2018 – 06/2023 <b>·</b> {t.viDegree}</div></article>
      <article className="education-card"><div className="education-symbol">RE / 02</div><span className="history-type">{t.researchLabel}</span><h3>IoT-Based Waste Management System for Hazardous Waste</h3><p>{t.publication}</p><div className="education-meta">{t.award}</div></article>
    </div>
  </div></main>;
}function ContactSection({ lang }) {
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
}function ProjectDetail({ project,lang }) {
  const t=text[lang];
  if(!project) return <NotFound lang={lang}/>;
  const labels={problem:t.problem,role:t.role,scope:t.scope,approach:t.approach,evidence:t.evidence,next:t.next};
  return <main id="main-content" className="inner-page detail-page"><div className="container">
    <a href={project.category==="backend"?"#projects/backend":"#projects/ai"} className="back-link">← {t.back}</a>
    <div className="detail-heading"><div className="section-kicker">{t.projectWord} / {project.number} <span>—</span> {project.category==="backend"?t.backend.toUpperCase():t.ai.toUpperCase()}</div>
      <div className="detail-title-row"><h1>{displayProjectTitle(project,lang)}</h1><Status status={project.status} lang={lang}/></div><p>{t[project.summaryKey]}</p>
      <div className="tag-list">{project.tags.map(tag=><span key={tag}>{displayTag(tag,lang)}</span>)}</div>
    </div>
    <Flow project={project} lang={lang}/>
    <div className="case-grid">{project.fields.map(([label,key])=><article className={"case-panel case-"+label} key={key}><span>{labels[label]}</span><p>{t[key]}</p></article>)}</div>
    <div className="detail-footer"><span>{t.technologies}</span><div className="tag-list">{project.tags.map(tag=><span key={tag}>{displayTag(tag,lang)}</span>)}</div><a className="text-link" href="#projects">{t.viewAll}<Icon name="arrow" size={16}/></a></div>
  </div></main>;
}

function AboutPage({ lang }) {
  const vi=lang==="vi";
  const journey=vi?[
    ["09/2018 – 06/2023","HỌC VẤN · XẾP LOẠI KHÁ","Kỹ sư Công nghệ Kỹ thuật Cơ điện tử","Đại học Sư phạm Kỹ thuật – Đại học Đà Nẵng. Chương trình đào tạo liên ngành là nền tảng để tôi tiếp cận lập trình C, IoT và các hệ thống kết hợp phần cứng với phần mềm."],
    ["05/2022 – 07/2022","THỰC TẬP TRONG MÔI TRƯỜNG CÔNG NGHIỆP","Thực tập sinh kỹ thuật Kaizen | Premo Vietnam","Sử dụng Python để trích xuất dữ liệu hiệu suất từ cảm biến công nghiệp qua Modbus RTU; đồng thời tham gia phân tích cụm lắp ráp cơ khí và kết cấu máy. Đây là trải nghiệm kết nối kiến thức cơ điện tử với việc thu thập, xử lý dữ liệu bằng phần mềm."],
    ["09/2022 – 12/2024","PHÁT TRIỂN PHẦN MỀM THEO DỰ ÁN","Thị giác máy tính và OCR","Thực hiện hai dự án tự do chính theo từng đợt, có khoảng trống giữa các lần làm việc: ứng dụng thị giác máy tính theo dõi giao nhận tại siêu thị và công cụ OCR trích xuất dữ liệu sổ đăng kiểm để nhập lên trang web Cảng Đà Nẵng. Halovi là hợp đồng thị giác máy tính riêng biệt kéo dài 5 tháng."],
    ["03/2024 – 08/2024","PHÁT TRIỂN ỨNG DỤNG","Kỹ sư nghiên cứu | Trường Đại học Sư phạm Kỹ thuật – Đại học Đà Nẵng","Phát triển trang web giáo dục, thiết kế và lắp ráp robot STEAM, tham gia xây dựng hoạt động học tập theo dự án."],
    ["02/2025 – 11/2026","PHẦN MỀM DOANH NGHIỆP","Trưởng nhóm kỹ thuật phát triển phần mềm | Sumida","Tham gia phát triển WMS và FEMS. Công việc tập trung vào yêu cầu nghiệp vụ, mô hình hóa quy trình, logic ứng dụng, phát triển chức năng, kiểm thử, sửa lỗi và hỗ trợ chạy thử."]
  ]:[
    ["09/2018 – 06/2023","EDUCATION · GOOD CLASSIFICATION","B.Eng. in Mechatronics Engineering Technology","The University of Technology and Education – The University of Danang. The interdisciplinary programme introduced me to C programming, IoT and systems combining hardware and software."],
    ["05/2022 – 07/2022","INDUSTRIAL EXPOSURE","Kaizen Engineer Intern | Premo Vietnam","Used Python to extract performance data from industrial sensors through Modbus RTU, and took part in analysing mechanical assemblies and machine structures. This internship connected my Mechatronics background with software-based data collection and processing."],
    ["09/2022 – 12/2024","PROJECT-BASED SOFTWARE DEVELOPMENT","Computer Vision and OCR","Completed two main freelance projects in separate engagements with gaps between them: a Computer Vision application for supermarket delivery monitoring and an OCR tool to extract vehicle-registration data for the Da Nang Port website. The Halovi engagement was a separate five-month Computer Vision contract."],
    ["03/2024 – 08/2024","APPLICATION DEVELOPMENT","Research Engineer | University of Technology and Education – The University of Danang","Developed educational websites, designed and assembled STEAM robots, and contributed to project-based learning activities."],
    ["02/2025 – 11/2026","ENTERPRISE SOFTWARE","Software Development Technical Team Lead | Sumida","Contributed to WMS and FEMS development. The work covered business requirements, workflow modelling, application logic, feature development, testing, defect resolution and trial deployment support."]
  ];
  const mindset=vi?[
    ["01","Phân tích quy trình và yêu cầu","Làm rõ yêu cầu với người dùng kho; phân tích các bước nghiệp vụ, dữ liệu đầu vào/đầu ra và điều kiện xử lý trước khi triển khai chức năng."],
    ["02","Chuyển yêu cầu thành logic phần mềm","Xác định cách ứng dụng xử lý dữ liệu và trạng thái nghiệp vụ; triển khai chức năng bằng Python và các công nghệ phù hợp để phát triển hệ thống phía máy chủ."],
    ["03","Kiểm chứng chức năng trong vận hành","Kiểm thử kết quả xử lý, xử lý lỗi và hỗ trợ chạy thử để bảo đảm chức năng đáp ứng quy trình sử dụng."]
  ]:[
    ["01","Workflow and requirements analysis","Clarify requirements with warehouse users; examine process steps, input/output data and processing conditions before implementing a feature."],
    ["02","Translate requirements into software logic","Define how the application processes data and business states, then implement features with Python and suitable backend technologies."],
    ["03","Validate features in operational use","Test processing results, resolve defects and support trial deployment to check that features meet workflow requirements."]
  ];
  const contributions=vi?[
    [t.areaMechatronics,"Nền tảng kỹ thuật liên ngành","Kiến thức nền về hệ thống cơ khí - điện tử, lập trình C, IoT và robot STEAM. Có trải nghiệm phân tích cụm lắp ráp, kết cấu máy trong kỳ thực tập; không trình bày đây là kinh nghiệm thiết kế hoặc vận hành dây chuyền tự động hóa."],
    [t.areaIndustrialData,"Thu thập dữ liệu thiết bị","Trong kỳ thực tập tại Premo, sử dụng Python đọc dữ liệu hiệu suất từ cảm biến công nghiệp qua Modbus RTU. Đây là trải nghiệm thực tập, không phải kinh nghiệm triển khai hệ thống SCADA/PLC."],
    [t.areaWmsFems,"Ứng dụng doanh nghiệp tại Sumida","Tham gia phát triển chức năng WMS và FEMS; với WMS là phân tích quy trình kho, logic xử lý và kiểm thử; với FEMS là xử lý dữ liệu, bảng điều khiển điện năng và tính toán chi phí điện."],
    [t.areaPython,"Phát triển ứng dụng và hệ thống phía máy chủ","Python là ngôn ngữ phát triển chính. Công việc và dự án đã sử dụng Python, Flask, SQL và PostgreSQL. FastAPI và SQLAlchemy được sử dụng trong RackFlow, dự án cá nhân đang phát triển."],
    [t.areaVision,"Thị giác máy tính và xử lý tài liệu","Kinh nghiệm đến từ hợp đồng 5 tháng tại Halovi và các dự án riêng: YOLOv5/DeepSORT để phát hiện, theo dõi hoạt động giao nhận qua video; OCR để trích xuất dữ liệu tài liệu và tự động nhập lên trang web."]
  ]:[
    [t.areaMechatronics,"Interdisciplinary engineering foundation","Foundation in mechanical/electrical systems, C programming, IoT and STEAM robotics. I also analysed mechanical assemblies and machine structures during my internship; this is not presented as hands-on production-line automation engineering."],
    [t.areaIndustrialData,"Equipment data acquisition","During my internship at Premo, I used Python to read performance data from industrial sensors through Modbus RTU. This was internship experience, not SCADA/PLC system deployment."],
    [t.areaWmsFems,"Enterprise applications at Sumida","Contributed to WMS and FEMS features. WMS work involved warehouse workflows, application logic and testing; FEMS work involved data processing, an electricity dashboard and cost calculations."],
    [t.areaPython,"Application and backend development","Python is my primary programming language. Work and project experience includes Python, Flask, SQL and PostgreSQL. FastAPI and SQLAlchemy are used in RackFlow, a portfolio project in development."],
    [t.areaVision,"Visual recognition and document processing","Experience from a five-month Computer Vision contract at Halovi and separate projects: YOLOv5/DeepSORT for video-based delivery tracking, and OCR for document extraction and website data entry."]
  ];
  return <main id="main-content" className="inner-page about-page"><div className="container">
    <PageHeading index="01" kicker={t.aboutWho} title={vi?"Từ Cơ điện tử đến kỹ sư phần mềm Python cho hệ thống doanh nghiệp.":"From Mechatronics to Python software engineering for business systems."} intro={vi?"Nền tảng Cơ điện tử giúp tôi tiếp cận thiết bị, cảm biến và quy trình sản xuất. Tôi bắt đầu kết nối nền tảng đó với phần mềm qua lập trình C, IoT và việc dùng Python thu thập dữ liệu cảm biến công nghiệp trong kỳ thực tập. Sau đó, tôi chuyển trọng tâm sang phát triển ứng dụng: thị giác máy tính, OCR, rồi các hệ thống nghiệp vụ WMS và FEMS. Hiện tại, chuyên môn chính của tôi là phát triển phần mềm Python và ứng dụng doanh nghiệp; không phải kỹ sư điều khiển PLC/SCADA.": "My Mechatronics background introduced me to equipment, sensors and production processes. I began connecting that foundation with software through C programming, IoT and Python-based industrial sensor data extraction during my internship. I then moved toward application development: Computer Vision, OCR and enterprise systems such as WMS and FEMS. My current focus is Python software and business applications, rather than PLC/SCADA control engineering."}/>

    <section className="about-block about-journey">
      <div className="about-block-heading"><span>{t.aboutJourney}</span><h2>{vi?"Mạch chuyên môn: từ hệ thống cơ điện tử đến hệ thống phần mềm":"The progression: from mechatronic systems to software systems"}</h2><p>{vi?"Quá trình chuyển hướng diễn ra qua những trải nghiệm cụ thể với cảm biến, dữ liệu, ứng dụng và phần mềm phục vụ vận hành.":"The transition took shape through practical exposure to sensors, data, applications and software used in operations."}</p></div>
      <div className="about-journey-list">{journey.map(item=><article className="about-journey-item" key={item[0]+item[2]}><div className="about-journey-meta"><time>{item[0]}</time><span>{item[1]}</span></div><div className="about-journey-content"><h3>{item[2]}</h3><p>{item[3]}</p></div></article>)}</div>
    </section>

    <section className="about-block about-mindset">
      <div className="about-block-heading"><span>{t.aboutMindset}</span><h2>{vi?"Kết nối quy trình vận hành với logic phần mềm":"Connecting operational workflows with software logic"}</h2><p>{vi?"Kinh nghiệm Cơ điện tử giúp tôi chú ý đến thiết bị, dữ liệu và điều kiện vận hành; kinh nghiệm WMS giúp tôi chuyển góc nhìn đó sang yêu cầu và chức năng phần mềm.":"My Mechatronics exposure made me attentive to equipment, data and operating conditions; WMS development extended that perspective to software requirements and application features."}</p></div>
      <div className="about-mindset-grid">{mindset.map(item=><article key={item[0]}><span>{item[0]}</span><h3>{item[1]}</h3><p>{item[2]}</p></article>)}</div>
    </section>

    <section className="about-block about-bring">
      <div className="about-block-heading"><span>{t.aboutBring}</span><h2>{vi?"Nền tảng Cơ điện tử kết hợp kinh nghiệm phát triển phần mềm":"Mechatronics foundation combined with software experience"}</h2><p>{vi?"Tôi có thể làm việc ở giao điểm giữa bối cảnh kỹ thuật nhà máy, dữ liệu thiết bị và ứng dụng nghiệp vụ, với phạm vi kinh nghiệm được nêu rõ theo từng môi trường.":"I bring exposure to factory engineering contexts and equipment data, combined with business-application development. The scope of each experience is stated by its actual work context."}</p></div>
      <div className="about-bring-grid">{contributions.map(item=><article key={item[0]}><span>{item[0]}</span><h3>{item[1]}</h3><p>{item[2]}</p></article>)}</div>
    </section>

    <section className="about-block about-direction">
      <div className="about-block-heading"><span>{t.aboutDirection}</span><h2>{vi?"Kỹ sư phần mềm doanh nghiệp, có hiểu biết về môi trường sản xuất":"Enterprise software engineer with an understanding of manufacturing environments"}</h2></div>
      <div className="about-direction-content">
        <p className="about-direction-lead">{vi?"Tôi muốn phát triển theo hướng kỹ sư phần mềm chuyên về ứng dụng doanh nghiệp và hệ thống phục vụ vận hành sản xuất. Điểm khác biệt tôi muốn xây dựng là kết hợp nền tảng Cơ điện tử - hiểu thiết bị, dữ liệu và quy trình nhà máy - với năng lực phát triển hệ thống phía máy chủ bằng Python và tích hợp hệ thống.":"I aim to develop as a software engineer specialising in enterprise applications and systems that support manufacturing operations. I want to combine my Mechatronics foundation—understanding equipment, data and factory workflows—with stronger Python backend and system-integration skills."}</p>
        <div className="about-direction-stages">
          <div><span>{vi?"TRỌNG TÂM KỸ THUẬT":"TECHNICAL FOCUS"}</span><p>{vi?"Phát triển hệ thống phía máy chủ bằng Python, thiết kế API, cơ sở dữ liệu quan hệ, xử lý giao dịch, kiểm thử tự động và tích hợp hệ thống.":"Python backend engineering, API design, relational databases, transaction handling, automated testing and system integration."}</p></div>
          <div><span>{vi?"PHẠM VI PHÁT TRIỂN":"SCOPE TO GROW INTO"}</span><p>{vi?"Thiết kế và phát triển các mô-đun nghiệp vụ có tính liên kết; cải thiện tính nhất quán dữ liệu, khả năng truy vết và độ tin cậy của ứng dụng.":"Design and develop interconnected business modules, improving data consistency, traceability and application reliability."}</p></div>
          <div><span>{vi?"ĐỊNH HƯỚNG DÀI HẠN":"LONG-TERM DIRECTION"}</span><p>{vi?"Tích hợp AI và thị giác máy tính vào hệ thống doanh nghiệp khi phù hợp với bài toán, chẳng hạn trích xuất chứng từ, kiểm tra dữ liệu và hỗ trợ quy trình sản xuất - kho vận.":"Integrate AI and Computer Vision into enterprise systems where they fit the problem, such as document extraction, data validation and support for manufacturing and warehouse workflows."}</p></div>
        </div>
      </div>
    </section>
    <p className="scope-note"><Icon name="check" size={17}/>{vi?"Kinh nghiệm Modbus RTU chỉ giới hạn ở kỳ thực tập tại Premo. Tôi không trình bày PLC, SCADA hoặc hệ thống điều khiển công nghiệp như kinh nghiệm triển khai chuyên nghiệp.":"Modbus RTU experience is limited to my internship at Premo. I do not present PLC, SCADA or industrial control systems as professional deployment experience."}</p>
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

function resolvePortfolioRoute() {
  const hashRoute=window.location.hash
    .slice(1)
    .replace(/^\/+|\/+$/g,"")
    .split("?")[0];
  return hashRoute || "home";
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
      const vi=this.props.lang==="vi";
      return <main className="inner-page page-error-state" role="alert">
        <div className="container">
          <div className="section-kicker">{this.props.lang==="vi"?text.vi.pageRenderError:text.en.pageRenderError}</div>
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

function App() {
  const [lang,setLang]=useState(()=>window.localStorage.getItem("portfolio-language")==="vi"?"vi":"en");
  const [route,setRoute]=useState(()=>resolvePortfolioRoute());
  useEffect(()=>{
    const change=()=>{setRoute(resolvePortfolioRoute());window.scrollTo({top:0,behavior:"auto"});};
    window.addEventListener("hashchange",change);
    if(!window.location.hash) window.location.hash="home";
    return ()=>window.removeEventListener("hashchange",change);
  },[]);
  useEffect(()=>{
    window.localStorage.setItem("portfolio-language",lang);
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
    document.title=selected?displayProjectTitle(selected,lang)+" | Minh Phat":(sectionTitles[route]||(lang==="vi"?"Minh Phat | Kỹ sư ứng dụng Python":"Tran Viet Minh Phat | Python Application Engineer"));
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
  return <><a className="skip-link" href="#main-content">{text[lang].skipToContent}</a><Header lang={lang} setLang={setLang} route={route}/><RenderErrorBoundary lang={lang}>{content}</RenderErrorBoundary><Footer lang={lang}/></>;
}

createRoot(document.getElementById("root")).render(<React.StrictMode><App/></React.StrictMode>);