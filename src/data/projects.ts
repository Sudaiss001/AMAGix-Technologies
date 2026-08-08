export interface Project {
  id: number;
  slug: string;
  title: string;
  category: "Web Development" | "Mobile App Development" | "Software Development" | "UI/UX Design" | "Cybersecurity";
  shortDescription: string;
  fullOverview: string;
  problem: string;
  solution: string;
  keyFeatures: string[];
  previewUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
  image: string;
  gallery: string[];
  technologies: string[];
  featured: boolean;
  client: string;
  year: string;
}

export const projects: Project[] = [
  {
    id: 1,
    slug: "ecommerce-platform",
    title: "E-Commerce Platform",
    category: "Web Development",
    shortDescription: "A modern e-commerce platform designed to provide businesses with a seamless way to showcase products and manage online sales.",
    fullOverview: "Built for high scalability and rapid response times, this e-commerce solution features dynamic product filtering, secure checkout gateways, order management dashboards, and inventory sync in real-time.",
    problem: "Local retail merchants struggled with manual order taking via instant messaging, leading to lost sales, mismanaged inventory, and unreliable payment tracking.",
    solution: "AMAGix Technologies developed a sleek, fast web marketplace integrated with automated payment gateways, SMS order notifications, and real-time inventory management.",
    keyFeatures: [
      "Dynamic multi-category product catalog with search & filters",
      "Secure instant checkout with Paystack & Flutterwave support",
      "Real-time admin dashboard for order management and analytics",
      "Customer account portals with order history tracking",
      "Mobile-responsive design optimized for low-bandwidth networks"
    ],
    previewUrl: "",
    liveUrl: "",
    githubUrl: "https://github.com/amagixtech/ecommerce-demo",
    image: "/images/projects/ecommerce.svg",
    gallery: [
      "/images/projects/ecommerce.svg"
    ],
    technologies: ["React", "Tailwind CSS", "TypeScript", "Laravel", "MySQL"],
    featured: true,
    client: "Retail Enterprise",
    year: "2025"
  },
  {
    id: 2,
    slug: "cbt-examination-system",
    title: "CBT Examination System",
    category: "Software Development",
    shortDescription: "An automated Computer-Based Testing platform for institutions and schools to conduct secure examinations.",
    fullOverview: "A robust educational examination suite built to process simultaneous test takers, generate automated question shuffling, enforce strict timed test conditions, and yield instant graded analytics.",
    problem: "Educational centers faced significant administrative overhead and paper waste when evaluating hundreds of students during terminal examinations.",
    solution: "We engineered an offline-capable CBT desktop and web application with centralized question banks, instant auto-marking, and tamper-resistant exam session locking.",
    keyFeatures: [
      "Randomized question selection from centralized item banks",
      "Timer auto-submit with session state persistence across network drops",
      "Instant result calculation and candidate transcript export",
      "Role-based access for exam invigilators and administrators",
      "Lightweight footprint requiring minimal system hardware"
    ],
    previewUrl: "",
    liveUrl: "",
    githubUrl: "",
    image: "/images/projects/cbt.svg",
    gallery: [
      "/images/projects/cbt.svg"
    ],
    technologies: ["React", "TypeScript", "Node.js", "SQLite", "Tailwind CSS"],
    featured: true,
    client: "Educational Institution",
    year: "2025"
  },
  {
    id: 3,
    slug: "cybershield-security-suite",
    title: "CyberShield Security Suite",
    category: "Cybersecurity",
    shortDescription: "A proactive threat monitor and vulnerability scanner dashboard designed for SME web applications.",
    fullOverview: "CyberShield is a security overview portal designed to scan corporate endpoints, monitor SSL certificate integrity, check header security standards, and alert administrators of potential unauthorized access attempts.",
    problem: "Small businesses often lack dedicated security teams, making them vulnerable to undetected web application threats and credential stuffing.",
    solution: "AMAGix developed a streamlined security dashboard that continuously audits application headers, alerts on anomalous traffic, and provides actionable remediation guidance.",
    keyFeatures: [
      "Automated HTTP security header audit & score rating",
      "SSL/TLS certificate expiration & weakness monitoring",
      "Real-time IP threat detection & geographic access logging",
      "One-click PDF security summary report generation",
      "Custom alert webhooks for instant admin notification"
    ],
    previewUrl: "",
    liveUrl: "",
    githubUrl: "https://github.com/amagixtech/cybershield-dashboard",
    image: "/images/projects/cybershield.svg",
    gallery: [
      "/images/projects/cybershield.svg"
    ],
    technologies: ["React", "Tailwind CSS", "Python", "FastAPI", "Docker"],
    featured: true,
    client: "Internal Product",
    year: "2026"
  },
  {
    id: 4,
    slug: "school-management-portal",
    title: "School Portal & Management System",
    category: "Web Development",
    shortDescription: "A comprehensive digital administrative portal for managing student records, grading, fees, and attendance.",
    fullOverview: "An all-in-one portal connecting school administration, teachers, students, and parents into a unified digital environment.",
    problem: "Fragmented physical record-keeping resulted in delayed report cards, missed fee tracking, and poor communication with guardians.",
    solution: "We deployed a cloud-accessible portal featuring digital gradebooks, online fee payment integration, attendance tracking, and parent notification portals.",
    keyFeatures: [
      "Student registration and academic record management",
      "Automated report card and transcript generator",
      "Parent portal for fee payments and grade viewing",
      "Teacher gradebook entry with administrative audit trail",
      "SMS & Email notification broadcast system"
    ],
    previewUrl: "",
    liveUrl: "",
    githubUrl: "",
    image: "/images/projects/school-portal.svg",
    gallery: [
      "/images/projects/school-portal.svg"
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Laravel", "PostgreSQL"],
    featured: false,
    client: "Academy Group",
    year: "2025"
  },
  {
    id: 5,
    slug: "healthtrack-mobile-app",
    title: "HealthTrack Mobile App",
    category: "Mobile App Development",
    shortDescription: "A patient appointment scheduling and health metrics tracker built for regional clinics.",
    fullOverview: "A patient-first mobile experience that simplifies doctor appointments, medication reminders, and vital sign monitoring.",
    problem: "Patients experienced long clinic wait times and lost physical medical appointment slips, impacting follow-up care consistency.",
    solution: "AMAGix created an intuitive mobile app allowing remote appointment booking, digital prescriptions, and push reminder notifications.",
    keyFeatures: [
      "Interactive clinic appointment booking and doctor schedule viewer",
      "Personalized daily medication reminders",
      "Digital prescription viewing and lab result history",
      "Emergency contact quick-dial dispatch",
      "Lightweight offline data storage"
    ],
    previewUrl: "",
    liveUrl: "",
    githubUrl: "",
    image: "/images/projects/healthtrack.svg",
    gallery: [
      "/images/projects/healthtrack.svg"
    ],
    technologies: ["React Native", "TypeScript", "Node.js", "MongoDB"],
    featured: false,
    client: "Healthcare Partner",
    year: "2025"
  },
  {
    id: 6,
    slug: "inventory-management-system",
    title: "Inventory & POS System",
    category: "Software Development",
    shortDescription: "Point-of-sale and stock tracking software built for multi-branch retail stores.",
    fullOverview: "A fast desktop and web POS application providing barcode scanning, stock level alerts, sales analytics, and multi-location synchronization.",
    problem: "Store managers faced stock shrinkage and discrepancies between physical inventory and manual register logs.",
    solution: "We delivered an automated POS and inventory tracking application with barcode scanner support, real-time stock deductions, and low-stock alerts.",
    keyFeatures: [
      "Barcode scanning and quick product lookup POS interface",
      "Multi-store stock level synchronization and transfer requests",
      "Automatic low-stock reorder thresholds and alerts",
      "Daily profit, loss, and revenue reporting charts",
      "Thermal receipt printing integration"
    ],
    previewUrl: "",
    liveUrl: "",
    githubUrl: "",
    image: "/images/projects/inventory.svg",
    gallery: [
      "/images/projects/inventory.svg"
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Express.js", "SQLite"],
    featured: false,
    client: "Commercial Supermarket",
    year: "2024"
  },
  {
    id: 7,
    slug: "payflow-digital-wallet",
    title: "PayFlow Digital Wallet & API",
    category: "Web Development",
    shortDescription: "A secure digital wallet and payment gateway API for instant online transactions and disbursements.",
    fullOverview: "PayFlow enables merchants to accept card and bank transfer payments with automated webhook notifications, multi-currency ledger tracking, and instant merchant settlement.",
    problem: "Online vendors experienced high payment drop-off rates due to slow gateway redirections and unreliable transaction status webhooks.",
    solution: "AMAGix engineered a high-throughput payment processing portal with instant SDK integration, real-time ledger auditing, and automated dispute management.",
    keyFeatures: [
      "Instant checkout widget with API key authentication",
      "Multi-currency transaction ledger & balance management",
      "Automated webhook delivery with cryptographic signature verification",
      "Merchant analytics dashboard for sales trends and volume reporting",
      "Bank-grade AES-256 data encryption standards"
    ],
    previewUrl: "",
    liveUrl: "",
    githubUrl: "",
    image: "/images/projects/payflow.svg",
    gallery: [
      "/images/projects/payflow.svg"
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Laravel", "MySQL", "Redis"],
    featured: true,
    client: "Fintech Venture",
    year: "2026"
  },
  {
    id: 8,
    slug: "agriconnect-farmer-marketplace",
    title: "AgriConnect Mobile Marketplace",
    category: "Mobile App Development",
    shortDescription: "A mobile marketplace connecting agricultural produce farmers directly with commercial buyers.",
    fullOverview: "AgriConnect empowers rural farmers to post produce yields, negotiate pricing, track transport logistics, and receive secure instant mobile payments.",
    problem: "Agricultural producers suffered significant harvest losses due to middleman delays and lack of direct market price transparency.",
    solution: "We designed a lightweight mobile app supporting local languages, offline crop listing drafts, and direct buyer messaging.",
    keyFeatures: [
      "Direct produce listing with crop photos and quantity metrics",
      "Real-time market commodity price index display",
      "SMS & mobile push notifications for buyer purchase offers",
      "Built-in transport dispatch request feature",
      "Multi-language support for regional accessibility"
    ],
    previewUrl: "",
    liveUrl: "",
    githubUrl: "",
    image: "/images/projects/agriconnect.svg",
    gallery: [
      "/images/projects/agriconnect.svg"
    ],
    technologies: ["Flutter", "Dart", "Firebase", "Node.js"],
    featured: false,
    client: "Agricultural Co-Op",
    year: "2025"
  }
];
