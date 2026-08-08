export interface TechStackItem {
  name: string;
  category: "Frontend" | "Backend" | "Database" | "Tools";
  iconName: string;
  description: string;
}

export const techStackItems: TechStackItem[] = [
  { name: "React", category: "Frontend", iconName: "Code2", description: "Interactive Single Page Web Applications" },
  { name: "TypeScript", category: "Frontend", iconName: "FileCode", description: "Type-Safe Scalable JavaScript" },
  { name: "Tailwind CSS", category: "Frontend", iconName: "Palette", description: "Modern Utility-First Styling" },
  { name: "JavaScript", category: "Frontend", iconName: "Zap", description: "Core Web Dynamic Scripting" },
  { name: "HTML5 & CSS3", category: "Frontend", iconName: "Layout", description: "Semantic Web Structure & Responsive Layouts" },
  { name: "Laravel", category: "Backend", iconName: "Server", description: "Robust PHP Web Application Framework" },
  { name: "PHP", category: "Backend", iconName: "Terminal", description: "Server-Side Scripting & REST APIs" },
  { name: "Node.js", category: "Backend", iconName: "Cpu", description: "Event-Driven Asynchronous Services" },
  { name: "MySQL", category: "Database", iconName: "Database", description: "Relational Database Management" },
  { name: "SQLite", category: "Database", iconName: "HardDrive", description: "Lightweight Embedded Database" },
  { name: "Git & GitHub", category: "Tools", iconName: "GitBranch", description: "Distributed Version Control & Collaboration" },
];
