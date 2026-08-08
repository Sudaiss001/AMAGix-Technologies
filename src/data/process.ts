export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  iconName: string;
}

export const processSteps: ProcessStep[] = [
  {
    step: 1,
    title: "Discover",
    description: "We analyze your business goals, target audience, technical requirements, and project scope through in-depth consultation.",
    iconName: "Search"
  },
  {
    step: 2,
    title: "Design",
    description: "We craft human-centered wireframes, interactive UI prototypes, and scalable software architecture blueprints.",
    iconName: "Layout"
  },
  {
    step: 3,
    title: "Develop",
    description: "Our engineering team writes clean, modular, and performant code following industry standards and best practices.",
    iconName: "Code"
  },
  {
    step: 4,
    title: "Test",
    description: "We execute rigorous quality assurance, cross-browser compatibility checks, security auditing, and performance testing.",
    iconName: "CheckCircle"
  },
  {
    step: 5,
    title: "Deploy",
    description: "We handle cloud server setup, domain configuration, database migration, and smooth production deployment.",
    iconName: "Rocket"
  },
  {
    step: 6,
    title: "Support",
    description: "We provide continuous monitoring, maintenance updates, technical support, and iterative feature expansion.",
    iconName: "LifeBuoy"
  }
];
