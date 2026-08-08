export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  features: string[];
  deliverables: string[];
}

export const services: Service[] = [
  {
    id: "web-development",
    title: "Web Development",
    shortDescription: "Modern, responsive websites and high-performance web applications built for scalable business growth.",
    fullDescription: "We engineer fast, secure, and SEO-optimized web applications using cutting-edge frameworks like React, TypeScript, Next.js, and Node.js. Whether you need an e-commerce platform, corporate portal, or bespoke SaaS tool, our solutions deliver flawless performance across all device viewports.",
    iconName: "Globe",
    features: [
      "Responsive & Mobile-First Design",
      "Progressive Web Apps (PWA)",
      "API Integration & Custom Backends",
      "SEO & Speed Optimization",
      "CMS & Enterprise Dashboards"
    ],
    deliverables: ["Source Code", "Deployment Pipeline", "Documentation", "SSL & Domain Setup"]
  },
  {
    id: "mobile-app-development",
    title: "Mobile App Development",
    shortDescription: "Native and cross-platform mobile applications designed around real-world user workflows.",
    fullDescription: "We build intuitive mobile apps for Android and iOS that deliver smooth user experiences, robust offline capabilities, and high performance. From initial wireframing to App Store and Google Play deployment, we craft native-feeling applications.",
    iconName: "Smartphone",
    features: [
      "Cross-Platform Flutter & React Native Apps",
      "Offline Data Synchronization",
      "Push Notifications & Real-Time Sync",
      "Biometric Security & Encrypted Storage",
      "App Store & Play Store Publishing"
    ],
    deliverables: ["Android APK / AAB", "iOS IPA Build", "Admin Control Panel", "App Analytics Setup"]
  },
  {
    id: "software-development",
    title: "Software Development",
    shortDescription: "Custom enterprise software solutions tailored to automate and streamline your organization's operations.",
    fullDescription: "Our team designs custom software architectures that solve complex business challenges. We build database management systems, workflow automation tools, inventory control software, and API microservices tailored precisely to your operational requirements.",
    iconName: "Code",
    features: [
      "Custom Database Architecture",
      "RESTful API & Microservices",
      "Automated Business Process Workflows",
      "Legacy Code Refactoring",
      "Cloud Infrastructure Setup"
    ],
    deliverables: ["Executable Distribution", "Database Schema", "User Manuals", "Maintenance SLA"]
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design",
    shortDescription: "Clean, intuitive, and user-centered digital interfaces that boost user engagement and conversions.",
    fullDescription: "Great software begins with human-centered design. We conduct user research, create interactive wireframes, and design modern visual design systems that ensure your product is not only visually stunning but effortless to navigate.",
    iconName: "Layout",
    features: [
      "User Journey Mapping & Persona Design",
      "Interactive Figma Prototypes",
      "Design Systems & Component Libraries",
      "Accessibility & Usability Audits",
      "Micro-Interactions & Motion UX"
    ],
    deliverables: ["Figma Design Files", "Design System UI Kit", "Clickable Prototypes", "Developer Handout"]
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity",
    shortDescription: "Security-focused digital audit solutions, vulnerability assessments, and cybersecurity awareness.",
    fullDescription: "Protect your infrastructure, user data, and corporate identity. We conduct web application security testing, code audits, network risk assessments, and establish robust authorization mechanisms to shield your digital assets against threats.",
    iconName: "ShieldCheck",
    features: [
      "Vulnerability Scanning & Penetration Audits",
      "Web Application Firewall (WAF) Setup",
      "Data Encryption Standards (AES / TLS)",
      "Authentication & Role-Based Access Control",
      "Employee Security Awareness Training"
    ],
    deliverables: ["Security Audit Report", "Vulnerability Patching", "Hardening Checklist", "Compliance Review"]
  },
  {
    id: "technology-training",
    title: "Technology Training",
    shortDescription: "Practical, hands-on technology courses designed to help learners acquire real-world developer skills.",
    fullDescription: "AMAGix Training Academy offers structured, project-driven learning programs in Web Development, Mobile App Design, Cybersecurity, Computer Fundamentals, and UI/UX. Our courses combine mentor guidance with practical building to prepare students for tech careers.",
    iconName: "GraduationCap",
    features: [
      "Hands-On Project Based Learning",
      "Industry Mentor Guidance",
      "Small Class Sizes for Focused Learning",
      "Certificate of Completion",
      "Physical, Online & Hybrid Formats"
    ],
    deliverables: ["Course Curriculum", "Project Repositories", "Certificate", "Career Mentorship"]
  }
];
