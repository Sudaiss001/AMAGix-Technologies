export interface CurriculumModule {
  moduleTitle: string;
  topics: string[];
}

export interface CourseFAQ {
  question: string;
  answer: string;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  topics: string[];
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "All Levels";
  prerequisites: string[];
  whoIsThisFor: string[];
  whatYouWillLearn: string[];
  curriculum: CurriculumModule[];
  learningFormat: string[];
  faqs: CourseFAQ[];
  featured: boolean;
}

export const courses: Course[] = [
  {
    id: "web-development",
    slug: "web-development",
    title: "Web Development",
    shortDescription: "Master frontend and web application development with HTML, CSS, JavaScript, React, and Tailwind CSS through hands-on project building.",
    fullDescription: "Transform from a coding novice into a practical web developer. This course guides you through core web technologies, modern responsive design, Git version control, and building interactive single-page web applications with React.",
    iconName: "Globe",
    topics: [
      "HTML5",
      "CSS3",
      "JavaScript (ES6+)",
      "Responsive Design",
      "Git & GitHub",
      "React",
      "Tailwind CSS"
    ],
    duration: "12 Weeks (3 Months)",
    level: "Beginner",
    prerequisites: [
      "Basic computer literacy",
      "Personal computer/laptop for practice",
      "Enthusiasm for problem-solving"
    ],
    whoIsThisFor: [
      "Beginners wanting to launch a web development career",
      "Students seeking high-demand digital skills",
      "Entrepreneurs wanting to build their own web products"
    ],
    whatYouWillLearn: [
      "Structure semantic web pages using HTML5 standards",
      "Style modern responsive websites with CSS3 & Tailwind CSS",
      "Write dynamic JavaScript logic to handle DOM events & API data",
      "Collaborate with version control using Git and GitHub",
      "Build component-driven single page applications using React"
    ],
    curriculum: [
      {
        moduleTitle: "Module 1: Web Foundations (HTML5 & Modern CSS3)",
        topics: [
          "Understanding how the Web works & HTTP protocol",
          "Semantic HTML tags, accessibility & forms",
          "CSS Box Model, Flexbox & Grid layouts",
          "Mobile-first responsive design principles"
        ]
      },
      {
        moduleTitle: "Module 2: Programming Logic with JavaScript",
        topics: [
          "Variables, data types, and control structures",
          "Functions, arrays, and object manipulation",
          "DOM manipulation and browser events",
          "Asynchronous JavaScript, Fetch API & JSON"
        ]
      },
      {
        moduleTitle: "Module 3: Utility-First Styling with Tailwind CSS",
        topics: [
          "Setting up Tailwind CSS in modern web projects",
          "Utility classes for rapid UI prototyping",
          "Customizing color palettes, fonts, and dark mode",
          "Building responsive components"
        ]
      },
      {
        moduleTitle: "Module 4: Version Control & Developer Workflow",
        topics: [
          "Git fundamentals: init, commit, branch, merge",
          "Working with GitHub repositories & pull requests",
          "Deploying websites with Netlify / Vercel"
        ]
      },
      {
        moduleTitle: "Module 5: Modern Frontend Development with React",
        topics: [
          "JSX syntax and component architecture",
          "State management with useState and useEffect",
          "Handling user inputs & form validation",
          "Building a complete real-world portfolio capstone project"
        ]
      }
    ],
    learningFormat: ["Physical Classes in Minna Hub", "Live Online Webinars", "Hybrid Self-Paced + Mentorship"],
    faqs: [
      {
        question: "Do I need prior coding experience?",
        answer: "No prior coding experience is required! We start from absolute fundamentals and build up step-by-step."
      },
      {
        question: "Will I build real projects during the course?",
        answer: "Yes, you will complete multiple mini-projects and one major capstone project for your developer portfolio."
      },
      {
        question: "What hardware is required?",
        answer: "A functional laptop (Windows, Mac, or Linux) with at least 4GB RAM."
      }
    ],
    featured: true
  },
  {
    id: "computer-fundamentals",
    slug: "computer-fundamentals",
    title: "Computer Fundamentals",
    shortDescription: "Essential digital literacy covering computer hardware, operating systems, networking, Microsoft Office, and internet navigation.",
    fullDescription: "Gain confident mastery of everyday computer operations. This course equips beginners and office workers with essential digital competencies, document formatting, spreadsheet management, and online security awareness.",
    iconName: "Monitor",
    topics: [
      "Computer Basics",
      "Operating Systems",
      "Internet & Networking Basics",
      "Microsoft Office",
      "File Management",
      "Digital Skills"
    ],
    duration: "6 Weeks",
    level: "Beginner",
    prerequisites: [
      "No prerequisites needed",
      "Open to all age groups"
    ],
    whoIsThisFor: [
      "Students preparing for higher education or office roles",
      "Office staff seeking to upgrade productivity skills",
      "Anyone wanting to feel confident using modern computers"
    ],
    whatYouWillLearn: [
      "Understand computer hardware components and OS navigation",
      "Organize files and directory structures efficiently",
      "Master Microsoft Word for reports & document creation",
      "Use Microsoft Excel for spreadsheets, formulas, & basic charts",
      "Navigate the internet safely and utilize cloud tools like Google Workspace"
    ],
    curriculum: [
      {
        moduleTitle: "Module 1: Introduction to Computer Architecture & Windows OS",
        topics: [
          "Hardware components: CPU, RAM, storage, peripherals",
          "Windows interface navigation & system settings",
          "Effective file and folder organization strategies"
        ]
      },
      {
        moduleTitle: "Module 2: Word Processing with Microsoft Word",
        topics: [
          "Document formatting, typography, and page setups",
          "Inserting tables, graphics, and headers/footers",
          "Creating professional CVs, letters, and business reports"
        ]
      },
      {
        moduleTitle: "Module 3: Spreadsheets with Microsoft Excel",
        topics: [
          "Cell formatting and mathematical formulas (SUM, AVERAGE, IF)",
          "Data sorting, filtering, and chart creation",
          "Managing financial budgets and inventory records"
        ]
      },
      {
        moduleTitle: "Module 4: Internet, Cloud & Presentation Tools",
        topics: [
          "Web browser navigation, search techniques, and email etiquette",
          "Microsoft PowerPoint presentation creation",
          "Google Drive and cloud storage collaboration"
        ]
      }
    ],
    learningFormat: ["Physical Classes in Minna Hub", "Hybrid Mentorship"],
    faqs: [
      {
        question: "Is this course suitable for complete beginners?",
        answer: "Absolutely. We start from how to turn on a computer and navigate the desktop."
      },
      {
        question: "Is certification provided upon completion?",
        answer: "Yes! Students who complete practical assignments receive an AMAGix Certificate of Digital Literacy."
      }
    ],
    featured: true
  },
  {
    id: "mobile-app-development",
    slug: "mobile-app-development",
    title: "Mobile App Development",
    shortDescription: "Learn to design, program, test, and publish cross-platform mobile apps for Android and iOS using modern application frameworks.",
    fullDescription: "Dive into mobile app development. Learn UI layout design, mobile API integration, local storage, state management, and the full pipeline for building mobile applications.",
    iconName: "Smartphone",
    topics: [
      "Mobile UI",
      "Application Development",
      "APIs",
      "App Testing",
      "Deployment"
    ],
    duration: "10 Weeks",
    level: "Intermediate",
    prerequisites: [
      "Basic programming knowledge (JavaScript, Dart, or Python recommended)",
      "Laptop with at least 8GB RAM"
    ],
    whoIsThisFor: [
      "Web developers wanting to expand into mobile apps",
      "Computer science students and tech enthusiasts",
      "Entrepreneurs building a mobile product"
    ],
    whatYouWillLearn: [
      "Design mobile user interfaces with platform-native feel",
      "Manage application state across multiple screens",
      "Connect mobile apps to REST API backends",
      "Store user data locally on mobile devices",
      "Prepare APK/IPA builds and publish to app stores"
    ],
    curriculum: [
      {
        moduleTitle: "Module 1: Mobile UI Architecture",
        topics: [
          "Understanding mobile viewports & touch interactions",
          "Layout widgets, navigation stacks, and tab bars",
          "Designing responsive mobile screens"
        ]
      },
      {
        moduleTitle: "Module 2: State Management & Logic",
        topics: [
          "Component lifecycle in mobile frameworks",
          "State containers and reactive updates",
          "User authentication flow in mobile apps"
        ]
      },
      {
        moduleTitle: "Module 3: Backend API Integration & Native Features",
        topics: [
          "Consuming REST APIs in mobile environments",
          "Working with device camera, location, and storage",
          "Handling push notifications & offline caching"
        ]
      },
      {
        moduleTitle: "Module 4: Testing & Publishing",
        topics: [
          "Debugging mobile applications on emulators and physical devices",
          "Generating release APKs and app bundles",
          "Google Play Store publishing guidelines"
        ]
      }
    ],
    learningFormat: ["Physical Classes in Minna Hub", "Online Webinars", "Hybrid Formats"],
    faqs: [
      {
        question: "Can I build apps for both Android and iOS?",
        answer: "Yes! We focus on cross-platform development so your code works on both Android and iOS devices."
      }
    ],
    featured: true
  },
  {
    id: "cybersecurity-fundamentals",
    slug: "cybersecurity-fundamentals",
    title: "Cybersecurity Fundamentals",
    shortDescription: "Learn core digital security concepts, threat identification, network defence, password hygiene, and ethical security practices.",
    fullDescription: "Gain critical awareness and technical skills to defend digital systems against malicious attacks. Understand how security vulnerabilities occur and learn practical defensive techniques.",
    iconName: "ShieldAlert",
    topics: [
      "Cybersecurity Basics",
      "Threats & Vulnerabilities",
      "Network Security",
      "Password Security",
      "Phishing Awareness",
      "Ethical Security Practices"
    ],
    duration: "8 Weeks",
    level: "Beginner",
    prerequisites: [
      "Basic computer literacy",
      "Understanding of basic internet browsing"
    ],
    whoIsThisFor: [
      "Aspiring cybersecurity analysts and IT specialists",
      "System administrators wanting security fundamentals",
      "Anyone interested in protecting personal and organizational data"
    ],
    whatYouWillLearn: [
      "Identify common attack vectors: malware, phishing, ransomware",
      "Implement strong credential management & multi-factor authentication",
      "Understand network security protocols (HTTP vs HTTPS, VPNs, Firewalls)",
      "Perform basic web application security checks",
      "Understand ethical hacking principles and legal compliance"
    ],
    curriculum: [
      {
        moduleTitle: "Module 1: Cyber Threat Landscape",
        topics: [
          "Core CIA Triad (Confidentiality, Integrity, Availability)",
          "Social engineering, phishing, and spoofing tactics",
          "Malware analysis: viruses, worms, trojans, ransomware"
        ]
      },
      {
        moduleTitle: "Module 2: Network & Web Security Basics",
        topics: [
          "OSI model & TCP/IP security fundamentals",
          "Firewalls, VPNs, and wireless security",
          "Understanding SSL/TLS encryption and digital certificates"
        ]
      },
      {
        moduleTitle: "Module 3: Defensive Best Practices & Password Hygiene",
        topics: [
          "Password managers, entropy, and multi-factor authentication",
          "Securing personal and workplace devices",
          "Backup strategies and disaster recovery planning"
        ]
      },
      {
        moduleTitle: "Module 4: Introductory Security Auditing",
        topics: [
          "Using Wireshark for basic network packet observation",
          "Identifying OWASP Top 10 web vulnerabilities",
          "Ethical security guidelines and professional ethics"
        ]
      }
    ],
    learningFormat: ["Physical Classes in Minna Hub", "Online Webinars"],
    faqs: [
      {
        question: "Is this an ethical cybersecurity course?",
        answer: "Yes, 100%. We strictly teach defensive security and ethical practices aimed at protecting digital infrastructure."
      }
    ],
    featured: false
  },
  {
    id: "graphics-ui-ux-design",
    slug: "graphics-ui-ux-design",
    title: "Graphics & UI/UX Design",
    shortDescription: "Learn visual design principles, typography, user interface layout, wireframing, and interactive prototyping in Figma.",
    fullDescription: "Master the art and science of user experience and visual design. Create beautiful interfaces and user journeys for web and mobile applications using industry-standard tools like Figma.",
    iconName: "Palette",
    topics: [
      "Design Principles",
      "User Interfaces",
      "Wireframes",
      "Prototyping",
      "Responsive Design"
    ],
    duration: "8 Weeks",
    level: "All Levels",
    prerequisites: [
      "Creativity and interest in digital visual design",
      "Laptop capable of running web browsers (Figma)"
    ],
    whoIsThisFor: [
      "Aspiring UI/UX designers and graphic designers",
      "Developers wanting to improve visual design skills",
      "Product managers and creative enthusiasts"
    ],
    whatYouWillLearn: [
      "Apply core design principles: visual hierarchy, contrast, balance",
      "Craft color palettes and typography systems for digital brands",
      "Conduct user research and build empathy maps & user flows",
      "Construct wireframes and high-fidelity interactive prototypes in Figma",
      "Prepare design handoff assets for developer handoff"
    ],
    curriculum: [
      {
        moduleTitle: "Module 1: Principles of Visual Design & Color Theory",
        topics: [
          "Design fundamentals: balance, hierarchy, white space, contrast",
          "Color psychology, harmony, and choosing color tokens",
          "Digital typography: pairing fonts and font sizing scales"
        ]
      },
      {
        moduleTitle: "Module 2: UX Research & User Journey Mapping",
        topics: [
          "Understanding user problems through interviews & surveys",
          "Creating user personas and scenario workflows",
          "Information architecture and sitemap structure"
        ]
      },
      {
        moduleTitle: "Module 3: Wireframing & Prototyping in Figma",
        topics: [
          "Figma interface mastery: frames, auto-layout, components",
          "Low-fidelity to high-fidelity wireframing workflow",
          "Adding interactive transitions, micro-animations, and smart animate"
        ]
      },
      {
        moduleTitle: "Module 4: Responsive UI Kits & Developer Handoff",
        topics: [
          "Designing for mobile, tablet, and desktop viewports",
          "Exporting assets and generating style guidelines",
          "Building a complete portfolio case study"
        ]
      }
    ],
    learningFormat: ["Physical Classes in Minna Hub", "Online Webinars", "Hybrid Formats"],
    faqs: [
      {
        question: "Do I need expensive software to take this course?",
        answer: "No! We use Figma, which is completely free and browser-based."
      }
    ],
    featured: false
  }
];
