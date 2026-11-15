import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { readStoredLanguage, writeStoredLanguage } from "./storage.js";
import { buildPortfolioAnchorHash, isCurrentPortfolioAnchor, isUnmodifiedPrimaryClick, parsePortfolioHash } from "./routing.js";
import "./styles.css";

const text = {
  en: {
    home:"Home", projects:"Projects", all:"All projects", ai:"AI", backend:"Backend", experience:"Experience", about:"About me", contact:"Contact",
    projectsPageIntro:"Các dự án và hệ thống tôi đã thực hiện. Mỗi trang chi tiết đi sâu hơn vào bài toán và cách tôi triển khai.",
    experiencePageIntro:"Những công việc, dự án và môi trường kỹ thuật đã góp phần hình thành kinh nghiệm của tôi.",
    skillsPageIntro:"Các công nghệ tôi sử dụng và những dạng bài toán tôi muốn tiếp tục phát triển.",
    educationPageIntro:"Nền tảng đào tạo kỹ thuật, hoạt động nghiên cứu và các dấu mốc học thuật.",
    aboutPageIntro:"Tôi bắt đầu từ ngành Cơ điện tử và tìm thấy hướng đi của mình trong phát triển phần mềm phục vụ vận hành.",
    contactPageIntro:"Trao đổi về cơ hội IT Staff, ERP Support, phát triển Python và ứng dụng nghiệp vụ.",
    homeFocusKicker:"ĐIỀU TÔI QUAN TÂM",
    homeFocusTitle:"Phần mềm nên giúp công việc rõ ràng và dễ làm hơn.",
    homeFocusText:"Tôi thích tìm hiểu cách một công việc đang diễn ra trước khi viết code. Đó là lúc cần lắng nghe người trực tiếp sử dụng hệ thống, theo dõi dữ liệu qua từng bước và xây dựng chức năng giúp quy trình dễ quản lý hơn.",
    eyebrow:"IT STAFF / ERP SUPPORT · QUẢNG NGÃI", regionLabel:"QUANG NGAI, VIETNAM",
    headlineA:"Xin chào, tôi là Phát.", headlineB:"Tôi làm phần mềm từ quy trình thực tế.",
    heroRole:"Python · WMS / FEMS · Ứng dụng nghiệp vụ",
    intro:"Tôi có 1 năm 10 tháng tham gia phát triển WMS và FEMS tại Sumida. Tôi làm việc với người dùng kho, chuyển các bước vận hành thành logic ứng dụng, phát triển và kiểm thử chức năng, đồng thời xử lý lỗi phát sinh. Trước đó, tôi thực hiện các dự án Computer Vision, OCR và dữ liệu công nghiệp. Hiện tại, tôi tập trung vào Python và ứng dụng nghiệp vụ.",
    explore:"See my work", getInTouch:"Get in touch",
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
    employment:"EMPLOYMENT & CONTRACT", earlier:"PROJECT-BASED & EARLIER EXPERIENCE",
    skills:"KỸ NĂNG", skillsTitle:"Công nghệ tôi sử dụng để biến yêu cầu thành phần mềm hoạt động.",
    skillsIntro:"Kết hợp giữa phát triển phần mềm, quy trình nghiệp vụ và nền tảng kỹ thuật ứng dụng.",
    core:"PHÁT TRIỂN PHẦN MỀM", data:"DỮ LIỆU & QUY TRÌNH NGHIỆP VỤ", supporting:"KỸ THUẬT ỨNG DỤNG",
    education:"EDUCATION", educationTitle:"Nơi hành trình kỹ thuật của tôi bắt đầu.",
    contactTitle:"Cùng trao đổi về phần mềm và công việc mà nó hỗ trợ.",
    contactText:"Tôi quan tâm đến các vị trí IT Staff / ERP Support, phát triển Python và ứng dụng nghiệp vụ cho môi trường sản xuất, kho vận và vận hành.",
    email:"Email", linkedin:"LinkedIn", github:"GitHub profile",
    problem:"Bài toán", role:"Phần việc của tôi", approach:"Cách triển khai", scope:"Chức năng chính",
    evidence:"Trạng thái dự án", next:"Hướng phát triển tiếp theo", technologies:"TECHNOLOGIES", videoShowcaseLabel:"VIDEO DEMO · YOUTUBE", videoShowcaseTitle:"Model demonstration", videoPlaceholderTitle:"YouTube demo will appear here", videoPlaceholderText:"A 16:9 video space is reserved. Add a YouTube URL to the youtubeUrl field in the fabric project entry to display the video.", videoFrameTitle:"Fabric defect inspection demo", back:"Back to projects",
    noOt:"Industrial OT/IT technologies such as Siemens S7, SCADA, MQTT and OPC UA are not presented as hands-on professional experience.",
    sumidaRole:"Software Development Technical Team Lead",
    sumidaWms:"WMS: clarified requirements with warehouse users, analysed workflows, implemented application logic, tested features, fixed defects and supported trial deployment.",
    sumidaFems:"FEMS: contributed to data-processing functions, an electricity-monitoring dashboard and electricity-cost calculations.",
    haloviRole:"Computer Vision Engineer",
    haloviText:"Làm việc với vai trò Computer Vision Engineer trong hợp đồng 5 tháng, tham gia phát triển các thành phần thị giác máy tính.",
    freelanceText:"Thực hiện hai dự án phần mềm chính: theo dõi giao nhận tại siêu thị qua video và tự động hóa nhập liệu bằng OCR cho Cảng Đà Nẵng.",
    uniRole:"Research Engineer",
    uniText:"Developed educational websites, designed and assembled STEAM robot systems, and contributed to project-based learning activities.",
    premoRole:"Kaizen Engineer Intern",
    premoText:"Sử dụng Python để thu thập dữ liệu hiệu suất từ cảm biến công nghiệp qua Modbus RTU, đồng thời tham gia phân tích quy trình lắp ráp.",
    freelanceType:"Dự án phần mềm độc lập", research:"Nghiên cứu & giáo dục", internship:"Thực tập kỹ thuật",
    degree:"B.Eng. in Mechatronics Engineering Technology",
    publication:"Co-author of “Building An IoT-Based Waste Management System for Hazardous Waste,” REC-ECIT 2023, pp. 193–198.",
    award:"Encouragement Prize, Student Science and Technology Awards at Higher Education Institutions (2023); Second Prize, Da Nang City Student Scientific Research Competition (2022).",
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
    fabricBlogToc:"IN THIS ARTICLE",
    fabricBlogChallengeTitle:"Starting with the inspection problem",
    fabricBlogChallengeP1:"Lỗi trên bề mặt vải có thể ảnh hưởng đến ngoại quan và chất lượng vật liệu dùng trong sản xuất sofa. Với dự án này, tôi muốn mô hình không chỉ phân loại ảnh mà còn xác định vị trí lỗi và gán đúng nhóm lỗi tương ứng.",
    fabricBlogChallengeP2:"Vì vậy, object detection là lựa chọn phù hợp. Giao diện trình bày kết quả dự đoán để người xem có thể quan sát vị trí và nhãn lỗi trên ảnh.",
    fabricBlogModelTitle:"Choosing a model that fits the constraints",
    fabricBlogModelP1:"Tôi chọn Faster R-CNN với backbone MobileNetV3-FPN. Các ràng buộc của dự án đưa tôi đến một hướng detection khác với Ultralytics/YOLO11n, phù hợp để huấn luyện và đánh giá trong môi trường hiện có.",
    fabricBlogModelP2:"Quy trình triển khai gồm chuẩn bị ảnh đã gán nhãn, huấn luyện detector, xem xét kết quả validation và đưa dự đoán ra giao diện suy luận ảnh.",
    fabricBlogSetupTitle:"Setting up repeatable experiments",
    fabricBlogSetupP1:"Tôi huấn luyện và đánh giá mô hình trên Google Colab với GPU T4. Trong thử nghiệm E1, tôi chạy validation với ba random seed để so sánh độ ổn định giữa các lần chạy.",
    fabricBlogSetupP2:"Ba kết quả mAP50–95 trên tập validation lần lượt là 0.412, 0.412 và 0.426. Các giá trị khá gần nhau, cung cấp một góc nhìn về tính lặp lại trong thử nghiệm này.",
    fabricBlogInterfaceTitle:"Turning predictions into something people can inspect",
    fabricBlogInterfaceP1:"Luồng demo được giữ đơn giản: tải ảnh vải lên, chạy suy luận, quan sát bounding box và nhãn lỗi, sau đó truy cập dữ liệu JSON có cấu trúc.",
    fabricBlogInterfaceP2:"Mỗi dự đoán gồm một trong chín nhãn lỗi tiếng Việt và raw model score từ 0 đến 1. Score được hiển thị như đầu ra mô hình, tách biệt với xác suất đã hiệu chuẩn.",
    fabricBlogLimitsTitle:"Reading the results without overclaiming",
    fabricBlogLimitsP1:"Các số liệu E1 đến từ tập validation sử dụng trong quá trình phát triển. Bước đánh giá tiếp theo là thử nghiệm trên nguồn ảnh vải, điều kiện ánh sáng và camera độc lập.",
    fabricBlogLimitsP2:"Việc xem xét precision, recall theo từng lớp và các lỗi bỏ sót sẽ giúp xác định rõ hơn điểm mạnh của mô hình cũng như những phần cần cải thiện trong dữ liệu hoặc thuật toán.",
    fabricBlogNextTitle:"What I would test next",
    fabricBlogNextP1:"Tôi dự định đánh giá detector trên các ảnh vải độc lập và kiểm tra false positive, missed defect tiêu biểu theo từng nhóm lỗi.",
    fabricBlogNextP2:"Tôi cũng sẽ đánh giá score calibration trước khi sử dụng confidence threshold trong quy trình có người kiểm tra.",
    fabricBlogMetricsLabel:"VALIDATION · E1 · THREE SEEDS",
    fabricBlogMetricName:"mAP50–95",
    fabricBlogMetricNote:"Tập validation E1 · ba random seed",
    fabricBlogTechTitle:"Experiment setup",
    fabricBlogTechModel:"Detector",
    fabricBlogTechBackbone:"Backbone",
    fabricBlogTechRuntime:"Training environment",
    fabricBlogTechTask:"Task",
    fabricBlogTaskValue:"Object detection · bounding boxes",
    fabricBlogClosing:"Dự án kết hợp phát triển mô hình, đánh giá có thể lặp lại và giao diện suy luận ảnh. Giai đoạn tiếp theo là mở rộng kiểm thử trên dữ liệu vải độc lập.",
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
    projectsPageIntro:"Xem các dự án theo lĩnh vực kỹ thuật, sau đó mở trang chi tiết để tìm hiểu phạm vi thực hiện và bằng chứng.",
    experiencePageIntro:"Công việc chính thức, hợp đồng có thời hạn, các dự án tự do thực hiện theo từng đợt và trải nghiệm kỹ thuật trước đó được phân loại riêng.",
    skillsPageIntro:"Tổng quan về công nghệ và lĩnh vực đã được sử dụng trong công việc, hợp đồng và dự án. Không dùng thang điểm phần trăm hoặc tự nhận mức độ thành thạo khi chưa có căn cứ.",
    educationPageIntro:"Quá trình đào tạo kỹ thuật và hoạt động nghiên cứu có thông tin xác nhận.",
    aboutPageIntro:"Tư duy nghề nghiệp của tôi kết hợp góc nhìn hệ thống, thiết kế giải pháp và cải tiến liên tục.",
    contactPageIntro:"Trao đổi cơ hội IT Staff / ERP Support, hỗ trợ ứng dụng doanh nghiệp, phát triển Python, hệ thống ERP/WMS và backend.",
    homeFocusKicker:"CÁCH TÔI TIẾP CẬN CÔNG VIỆC",
    homeFocusTitle:"Tôi bắt đầu bằng việc hiểu quy trình.",
    homeFocusText:"Trước khi thay đổi phần mềm, tôi muốn hiểu người dùng đang thao tác thế nào, dữ liệu đi qua những bước nào và lỗi xuất hiện ở đâu. Sau đó tôi chuyển quy trình thành logic ứng dụng, kiểm thử hành vi mong đợi và xử lý các lỗi phát sinh.",
    eyebrow:"HỒ SƠ CÁ NHÂN · IT STAFF / ERP SUPPORT", regionLabel:"QUẢNG NGÃI, VIỆT NAM",
    headlineA:"Xin chào, tôi là Phát.", headlineB:"IT Staff / ERP Support",
    heroRole:"Python · WMS / FEMS · Ứng dụng nghiệp vụ",
    intro:"Tôi có 1 năm 10 tháng tham gia phát triển WMS và FEMS tại Sumida. Công việc gồm làm rõ yêu cầu với bộ phận kho, chuyển quy trình thành logic xử lý, kiểm thử chức năng và sửa lỗi. Tôi đang tìm cơ hội IT Staff / ERP Support để tiếp tục phát triển và hỗ trợ các ứng dụng nghiệp vụ.",
    explore:"Xem các dự án của tôi", getInTouch:"Liên hệ",
    personalNoteLabel:"ĐÔI NÉT VỀ TÔI", personalNoteTitle:"Từ Cơ điện tử đến phần mềm nghiệp vụ.",
    personalNoteText:"Tôi tốt nghiệp ngành Công nghệ Kỹ thuật Cơ điện tử tại Đại học Sư phạm Kỹ thuật – Đại học Đà Nẵng. Nền tảng này giúp tôi tiếp cận lập trình, dữ liệu công nghiệp và các ứng dụng phục vụ công việc.",
    personalFact1Label:"NỀN TẢNG", personalFact1Title:"Công nghệ Kỹ thuật Cơ điện tử", personalFact1Meta:"ĐH Sư phạm Kỹ thuật – ĐH Đà Nẵng · Xếp loại Khá",
    personalFact2Label:"CÁCH LÀM VIỆC", personalFact2Title:"Hiểu quy trình → xây dựng logic → kiểm thử", personalFact2Meta:"Bắt đầu từ quy trình thực tế và kết quả cần đạt",
    personalFact3Label:"DỰ ÁN CÁ NHÂN", personalFact3Title:"RackFlow — Mini ERP / WMS", personalFact3Meta:"Đang phát triển",
    experienceStripLabel:"HÀNH TRÌNH KINH NGHIỆM", experienceStripIntro:"Một vài mốc công việc và dự án của tôi.",
    sumidaPeriod:"02/2025 – 11/2026", sumidaStripText:"WMS & FEMS · 1 năm 10 tháng",
    haloviPeriod:"11/2023 – 03/2024", haloviStripText:"Computer Vision · hợp đồng 5 tháng",
    freelancePeriod:"09/2022 – 12/2024", freelanceStripText:"Hai dự án freelance chính · thực hiện không liên tục",
    homeWorkKicker:"DỰ ÁN TIÊU BIỂU", homeWorkTitle:"Một vài dự án tôi đã thực hiện.",
    homeWorkIntro:"Gồm công việc tại doanh nghiệp, các dự án độc lập và một dự án cá nhân đang phát triển. Mỗi trang chi tiết nêu rõ vai trò, phạm vi và trạng thái thực tế.",
    homeWorkMore:"Xem tất cả dự án",
    personalAboutLink:"Về tôi", personalExperienceLink:"Kinh nghiệm", personalSkillsLink:"Kỹ năng",
    footer:"Cảm ơn bạn đã ghé xem hồ sơ và các dự án của tôi.",
    selected:"DỰ ÁN TIÊU BIỂU", featuredTitle:"Dự án có bài toán, phạm vi và trạng thái rõ ràng.",
    featuredIntro:"Hồ sơ năng lực phân biệt kinh nghiệm công việc, dự án đã thực hiện theo từng đợt và phần đang phát triển.",
    seeCase:"Xem chi tiết dự án", viewAll:"Xem tất cả dự án", inProgress:"Đang phát triển", past:"Dự án đã thực hiện", prototype:"Nguyên mẫu thử nghiệm", planned:"Dự kiến thử nghiệm",
    domains:"NHÓM DỰ ÁN", domainsTitle:"Một hướng chính, hai nhánh chuyên môn.",
    domainsIntro:"Dự án là danh mục chính, gồm hai nhánh chuyên môn: AI và Backend.",
    backendDesc:"Dịch vụ Python, quy tắc nghiệp vụ, lưu trữ dữ liệu và quy trình kho. RackFlow là dự án cá nhân đang phát triển.",
    aiDesc:"Các dự án về phát hiện và theo dõi đối tượng qua video, OCR hỗ trợ nhập liệu tài liệu, cùng nguyên mẫu phát hiện lỗi vải được đánh giá bằng Faster R-CNN.",
    experienceTitle:"Kinh nghiệm với phạm vi thực tế được phân định.",
    experienceIntro:"Công việc chính thức, hợp đồng có thời hạn, dự án tự do không liên tục, hoạt động nghiên cứu – giáo dục và kỳ thực tập được trình bày riêng.",
    employment:"CÔNG VIỆC & HỢP ĐỒNG", earlier:"DỰ ÁN TỰ DO & KINH NGHIỆM TRƯỚC ĐÓ",
    skills:"NĂNG LỰC", skillsTitle:"Công nghệ và lĩnh vực có thể trình bày bằng bằng chứng.",
    skillsIntro:"Không dùng thanh phần trăm để tự đánh giá kỹ năng. Các nhóm thể hiện công nghệ gắn với công việc được mô tả.",
    core:"NỀN TẢNG CHÍNH", data:"DỮ LIỆU & QUY TRÌNH", supporting:"KINH NGHIỆM BỔ TRỢ",
    education:"HỌC VẤN", educationTitle:"Nền tảng kỹ thuật.",
    contactTitle:"Bạn có quy trình vận hành cần cải thiện?",
    contactText:"Tôi quan tâm đến các vị trí IT Staff / ERP Support, hỗ trợ ứng dụng doanh nghiệp, phát triển Python, ERP/WMS và backend. Computer Vision và OCR là kinh nghiệm dự án bổ trợ.",
    email:"Email", linkedin:"LinkedIn", github:"GitHub cá nhân",
    problem:"Bài toán & mục tiêu", role:"Vai trò cá nhân", approach:"Giải pháp & triển khai", scope:"Phạm vi",
    evidence:"Bằng chứng & giới hạn", next:"Bước tiếp theo", technologies:"CÔNG NGHỆ SỬ DỤNG", videoShowcaseLabel:"VIDEO MINH HỌA · YOUTUBE", videoShowcaseTitle:"Trình diễn mô hình", videoPlaceholderTitle:"Vị trí video YouTube", videoPlaceholderText:"Đã chừa khung video tỷ lệ 16:9. Thêm URL YouTube vào trường youtubeUrl trong mục dự án Fabric để hiển thị video.", videoFrameTitle:"Video trình diễn mô hình phát hiện lỗi vải", back:"Quay lại danh mục dự án",
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
    award:"Giải Khuyến khích Giải thưởng Khoa học và Công nghệ sinh viên tại các cơ sở giáo dục đại học (2023); Giải Nhì Cuộc thi Nghiên cứu khoa học sinh viên TP. Đà Nẵng (2022).",
    rackSummary:"Ứng dụng vận hành kho tập trung vào nhập kho, tra cứu tồn, tra cứu đơn, giữ tồn và lịch sử thay đổi có thể truy vết.",
    cvSummary:"Quy trình thị giác máy tính thực hiện theo dự án, sử dụng video để phát hiện và theo dõi hoạt động giao nhận tại siêu thị.",
    ocrSummary:"Quy trình thực hiện theo dự án, trích xuất thông tin từ hồ sơ kiểm định phương tiện và nhập dữ liệu vào trang web.",
    fabricSummary:"Nguyên mẫu phát hiện lỗi bề mặt vải sử dụng Faster R-CNN với backbone MobileNetV3-FPN, có thử nghiệm validation và giao diện suy luận ảnh. Chưa nằm trong phạm vi triển khai tại nhà máy.",
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
    fabricProblem:"Xây dựng bộ phát hiện có thể tái lập để định vị lỗi nhìn thấy trên ảnh vải, ở phạm vi nguyên mẫu hỗ trợ kiểm tra chứ không tự động quyết định chất lượng xuất xưởng.",
    fabricRole:"Tự phát triển thử nghiệm từ lựa chọn mô hình đến huấn luyện, validation và giao diện suy luận ảnh. Triển khai theo hướng Faster R-CNN, không sử dụng stack Ultralytics/YOLO.",
    fabricScope:"Tải ảnh vải lên và nhận về bounding box dự đoán, một trong chín nhãn lỗi tiếng Việt, model score (0–1) và dữ liệu JSON. Score được ghi rõ là đầu ra của mô hình, chưa phải xác suất đã hiệu chuẩn.",
    fabricApproach:"Faster R-CNN với backbone MobileNetV3-FPN, huấn luyện và đánh giá trên Google Colab bằng GPU T4. Dự án sử dụng quy trình validation có thể tái lập và thử nghiệm nhiều seed.",
    fabricEvidence:"Kết quả validation E1, mAP50–95 trên ba seed: 0.412 / 0.412 / 0.426. Đây là kết quả trên tập validation; khả năng tổng quát hóa ngoài phân phối (OOD) chưa được xác lập. Model score chưa hiệu chuẩn; chưa có triển khai nhà máy hoặc KPI sản xuất.",
    fabricNext:"Đánh giá trên ảnh vải độc lập ngoài phân phối, xem xét precision/recall theo từng lớp và các trường hợp dự đoán sai; kiểm tra hiệu chuẩn score trước khi cân nhắc đưa vào quy trình nhà máy.",
    fabricBlogKicker:"NHẬT KÝ KỸ THUẬT · THỊ GIÁC MÁY TÍNH",
    fabricBlogLead:"Xây dựng bộ phát hiện lỗi bề mặt vải bằng Faster R-CNN, sau đó đưa kết quả dự đoán vào giao diện suy luận ảnh. Bài viết ghi lại các quyết định kỹ thuật, thử nghiệm validation và những giới hạn cần được nhìn nhận đúng.",
    fabricImageAlt:"Bốn mẫu bề mặt vải minh họa gồm kết cấu dệt, sợi bất thường, vùng đổi màu và một lỗ nhỏ cục bộ.",
    fabricImageCaption:"Hình minh họa bề mặt vải. Hình ảnh giúp giải thích bối cảnh kiểm tra, không phải ảnh từ tập dữ liệu huấn luyện và không phải kết quả dự đoán của mô hình.",
    fabricBlogToc:"NỘI DUNG BÀI VIẾT",
    fabricBlogChallengeTitle:"Bắt đầu từ bài toán kiểm tra vải",
    fabricBlogChallengeP1:"Lỗi bề mặt vải có thể ảnh hưởng đến vật liệu dùng trong sản xuất sofa. Bài toán thị giác máy tính ở dự án này không chỉ là phân loại một ảnh tốt hay xấu: mô hình cần xác định vị trí lỗi nhìn thấy được và gán nó vào một nhóm lỗi.",
    fabricBlogChallengeP2:"Vì vậy, định vị đối tượng là phần cốt lõi của nguyên mẫu. Kết quả hướng đến việc hỗ trợ người kiểm tra, không phải tự động quyết định chất lượng xuất xưởng hoặc một hệ thống đã tích hợp vào nhà máy.",
    fabricBlogModelTitle:"Chọn mô hình theo các ràng buộc kỹ thuật",
    fabricBlogModelP1:"Tôi chọn Faster R-CNN với backbone MobileNetV3-FPN. Ràng buộc của dự án loại trừ hướng AGPL/Ultralytics/YOLO11n, do đó phần triển khai sử dụng một stack phát hiện đối tượng khác.",
    fabricBlogModelP2:"Lựa chọn này giữ phạm vi ở một pipeline detection quen thuộc: chuẩn bị ảnh đã gán nhãn, huấn luyện mô hình, kiểm tra hành vi trên validation và đưa dự đoán ra giao diện suy luận nhỏ. Đây là quyết định phù hợp với thử nghiệm hiện tại, không phải khẳng định một mô hình luôn tốt nhất cho mọi bài toán.",
    fabricBlogSetupTitle:"Thiết lập thực nghiệm có thể đối chiếu",
    fabricBlogSetupP1:"Quá trình huấn luyện và đánh giá được thực hiện trên Google Colab với GPU T4. Ở thử nghiệm E1, tôi kiểm tra validation qua nhiều seed thay vì dựa vào một lần chạy duy nhất.",
    fabricBlogSetupP2:"Ba kết quả validation mAP50–95 lần lượt là 0.412, 0.412 và 0.426. Các lần chạy khá gần nhau, cung cấp một kiểm tra về dao động giữa các lần chạy trong cùng cấu hình; kết quả này không chứng minh hiệu năng trên nhà máy, camera hoặc loại vải chưa xuất hiện trong dữ liệu.",
    fabricBlogInterfaceTitle:"Đưa kết quả dự đoán thành giao diện có thể kiểm tra",
    fabricBlogInterfaceP1:"Luồng demo được giữ đơn giản: tải ảnh vải lên, chạy suy luận, xem bounding box và nhãn lỗi dự đoán, sau đó truy cập dữ liệu JSON có cấu trúc.",
    fabricBlogInterfaceP2:"Giao diện hiển thị một trong chín nhãn lỗi tiếng Việt và raw model score từ 0 đến 1 cho mỗi dự đoán. Đây là điểm số đầu ra của mô hình, chưa được hiệu chuẩn và không được hiểu là xác suất đã xác minh dự đoán đó đúng.",
    fabricBlogLimitsTitle:"Đọc kết quả mà không suy diễn quá mức",
    fabricBlogLimitsP1:"Các con số được báo cáo đến từ tập validation của thử nghiệm E1, không phải kết quả trên tập kiểm tra độc lập bên ngoài. Đánh giá ngoài phân phối (OOD) chưa hoàn tất; khả năng tổng quát hóa sang nguồn vải, điều kiện ánh sáng hoặc camera sản xuất khác hiện vẫn chưa rõ.",
    fabricBlogLimitsP2:"Nguyên mẫu cũng chưa chứng minh được tốc độ xử lý theo dây chuyền, mức độ chấp nhận của người vận hành, tỷ lệ bỏ sót lỗi hay khoản tiết kiệm sản xuất có thể đo lường. Không tuyên bố đã triển khai tại nhà máy.",
    fabricBlogNextTitle:"Những gì cần kiểm tra tiếp theo",
    fabricBlogNextP1:"Giai đoạn tiếp theo là đánh giá trên ảnh vải độc lập nằm ngoài phân phối validation hiện tại, xem precision và recall theo từng nhóm lỗi, đồng thời ghi nhận các trường hợp dự đoán nhầm và bỏ sót tiêu biểu.",
    fabricBlogNextP2:"Tôi cũng sẽ đánh giá calibration của score trước khi sử dụng ngưỡng confidence trong quy trình có người kiểm tra. Chỉ sau các bước đó mới nên đánh giá khả năng tích hợp vào quy trình kiểm tra thực tế.",
    fabricBlogMetricsLabel:"VALIDATION · E1 · BA SEED",
    fabricBlogMetricName:"mAP50–95",
    fabricBlogMetricNote:"Chỉ trên tập validation · không phải external test",
    fabricBlogTechTitle:"Cấu hình thực nghiệm",
    fabricBlogTechModel:"Mô hình phát hiện",
    fabricBlogTechBackbone:"Backbone",
    fabricBlogTechRuntime:"Môi trường huấn luyện",
    fabricBlogTechTask:"Bài toán",
    fabricBlogTaskValue:"Phát hiện đối tượng · bounding box",
    fabricBlogClosing:"Đây là nguyên mẫu thử nghiệm: đủ để trình bày quá trình phát triển mô hình và suy luận ảnh, nhưng chưa phải bằng chứng về mức độ sẵn sàng cho sản xuất.",
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
  const t=text[lang];
  const vi=lang==="vi";
  const groups=[
    {
      n:"01",kind:vi?"NĂNG LỰC CHÍNH":"CORE CAPABILITY",
      evidence:vi?"Công việc & dự án cá nhân":"Work & personal project",
      title:vi?"Phát triển ứng dụng Python":"Python application development",
      desc:vi
        ?"Python là ngôn ngữ phát triển chính. Tôi đã tham gia triển khai logic ứng dụng và chức năng nghiệp vụ; Flask xuất hiện trong công việc/dự án, còn FastAPI được sử dụng trong RackFlow — dự án cá nhân đang phát triển."
        :"Python is my primary programming language. I have implemented application logic and business features; Flask has been used in work/project contexts, while FastAPI is used in RackFlow, a personal project in development.",
      proof:vi
        ?"Bằng chứng: phát triển chức năng WMS/FEMS tại Sumida; xây dựng RackFlow bằng FastAPI."
        :"Evidence: WMS/FEMS feature work at Sumida; RackFlow development with FastAPI.",
      tags:["Python","Flask","FastAPI","REST APIs"]
    },
    {
      n:"02",kind:vi?"ỨNG DỤNG DOANH NGHIỆP":"ENTERPRISE APPLICATIONS",
      evidence:vi?"Kinh nghiệm công việc":"Professional work",
      title:vi?"Quy trình ERP / WMS / FEMS":"ERP / WMS / FEMS workflows",
      desc:vi
        ?"Làm rõ yêu cầu với người dùng kho, phân tích các bước nghiệp vụ, triển khai logic xử lý, kiểm thử chức năng và hỗ trợ chạy thử. Với FEMS, tham gia chức năng xử lý dữ liệu, bảng điều khiển điện năng và tính toán chi phí điện."
        :"Clarified requirements with warehouse users, analysed operational steps, implemented application logic, tested features and supported trial deployment. FEMS work included data-processing features, an electricity dashboard and cost calculations.",
      proof:vi
        ?"Bằng chứng: tham gia phát triển WMS và FEMS tại Sumida; mô tả giới hạn theo phần việc đã thực hiện."
         :"Evidence: WMS and FEMS features developed at Sumida.",
      tags:["ERP","WMS","FEMS","Workflow analysis","Business logic"]
    },
    {
      n:"03",kind:vi?"DỮ LIỆU & LƯU TRỮ":"DATA & PERSISTENCE",
      evidence:vi?"Công việc & dự án cá nhân":"Work & personal project",
      title:vi?"SQL và cơ sở dữ liệu quan hệ":"SQL & relational databases",
      desc:vi
        ?"Sử dụng SQL và PostgreSQL trong ứng dụng nghiệp vụ; làm việc với SQLAlchemy trong RackFlow. Trọng tâm là tổ chức dữ liệu phục vụ quy trình, tra cứu, kiểm tra và ghi nhận thay đổi."
        :"Used SQL and PostgreSQL in business applications, and SQLAlchemy in RackFlow. The focus is structuring application data for workflows, lookups, validation and recorded changes.",
      proof:vi
        ?"Bằng chứng: PostgreSQL trong ứng dụng nghiệp vụ; SQLAlchemy và PostgreSQL trong RackFlow đang phát triển."
        :"Evidence: PostgreSQL in business-application work; SQLAlchemy and PostgreSQL in the RackFlow project under development.",
      tags:["SQL","PostgreSQL","SQLAlchemy","Data validation"]
    },
    {
      n:"04",kind:vi?"KINH NGHIỆM BỔ TRỢ":"SUPPORTING EXPERIENCE",
      evidence:vi?"Hợp đồng & dự án theo đợt":"Contract & project engagements",
      title:vi?"Thị giác máy tính và OCR":"Computer Vision & OCR",
      desc:vi
        ?"YOLOv5 và DeepSORT được sử dụng trong dự án theo dõi giao nhận qua video. OCR được áp dụng để trích xuất dữ liệu từ hồ sơ kiểm định phương tiện và hỗ trợ nhập liệu lên trang web. Riêng Halovi là hợp đồng thị giác máy tính 5 tháng."
        :"YOLOv5 and DeepSORT were used in a video-based delivery-monitoring project. OCR was applied to extract information from vehicle-inspection documents and support website data entry. The Halovi engagement was a separate five-month Computer Vision contract.",
      proof:vi
        ?"Bằng chứng: dự án theo dõi giao nhận, dự án OCR và hợp đồng 5 tháng tại Halovi. Chưa công bố chỉ số độ chính xác đã xác minh."
         :"Evidence: a delivery-monitoring application, an OCR data-entry tool and a five-month Computer Vision contract at Halovi.",
      tags:["YOLOv5","DeepSORT","OCR","Image processing"]
    },
    {
      n:"05",kind:vi?"NỀN TẢNG KỸ THUẬT":"ENGINEERING FOUNDATION",
      evidence:vi?"Thực tập & đào tạo":"Internship & education",
      title:vi?"Cơ điện tử & giao tiếp thiết bị công nghiệp":"Mechatronics & industrial device communication",
      desc:vi
        ?"Nền tảng Cơ điện tử, lập trình C, IoT và robot STEAM giúp tôi hiểu bối cảnh thiết bị và sản xuất. Trong kỳ thực tập tại Premo, tôi sử dụng Python thu thập dữ liệu cảm biến qua Modbus RTU. Tôi có thể khảo sát thiết bị Modbus RTU trên RS-485, dò địa chỉ thiết bị (Slave ID), xác định địa chỉ thanh ghi (Register) và đọc/đối chiếu giá trị dữ liệu."
        :"My Mechatronics background, C programming, IoT and STEAM robotics provide context for equipment and manufacturing. During my Premo internship, I used Python to collect sensor data over Modbus RTU. I can also investigate Modbus RTU devices over RS-485 by discovering device addresses (slave IDs), identifying register addresses and reading/checking register values.",
      proof:vi
        ?"Bằng chứng: kỳ thực tập Premo 05/2022–07/2022 có sử dụng Python thu thập dữ liệu qua Modbus RTU; kỹ năng khảo sát địa chỉ và thanh ghi được nêu ở phạm vi thiết bị, không phải triển khai PLC/SCADA."
         :"Evidence: Python-based sensor data acquisition over Modbus RTU at Premo, in an industrial engineering environment.",
      tags:["Mechatronics","C","IoT","Modbus RTU","RS-485","Slave ID discovery","Register mapping"]
    },
    {
      n:"06",kind:vi?"CÁCH THỨC TRIỂN KHAI":"DELIVERY PRACTICE",
      evidence:vi?"Xuyên suốt công việc":"Across work contexts",
      title:vi?"Phân tích, kiểm thử và cải tiến":"Analysis, testing & refinement",
      desc:vi
        ?"Tiếp cận chức năng từ yêu cầu và luồng nghiệp vụ; xác định dữ liệu đầu vào/đầu ra, triển khai logic, kiểm thử kết quả, xử lý lỗi và hỗ trợ chạy thử. Đây là cách làm hình thành qua công việc phát triển ứng dụng doanh nghiệp."
        :"Approach features through requirements and business workflows; identify inputs and outputs, implement logic, test results, resolve defects and support trial deployment. This practice comes from enterprise-application development work.",
      proof:vi
        ?"Bằng chứng: các phần việc WMS/FEMS tại Sumida và quá trình phát triển RackFlow."
        :"Evidence: WMS/FEMS work at Sumida and the ongoing development of RackFlow.",
      tags:vi?["Phân tích yêu cầu","Mô hình hóa quy trình","Kiểm thử chức năng","Gỡ lỗi"]:["Requirements analysis","Workflow modelling","Functional testing","Debugging"]
    }
  ];
  const steps=vi?[
    ["01","Làm rõ bài toán","Hiểu người dùng, mục tiêu nghiệp vụ, các bước xử lý và điều kiện ngoại lệ."],
    ["02","Xác định dữ liệu và logic","Làm rõ đầu vào/đầu ra, trạng thái nghiệp vụ và cách ứng dụng cần phản hồi."],
    ["03","Triển khai chức năng","Xây dựng logic bằng Python và kết nối với lớp dữ liệu/API phù hợp."],
    ["04","Kiểm thử và hoàn thiện","Kiểm tra luồng chính, xử lý lỗi và xác nhận hành vi trước khi hỗ trợ chạy thử."]
  ]:[
    ["01","Clarify the problem","Understand users, business objectives, process steps and exception conditions."],
    ["02","Define data and logic","Identify inputs/outputs, business states and expected application behaviour."],
    ["03","Implement the feature","Build application logic with Python and connect it to the appropriate data/API layer."],
    ["04","Test and refine","Validate the main workflow, resolve defects and confirm behaviour before supporting trial use."]
  ];
  const boundaries=vi
    ?"Python, Flask, FastAPI, SQL và PostgreSQL là nền tảng tôi sử dụng trong công việc và các dự án. Computer Vision, OCR và Modbus RTU bổ sung góc nhìn về hình ảnh, tài liệu và dữ liệu thiết bị."
    :"Python, Flask, FastAPI, SQL and PostgreSQL are central to my work and projects. Computer Vision, OCR and Modbus RTU add experience with images, documents and equipment data."
  return <main id="main-content" className="inner-page page-section-page skills-page"><div className="container">
    <PageHeading index="01" kicker={t.skills} title={t.skillsTitle} intro={vi
      ?"Năng lực được hình thành từ phát triển ứng dụng Python, hệ thống nghiệp vụ doanh nghiệp và các dự án kỹ thuật. Mỗi nhóm dưới đây đều gắn với bối cảnh đã sử dụng hoặc đã thực hiện, thay vì chỉ liệt kê tên công nghệ."
      :"My capabilities span Python application development, enterprise business systems and engineering projects. Each area below is tied to a work or project context rather than presented as a list of technology names."}/>
    <section className="skills-profile-strip" aria-label={vi?"Tóm tắt định hướng năng lực":"Capability summary"}>
      <div><span>{vi?"TRỌNG TÂM CHÍNH":"PRIMARY FOCUS"}</span><strong>Python · ERP / WMS</strong></div>
      <div><span>{vi?"NĂNG LỰC BỔ TRỢ":"SUPPORTING AREAS"}</span><strong>{vi?"Thị giác máy tính · OCR":"Computer Vision · OCR"}</strong></div>
      <div><span>{vi?"NỀN TẢNG KỸ THUẬT":"ENGINEERING FOUNDATION"}</span><strong>{vi?"Cơ điện tử · Dữ liệu thiết bị":"Mechatronics · Equipment data"}</strong></div>
    </section>
    <section className="skills-capabilities" aria-labelledby="skills-capabilities-title">
      <div className="skills-section-heading">
        <div><span>{vi?"01 / NHÓM NĂNG LỰC":"01 / CAPABILITY AREAS"}</span><h2 id="skills-capabilities-title">{vi?"Năng lực theo bối cảnh sử dụng":"Capabilities by practical context"}</h2></div>
        <p>{vi?"Phân biệt kinh nghiệm công việc, dự án cá nhân, hợp đồng và thực tập để nhà tuyển dụng hiểu đúng mức độ áp dụng.":"Work experience, personal projects, contract work and internship exposure are distinguished so the context of each skill remains clear."}</p>
      </div>
      <div className="skills-detail-grid">
        {groups.map(g=><article className={"skills-detail-card"+(g.n==="01"||g.n==="02"?" skills-detail-primary":"")} key={g.n}>
          <div className="skills-detail-top"><span className="skills-detail-number">{g.n}</span><span className="skills-detail-kind">{g.kind}</span></div>
          <div className="skills-evidence-type">{g.evidence}</div>
          <h3>{g.title}</h3><p>{g.desc}</p>
          <div className="skills-proof">{g.proof}</div>
          <div className="tag-list">{g.tags.map(tag=><span key={tag}>{displayTag(tag,lang)}</span>)}</div>
        </article>)}
      </div>
    </section>
    <section className="skills-method" aria-labelledby="skills-method-title">
      <div className="skills-section-heading">
        <div><span>{vi?"02 / CÁCH TIẾP CẬN CÔNG VIỆC":"02 / WORKING APPROACH"}</span><h2 id="skills-method-title">{vi?"Từ yêu cầu nghiệp vụ đến chức năng có thể kiểm chứng":"From business requirements to verifiable features"}</h2></div>
        <p>{vi?"Đây là cách tôi thường đi từ yêu cầu ban đầu đến chức năng có thể kiểm thử và sử dụng.":"This is how I move from an initial requirement to a feature that can be tested and used."}</p>
      </div>
      <div className="skills-method-grid">
        {steps.map(step=><article key={step[0]}><span>{step[0]}</span><h3>{step[1]}</h3><p>{step[2]}</p></article>)}
      </div>
    </section>
    <section className="skills-stack" aria-labelledby="skills-stack-title">
      <div className="skills-section-heading">
        <div><span>{vi?"03 / CÔNG NGHỆ ĐÃ SỬ DỤNG":"03 / TECHNOLOGIES USED"}</span><h2 id="skills-stack-title">{vi?"Công cụ gắn với từng nhóm công việc":"Tools mapped to their work contexts"}</h2></div>
      </div>
      <div className="skills-stack-list">
        <div><strong>{vi?"Ứng dụng & API":"Applications & APIs"}</strong><p>Python · Flask · FastAPI · REST APIs</p><small>{vi?"Flask trong công việc/dự án; FastAPI trong RackFlow.":"Flask in work/project contexts; FastAPI in RackFlow."}</small></div>
        <div><strong>{vi?"Dữ liệu & cơ sở dữ liệu":"Data & databases"}</strong><p>SQL · PostgreSQL · SQLAlchemy</p><small>{vi?"SQL/PostgreSQL trong ứng dụng; SQLAlchemy trong RackFlow.":"SQL/PostgreSQL in applications; SQLAlchemy in RackFlow."}</small></div>
        <div><strong>{vi?"Thị giác máy tính & tài liệu":"Computer Vision & documents"}</strong><p>YOLOv5 · DeepSORT · OCR · Image Processing</p><small>{vi?"Các dự án theo đợt và hợp đồng Computer Vision 5 tháng.":"Project engagements and a five-month Computer Vision contract."}</small></div>
        <div><strong>{vi?"Kỹ thuật & dữ liệu thiết bị":"Engineering & equipment data"}</strong><p>C · IoT · Modbus RTU · STEAM Robotics</p><small>{vi?"Lập trình C, IoT, robot STEAM và thu thập dữ liệu cảm biến qua Modbus RTU.":"C programming, IoT, STEAM robotics and sensor data collection over Modbus RTU."}</small></div>
      </div>
    </section>
    <p className="scope-note skills-boundary"><Icon name="check" size={17}/>{boundaries}</p>
  </div></main>;
}
function EducationSection({ lang }) {
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
    ? ["BỐI CẢNH","QUYẾT ĐỊNH MÔ HÌNH","THỰC NGHIỆM","ỨNG DỤNG","GIỚI HẠN","THỬ NGHIỆM TIẾP"]
    : ["CONTEXT","MODEL DECISION","EXPERIMENT","APPLICATION","LIMITATIONS","NEXT EXPERIMENTS"];
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