import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const text = {
  en: {
    home:"Home", projects:"Projects", all:"All projects", ai:"AI", backend:"Backend", experience:"Experience", about:"About", contact:"Contact",
    availability:"Open to relevant opportunities", eyebrow:"PYTHON APPLICATION ENGINEERING",
    headlineA:"I build software around", headlineB:"real operational workflows.",
    intro:"I work across business requirements, Python application logic, database-backed features and validation. My main direction is ERP/WMS and backend applications; Computer Vision and OCR are supporting experience.",
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
    contactText:"Open to relevant roles in Python application development, ERP/WMS, backend engineering and application support. Computer Vision remains a supplementary direction.",
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
    backTop:"Back to top", viDegree:"Degree classification: Good"
  },
  vi: {
    home:"Trang chủ", projects:"Project", all:"Tất cả dự án", ai:"AI", backend:"Backend", experience:"Kinh nghiệm", about:"Giới thiệu", contact:"Liên hệ",
    availability:"Sẵn sàng trao đổi cơ hội phù hợp", eyebrow:"PHÁT TRIỂN ỨNG DỤNG PYTHON",
    headlineA:"Tôi xây dựng phần mềm dựa trên", headlineB:"quy trình vận hành thực tế.",
    intro:"Tôi làm việc từ yêu cầu nghiệp vụ, logic ứng dụng Python, chức năng gắn với cơ sở dữ liệu đến kiểm thử và xác thực. Hướng chính là ERP/WMS và Backend; Computer Vision và OCR là kinh nghiệm bổ trợ.",
    explore:"Khám phá dự án", getInTouch:"Liên hệ", snapshot:"TÓM TẮT KINH NGHIỆM", sumida:"tại Sumida", halovi:"hợp đồng tại Halovi", freelance:"dự án freelance chính",
    selected:"DỰ ÁN TIÊU BIỂU", featuredTitle:"Dự án có bài toán, phạm vi và trạng thái rõ ràng.",
    featuredIntro:"Portfolio phân biệt kinh nghiệm công việc, dự án đã thực hiện theo từng đợt và phần đang phát triển.",
    seeCase:"Xem case study", viewAll:"Xem tất cả dự án", inProgress:"Đang phát triển", past:"Dự án đã thực hiện", planned:"Dự kiến thử nghiệm",
    domains:"NHÓM DỰ ÁN", domainsTitle:"Một hướng chính, hai nhánh chuyên môn.",
    domainsIntro:"Project là mục cha; AI và Backend là hai nhánh con.",
    backendDesc:"Dịch vụ Python, quy tắc nghiệp vụ, lưu trữ dữ liệu và quy trình kho. RackFlow là dự án cá nhân đang phát triển.",
    aiDesc:"Các dự án đã thực hiện về phát hiện/theo dõi qua video, OCR nhập liệu tài liệu và một thử nghiệm tương lai được đánh dấu riêng.",
    experienceTitle:"Kinh nghiệm với phạm vi thực tế được phân định.",
    experienceIntro:"Công việc chính thức, hợp đồng có thời hạn, freelance gián đoạn, nghiên cứu/giáo dục và thực tập được trình bày riêng.",
    employment:"CÔNG VIỆC & HỢP ĐỒNG", earlier:"FREELANCE & KINH NGHIỆM TRƯỚC ĐÓ",
    skills:"NĂNG LỰC", skillsTitle:"Công nghệ và lĩnh vực có thể trình bày bằng bằng chứng.",
    skillsIntro:"Không dùng thanh phần trăm kỹ năng. Các nhóm thể hiện công nghệ gắn với công việc được mô tả.",
    core:"NỀN TẢNG CHÍNH", data:"DỮ LIỆU & QUY TRÌNH", supporting:"KINH NGHIỆM BỔ TRỢ",
    education:"HỌC VẤN", educationTitle:"Nền tảng kỹ thuật.",
    contactTitle:"Bạn có quy trình vận hành cần cải thiện?",
    contactText:"Quan tâm đến vị trí phù hợp về phát triển ứng dụng Python, ERP/WMS, Backend và Application Support. Computer Vision là hướng bổ trợ.",
    email:"Email", linkedin:"LinkedIn", github:"GitHub cá nhân", footer:"Hệ thống thực tế. Phạm vi rõ ràng. Công việc có thể kiểm chứng.",
    problem:"Bài toán & mục tiêu", role:"Vai trò cá nhân", approach:"Giải pháp & triển khai", scope:"Phạm vi",
    evidence:"Bằng chứng & giới hạn", next:"Bước tiếp theo", technologies:"CÔNG NGHỆ", back:"Quay lại dự án",
    noOt:"Các công nghệ OT/IT công nghiệp như Siemens S7, SCADA, MQTT và OPC UA không được trình bày như kinh nghiệm thực chiến chuyên nghiệp.",
    sumidaRole:"Trưởng nhóm kỹ thuật phát triển phần mềm",
    sumidaWms:"WMS: làm rõ yêu cầu với người dùng kho, phân tích quy trình, triển khai logic ứng dụng, kiểm thử chức năng, sửa lỗi và hỗ trợ chạy thử.",
    sumidaFems:"FEMS: tham gia chức năng xử lý dữ liệu, dashboard giám sát điện năng và tính toán chi phí điện.",
    haloviRole:"Kỹ sư Computer Vision",
    haloviText:"Tham gia các thành phần Computer Vision trong hợp đồng 5 tháng. Nội dung giới hạn ở lĩnh vực và thời hạn đã xác nhận; không bổ sung trách nhiệm production chưa được kiểm chứng.",
    freelanceText:"Hai dự án chính được thực hiện ở các giai đoạn riêng biệt, có khoảng trống giữa các đợt; không phải công việc toàn thời gian liên tục.",
    uniRole:"Kỹ sư nghiên cứu",
    uniText:"Phát triển website giáo dục, thiết kế và lắp ráp hệ thống robot STEAM, tham gia hoạt động học tập theo dự án.",
    premoRole:"Thực tập sinh kỹ thuật Kaizen",
    premoText:"Hỗ trợ phân tích quy trình lắp ráp và hoạt động cải tiến liên tục trong kỳ thực tập kỹ thuật. Không trình bày đây là kinh nghiệm kỹ sư OT/IT chuyên nghiệp.",
    freelanceType:"Freelance theo từng đợt", research:"Nghiên cứu / giáo dục", internship:"Thực tập",
    degree:"Kỹ sư Công nghệ Kỹ thuật Cơ điện tử",
    publication:"Đồng tác giả bài báo “Building An IoT-Based Waste Management System for Hazardous Waste,” REC-ECIT 2023, trang 193–198.",
    award:"Thành tích nghiên cứu sinh viên năm 2022–2023, bao gồm giải Nhì Cuộc thi Sinh viên nghiên cứu khoa học TP. Đà Nẵng năm 2022.",
    rackSummary:"Ứng dụng vận hành kho tập trung vào nhập kho, tra cứu tồn, tra cứu đơn, giữ tồn và lịch sử thay đổi có thể truy vết.",
    cvSummary:"Quy trình Computer Vision theo dự án freelance, sử dụng video để phát hiện và theo dõi hoạt động liên quan đến giao nhận tại siêu thị.",
    ocrSummary:"Quy trình theo dự án, trích xuất thông tin từ hồ sơ kiểm định phương tiện và nhập dữ liệu vào website.",
    fabricSummary:"Đề xuất thử nghiệm Computer Vision cho kiểm tra bề mặt vải. Chưa xác nhận dataset, triển khai, mô hình huấn luyện hay kết quả đánh giá.",
    rackProblem:"Quy trình kho cần dữ liệu tồn nhất quán và lịch sử rõ ràng cho các thao tác vận hành. RackFlow mô hình hóa các luồng này trong ứng dụng ERP/WMS quy mô portfolio.",
    rackRole:"Dự án cá nhân. Tôi xác định phạm vi và triển khai ứng dụng theo từng bước; đây không phải hệ thống khách hàng đã triển khai hay nền tảng kho production.",
    rackScope:"Nhập kho và tra cứu tồn; tra cứu đơn và giữ tồn; lịch sử sự kiện phục vụ truy vết vận hành.",
    rackApproach:"Các dịch vụ Python sử dụng FastAPI, Flask, SQLAlchemy và PostgreSQL. Trọng tâm là quy tắc nghiệp vụ, lưu trữ dữ liệu, hành vi quy trình và thay đổi trạng thái tường minh.",
    rackEvidence:"Các tính năng liệt kê xác định phạm vi portfolio hiện tại. Quy trình xuất kho và vận hành có AI vẫn đang phát triển; không tuyên bố triển khai production hoặc KPI nghiệp vụ.",
    rackNext:"Hoàn thiện và kiểm thử xuất kho thủ công trước, sau đó mới bổ sung AI với bước xác thực, xác nhận của con người và sự kiện có thể truy vết.",
    cvProblem:"Hỗ trợ giám sát giao nhận bằng cách nhận diện và theo dõi các đối tượng liên quan trong video.",
    cvRole:"Triển khai quy trình Computer Vision sử dụng YOLOv5 để phát hiện đối tượng và DeepSORT để theo dõi đối tượng.",
    cvEvidence:"Dự án freelance đã thực hiện theo từng đợt. Portfolio không tự nhận chỉ số độ chính xác, thông lượng hoặc tiết kiệm thời gian đã xác minh.",
    cvNext:"Để tạo demo có thể tái lập, cần báo cáo precision/recall và trường hợp lỗi; với tracking cần ghi nhận identity switch và hành vi khi bị che khuất.",
    ocrProblem:"Giảm thao tác nhập liệu lặp lại từ hồ sơ kiểm định phương tiện dạng giấy vào website Cảng Đà Nẵng.",
    ocrRole:"Sử dụng xử lý ảnh và OCR trong quy trình trích xuất thông tin tài liệu và tự động nhập dữ liệu lên website.",
    ocrEvidence:"Dự án freelance theo từng đợt. Mẫu tài liệu, độ chính xác từng trường và thời gian tiết kiệm chưa được công bố như bằng chứng đã xác minh.",
    ocrNext:"Để tạo demo có thể tái lập, cần đo exact match từng trường, tỷ lệ phải sửa và xử lý lỗi trên bộ tài liệu đã gán nhãn.",
    fabricProblem:"Lỗi bề mặt vải có thể ảnh hưởng chất lượng vật liệu trong sản xuất sofa. Mục tiêu đề xuất là kiểm tra khả năng phát hiện lỗi ổn định trước khi cân nhắc tích hợp vào quy trình nhà máy.",
    fabricApproach:"Kiểm tra dataset và annotation trước; sau đó chọn baseline có thể tái lập phù hợp định dạng nhãn. Chỉ quyết định detection, segmentation hay xử lý ảnh cổ điển sau khi xem dữ liệu.",
    fabricEvidence:"Mới ở giai đoạn đề xuất. Chưa chọn dataset, chưa triển khai code, huấn luyện, đánh giá mô hình hay xác minh tích hợp nhà máy.",
    fabricNext:"Xác nhận giấy phép dataset và kiểm tra ảnh mẫu trước khi chọn mô hình hoặc công bố kết quả.",
    flow:"MÔ HÌNH QUY TRÌNH · MINH HỌA", receive:"Nhập kho", inventory:"Kiểm tra tồn", reserve:"Giữ tồn", trace:"Truy vết",
    video:"Khung hình video", detection:"YOLOv5 phát hiện", tracking:"DeepSORT tracking", tracks:"Kết quả tracking",
    document:"Ảnh tài liệu", ocr:"Xử lý ảnh / OCR", fields:"Trường dữ liệu", entry:"Nhập website",
    dataset:"Dataset", baseline:"Baseline", evaluation:"Đánh giá", notFound:"Không tìm thấy trang portfolio này.", homeAction:"Về trang chủ",
    backTop:"Lên đầu trang", viDegree:"Xếp loại Khá"
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

function Brand() {
  return <a className="brand" href="#home" aria-label="Minh Phat — home"><span className="brand-mark">MP<span>.</span></span><span className="brand-name">MINH PHAT<small>PYTHON · ERP / WMS</small></span></a>;
}

function Header({ lang, setLang }) {
  const t=text[lang];
  const [mobile,setMobile]=useState(false);
  const [projectsOpen,setProjectsOpen]=useState(false);
  const close=()=>{setMobile(false);setProjectsOpen(false);};
  return <header className="site-header"><div className="nav-wrap">
    <Brand />
    <button className="mobile-toggle" type="button" aria-label="Toggle navigation" aria-expanded={mobile} onClick={()=>setMobile(!mobile)}><span/><span/><span/></button>
    <nav className={"main-nav"+(mobile?" is-open":"")} aria-label="Main navigation">
      <a href="#home" onClick={close}>{t.home}</a>
      <div className="nav-project">
        <button type="button" className="nav-project-trigger" aria-expanded={projectsOpen} onClick={()=>setProjectsOpen(!projectsOpen)}>{t.projects}<Icon name="down" size={14}/></button>
        <div className={"project-dropdown"+(projectsOpen?" is-open":"")}>
          <a href="#projects" onClick={close}><span>{t.all}</span><Icon name="arrow" size={15}/></a>
          <a href="#projects/ai" onClick={close}><span>{t.ai}</span><small>Computer Vision · OCR</small></a>
          <a href="#projects/backend" onClick={close}><span>{t.backend}</span><small>Python · ERP / WMS</small></a>
        </div>
      </div>
      <a href="#experience" onClick={close}>{t.experience}</a><a href="#about" onClick={close}>{t.about}</a>
      <a className="nav-contact" href="#contact" onClick={close}>{t.contact}<Icon name="up" size={14}/></a>
      <div className="language-switch" role="group" aria-label="Language">
        <button type="button" className={lang==="en"?"active":""} aria-pressed={lang==="en"} onClick={()=>setLang("en")}>EN</button>
        <button type="button" className={lang==="vi"?"active":""} aria-pressed={lang==="vi"} onClick={()=>setLang("vi")}>VI</button>
      </div>
    </nav>
  </div></header>;
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

function ProjectCard({ project,lang,featured=false }) {
  const t=text[lang];
  const category=project.category==="backend"?"PYTHON BACKEND · ERP / WMS":project.status==="planned"?"PROPOSED COMPUTER VISION":"COMPUTER VISION · OCR";
  return <article className={"project-card"+(featured?" project-card-featured":"")}>
    <div className="project-card-top"><span className="project-number">PROJECT / {project.number}</span><Status status={project.status} lang={lang}/></div>
    <div className="project-card-main"><div className="project-card-text">
      <span className="project-category">{category}</span><h3>{project.title}</h3><p>{t[project.summaryKey]}</p>
      <div className="tag-list">{project.tags.map(tag=><span key={tag}>{tag}</span>)}</div>
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
        <div className="hero-kicker">{t.eyebrow}<span>—</span>VIETNAM</div>
        <h1>{t.headlineA}<br/><em>{t.headlineB}</em></h1>
        <p className="hero-intro">{t.intro}</p>
        <div className="hero-actions"><a className="button button-primary" href="#projects">{t.explore}<Icon name="arrow" size={17}/></a><a className="button button-quiet" href="mailto:tranvietminhphat@gmail.com">{t.getInTouch}<Icon name="up" size={15}/></a></div>
        <div className="hero-socials"><a href="https://github.com/2000minhphat1999" target="_blank" rel="noopener noreferrer"><Icon name="github" size={16}/>GitHub</a><a href="https://www.linkedin.com/in/minhphat-ai/" target="_blank" rel="noopener noreferrer"><Icon name="linkedin" size={16}/>LinkedIn</a><span>01 / 04 — PROFILE</span></div>
      </div>
      <div className="hero-art" aria-label="Illustration of an operational software workflow">
        <div className="art-topline"><span>WORKFLOW / 01</span><span>APPLICATION LAYER</span></div>
        <div className="art-title">From process<br/>to application.</div><div className="art-subtitle">A practical engineering approach</div>
        <div className="art-node node-one"><span className="node-index">01</span><div><small>INPUT</small><strong>Business request</strong></div><span className="node-symbol">↘</span></div>
        <div className="art-connector"/><div className="art-node"><span className="node-index">02</span><div><small>LOGIC</small><strong>Python services</strong></div><span className="node-symbol">⌘</span></div>
        <div className="art-connector"/><div className="art-node"><span className="node-index">03</span><div><small>DATA</small><strong>SQL · workflow state</strong></div><span className="node-symbol">▤</span></div>
        <div className="art-foot"><span><i/>TRACEABLE CHANGES</span><span>MP / SYSTEMS</span></div><div className="art-orbit orbit-a"/><div className="art-orbit orbit-b"/>
      </div>
    </div>
    <div className="container hero-stats"><div className="stats-label">{t.snapshot}</div>
      <div className="stat-item"><strong>1 yr 10 mo</strong><span>{t.sumida}</span></div><div className="stat-item"><strong>5 months</strong><span>{t.halovi}</span></div><div className="stat-item"><strong>2</strong><span>{t.freelance}</span></div><div className="stats-end">PYTHON <b>·</b> APPLICATIONS <b>·</b> ERP / WMS</div>
    </div>
  </section>;
}

function HomePage({ lang }) {
  const t=text[lang];
  return <main id="main-content">
    <Hero lang={lang}/>
    <section className="section section-projects" id="projects"><div className="container">
      <SectionHeading index="01" kicker={t.selected} title={t.featuredTitle} intro={t.featuredIntro}/>
      <div className="featured-grid"><ProjectCard project={projects[0]} lang={lang} featured/><div className="featured-side"><ProjectCard project={projects[1]} lang={lang}/><ProjectCard project={projects[2]} lang={lang}/></div></div>
      <div className="section-bottom-link"><a className="text-link" href="#projects">{t.viewAll}<Icon name="arrow" size={16}/></a></div>
    </div></section>
    <section className="section section-domains" id="domains"><div className="container">
      <SectionHeading index="02" kicker={t.domains} title={t.domainsTitle} intro={t.domainsIntro}/>
      <div className="domain-grid">
        <a className="domain-panel domain-backend" href="#projects/backend"><div className="domain-number">01 / BACKEND</div><div className="domain-icon"><Icon name="code" size={25}/></div><h3>{t.backend}</h3><p>{t.backendDesc}</p><span className="domain-link">{t.viewAll}<Icon name="arrow" size={16}/></span></a>
        <a className="domain-panel domain-ai" href="#projects/ai"><div className="domain-number">02 / AI & VISION</div><div className="domain-icon"><Icon name="grid" size={25}/></div><h3>{t.ai}</h3><p>{t.aiDesc}</p><span className="domain-link">{t.viewAll}<Icon name="arrow" size={16}/></span></a>
      </div>
    </div></section>
    <ExperiencePreview lang={lang}/><SkillsSection lang={lang}/><EducationSection lang={lang}/><ContactSection lang={lang}/>
  </main>;
}
function ExperiencePreview({ lang,full=false }) {
  const t=text[lang];
  const entries=[
    {date:"02/2025 – 11/2026",kind:"EMPLOYMENT",role:t.sumidaRole,company:"Sumida",bullets:[t.sumidaWms,t.sumidaFems]},
    {date:"11/2023 – 03/2024",kind:lang==="vi"?"Hợp đồng 5 tháng":"5-month contract",role:t.haloviRole,company:"Halovi",bullets:[t.haloviText]}
  ];
  return <section className="section experience-section" id="experience"><div className="container">
    <SectionHeading index="03" kicker={t.experience} title={t.experienceTitle} intro={t.experienceIntro}/>
    <div className="experience-block-label">{t.employment}</div><div className="timeline">
      {entries.map(entry=><article className="timeline-entry" key={entry.company}><div className="timeline-date"><time>{entry.date}</time><span>{entry.kind}</span></div><div className="timeline-body"><h3>{entry.role}</h3><div className="timeline-company">{entry.company}</div><ul>{entry.bullets.map((line,i)=><li key={i}>{line}</li>)}</ul></div></article>)}
    </div>
    {full&&<><div className="experience-block-label earlier-label">{t.earlier}</div><div className="history-grid">
      <article className="history-card"><span className="history-date">09/2022 – 12/2024</span><span className="history-type">{t.freelanceType}</span><h3>{lang==="vi"?"Dự án phần mềm freelance":"Freelance Software Projects"}</h3><p>{t.freelanceText}</p><ul><li>Supermarket Delivery Monitoring — YOLOv5 and DeepSORT.</li><li>OCR-assisted data entry — vehicle-inspection documents and Da Nang Port website.</li></ul></article>
      <article className="history-card"><span className="history-date">03/2024 – 08/2024</span><span className="history-type">{t.research}</span><h3>{t.uniRole}</h3><p className="history-company">The University of Technology and Education — The University of Danang</p><p>{t.uniText}</p></article>
      <article className="history-card"><span className="history-date">05/2022 – 07/2022</span><span className="history-type">{t.internship}</span><h3>{t.premoRole}</h3><p className="history-company">Premo Vietnam</p><p>{t.premoText}</p></article>
    </div></>}
    {!full&&<div className="section-bottom-link"><a className="text-link" href="#experience">{t.experience}<Icon name="arrow" size={16}/></a></div>}
  </div></section>;
}

function SkillsSection({ lang }) {
  const t=text[lang];
  const groups=[
    {n:"01",name:t.core,title:lang==="vi"?"Ứng dụng Python":"Python applications",desc:lang==="vi"?"Logic ứng dụng, triển khai quy trình, gỡ lỗi và xác thực từng bước.":"Application logic, workflow implementation, debugging and incremental validation.",tags:["Python","Flask","FastAPI","REST APIs"]},
    {n:"02",name:t.data,title:lang==="vi"?"Quy trình ERP / WMS":"ERP / WMS workflows",desc:lang==="vi"?"Yêu cầu nghiệp vụ, quy trình dùng SQL, khái niệm tồn kho, kiểm tra dữ liệu và thay đổi trạng thái có thể truy vết.":"Business requirements, SQL-backed workflows, inventory concepts, data checking and traceable state changes.",tags:["SQL","PostgreSQL","SQLAlchemy","WMS / FEMS"]},
    {n:"03",name:t.supporting,title:lang==="vi"?"Computer Vision & OCR":"Computer Vision & OCR",desc:lang==="vi"?"Đã sử dụng trong các dự án trước đây cho phát hiện, theo dõi đối tượng và trích xuất dữ liệu tài liệu. Đánh giá mô hình vẫn là lĩnh vực đang phát triển.":"Prior project use for object detection, tracking and document data extraction. Model evaluation remains a developing area.",tags:["YOLOv5","DeepSORT","OCR","Image processing"]}
  ];
  return <section className="section skills-section" id="skills"><div className="container">
    <SectionHeading index="04" kicker={t.skills} title={t.skillsTitle} intro={t.skillsIntro}/>
    <div className="skill-grid">{groups.map(g=><article className="skill-card" key={g.n}><div className="skill-top"><span>{g.n}</span><small>{g.name}</small></div><h3>{g.title}</h3><p>{g.desc}</p><div className="tag-list">{g.tags.map(tag=><span key={tag}>{tag}</span>)}</div></article>)}</div>
    <p className="scope-note"><Icon name="check" size={17}/>{t.noOt}</p>
  </div></section>;
}

function EducationSection({ lang }) {
  const t=text[lang];
  return <section className="section education-section" id="education"><div className="container">
    <SectionHeading index="05" kicker={t.education} title={t.educationTitle}/>
    <div className="education-grid">
      <article className="education-card"><div className="education-symbol">ED / 01</div><span className="history-type">{t.education}</span><h3>{t.degree}</h3><p>The University of Technology and Education — The University of Danang</p><div className="education-meta">09/2018 – 06/2023 <b>·</b> {t.viDegree}</div></article>
      <article className="education-card"><div className="education-symbol">RE / 02</div><span className="history-type">{lang==="vi"?"NGHIÊN CỨU":"RESEARCH"}</span><h3>IoT-Based Waste Management System for Hazardous Waste</h3><p>{t.publication}</p><div className="education-meta">{t.award}</div></article>
    </div>
  </div></section>;
}

function ContactSection({ lang }) {
  const t=text[lang];
  return <section className="contact-section" id="contact"><div className="container contact-inner">
    <div className="contact-copy"><div className="section-kicker"><span>06</span>{t.contact}</div><h2>{t.contactTitle}</h2><p>{t.contactText}</p></div>
    <div className="contact-links">
      <a className="contact-link-card" href="mailto:tranvietminhphat@gmail.com"><span><Icon name="mail" size={19}/>{t.email}</span><strong>tranvietminhphat@gmail.com<Icon name="up" size={17}/></strong></a>
      <a className="contact-link-card" href="https://www.linkedin.com/in/minhphat-ai/" target="_blank" rel="noopener noreferrer"><span><Icon name="linkedin" size={19}/>{t.linkedin}</span><strong>minhphat-ai<Icon name="up" size={17}/></strong></a>
      <a className="contact-link-card" href="https://github.com/2000minhphat1999" target="_blank" rel="noopener noreferrer"><span><Icon name="github" size={19}/>{t.github}</span><strong>2000minhphat1999<Icon name="up" size={17}/></strong></a>
    </div>
  </div></section>;
}

function ProjectsPage({ lang,category }) {
  const t=text[lang];
  const list=category==="ai"?projects.filter(p=>p.category==="ai"):category==="backend"?projects.filter(p=>p.category==="backend"):projects;
  const heading=category==="ai"?t.ai:category==="backend"?t.backend:t.projects;
  const intro=category==="ai"?t.aiDesc:category==="backend"?t.backendDesc:t.featuredIntro;
  return <main id="main-content" className="inner-page"><div className="container">
    <div className="page-hero"><div className="section-kicker"><span>PROJECTS</span> / {category?category.toUpperCase():"INDEX"}</div><h1>{heading}</h1><p>{intro}</p><div className="page-branch-links"><a className={!category?"selected":""} href="#projects">{t.all}</a><a className={category==="ai"?"selected":""} href="#projects/ai">{t.ai}</a><a className={category==="backend"?"selected":""} href="#projects/backend">{t.backend}</a></div></div>
    <div className="project-list">{list.map(project=><ProjectCard key={project.slug} project={project} lang={lang} featured={project.slug==="rackflow"}/>)}</div>
  </div></main>;
}

function ProjectDetail({ project,lang }) {
  const t=text[lang];
  if(!project) return <NotFound lang={lang}/>;
  const labels={problem:t.problem,role:t.role,scope:t.scope,approach:t.approach,evidence:t.evidence,next:t.next};
  return <main id="main-content" className="inner-page detail-page"><div className="container">
    <a href={project.category==="backend"?"#projects/backend":"#projects/ai"} className="back-link">← {t.back}</a>
    <div className="detail-heading"><div className="section-kicker">PROJECT / {project.number} <span>—</span> {project.category.toUpperCase()}</div>
      <div className="detail-title-row"><h1>{project.title}</h1><Status status={project.status} lang={lang}/></div><p>{t[project.summaryKey]}</p>
      <div className="tag-list">{project.tags.map(tag=><span key={tag}>{tag}</span>)}</div>
    </div>
    <Flow project={project} lang={lang}/>
    <div className="case-grid">{project.fields.map(([label,key])=><article className={"case-panel case-"+label} key={key}><span>{labels[label]}</span><p>{t[key]}</p></article>)}</div>
    <div className="detail-footer"><span>{t.technologies}</span><div className="tag-list">{project.tags.map(tag=><span key={tag}>{tag}</span>)}</div><a className="text-link" href="#projects">{t.viewAll}<Icon name="arrow" size={16}/></a></div>
  </div></main>;
}

function AboutPage({ lang }) {
  const t=text[lang];
  const items=lang==="vi"?[
    ["01 / UNDERSTAND","Hiểu quy trình trước khi viết code","Làm rõ người dùng, mục tiêu vận hành, dữ liệu đầu vào và các ràng buộc thực tế."],
    ["02 / MODEL","Mô hình hóa quy tắc và trạng thái","Tách quy tắc nghiệp vụ, dữ liệu, chuyển trạng thái và các trường hợp ngoại lệ."],
    ["03 / VERIFY","Kiểm thử và truy vết lỗi","Triển khai thay đổi nhỏ, kiểm tra hành vi mong đợi và nêu rõ giới hạn còn lại."]
  ]:[
    ["01 / UNDERSTAND","Understand the process before coding","Clarify the user, operational goal, inputs and real-world constraints."],
    ["02 / MODEL","Model rules and state","Make business rules, data, state transitions and exceptions explicit."],
    ["03 / VERIFY","Test and trace failures","Implement small changes, validate expected behaviour and state remaining limitations."]
  ];
  return <main id="main-content" className="inner-page about-page"><div className="container"><div className="page-hero"><div className="section-kicker">PROFILE / APPROACH</div><h1>{t.about}</h1><p>{t.intro}</p></div>
    <div className="about-grid">{items.map(item=><article key={item[0]}><span>{item[0]}</span><h2>{item[1]}</h2><p>{item[2]}</p></article>)}</div>
    <p className="scope-note"><Icon name="check" size={17}/>{t.noOt}</p>
  </div></main>;
}

function NotFound({ lang }) {
  const t=text[lang];
  return <main id="main-content" className="inner-page not-found"><div className="container"><div className="section-kicker">404 / NOT FOUND</div><h1>Oops.</h1><p>{t.notFound}</p><a className="button button-primary" href="#home">{t.homeAction}<Icon name="arrow" size={16}/></a></div></main>;
}

function Footer({ lang }) {
  const t=text[lang];
  return <footer className="site-footer"><div className="container footer-top"><Brand/><p>{t.footer}</p><a href="#home" className="back-top">{t.backTop} ↑</a></div>
    <div className="container footer-bottom"><span>© {new Date().getFullYear()} TRAN VIET MINH PHAT</span><span>PYTHON APPLICATIONS · ERP / WMS</span><a href="https://github.com/2000minhphat1999" target="_blank" rel="noopener noreferrer">GITHUB <Icon name="up" size={13}/></a></div>
  </footer>;
}

function App() {
  const [lang,setLang]=useState("en");
  const [route,setRoute]=useState(()=>window.location.hash.slice(1)||"home");
  useEffect(()=>{
    const change=()=>{setRoute(window.location.hash.slice(1)||"home");window.scrollTo({top:0,behavior:"auto"});};
    window.addEventListener("hashchange",change);
    if(!window.location.hash) window.location.hash="home";
    return ()=>window.removeEventListener("hashchange",change);
  },[]);
  useEffect(()=>{
    document.documentElement.lang=lang;
    const slug=route.startsWith("project/")?route.split("/")[1]:null;
    const selected=projects.find(p=>p.slug===slug);
    document.title=selected?selected.title+" | Minh Phat":"Tran Viet Minh Phat | Python Application Engineer";
    const description=document.querySelector('meta[name="description"]');
    if(description) description.content=text[lang].intro;
  },[lang,route]);
  const parts=route.split("/");
  let content;
  if(route==="home"||route==="") content=<HomePage lang={lang}/>;
  else if(route==="projects") content=<ProjectsPage lang={lang}/>;
  else if(route==="projects/ai") content=<ProjectsPage lang={lang} category="ai"/>;
  else if(route==="projects/backend") content=<ProjectsPage lang={lang} category="backend"/>;
  else if(route==="experience") content=<main id="main-content"><ExperiencePreview lang={lang} full/></main>;
  else if(route==="about") content=<AboutPage lang={lang}/>;
  else if(route==="contact") content=<main id="main-content"><ContactSection lang={lang}/></main>;
  else if(parts[0]==="project") content=<ProjectDetail project={projects.find(p=>p.slug===parts[1])} lang={lang}/>;
  else content=<NotFound lang={lang}/>;
  return <><a className="skip-link" href="#main-content">Skip to content</a><Header lang={lang} setLang={setLang}/>{content}<Footer lang={lang}/></>;
}

createRoot(document.getElementById("root")).render(<React.StrictMode><App/></React.StrictMode>);