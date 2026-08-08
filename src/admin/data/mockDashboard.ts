export interface DashboardStats {
  totalEnrollments: number;
  enrollmentsChange: string;
  newEnrollments: number;
  newEnrollmentsChange: string;
  totalMessages: number;
  unreadMessages: number;
  totalCourses: number;
  totalProjects: number;
  featuredProjects: number;
}

export interface ActivityItem {
  id: string;
  type: "enrollment" | "message" | "course" | "project" | "testimonial" | "certification";
  title: string;
  description: string;
  timestamp: string;
  user?: string;
}

export const mockDashboardStats: DashboardStats = {
  totalEnrollments: 128,
  enrollmentsChange: "+12% this month",
  newEnrollments: 18,
  newEnrollmentsChange: "+5 this week",
  totalMessages: 34,
  unreadMessages: 8,
  totalCourses: 5,
  totalProjects: 8,
  featuredProjects: 4
};

export const mockActivities: ActivityItem[] = [
  {
    id: "act-1",
    type: "enrollment",
    title: "New Student Enrollment Application",
    description: "Amina Mohammed submitted an application for Full-Stack Web Development (Physical Classes).",
    timestamp: "10 minutes ago",
    user: "Amina Mohammed"
  },
  {
    id: "act-2",
    type: "message",
    title: "New Enterprise Inquiry",
    description: "Received inquiry from Zenith Retail regarding custom inventory software.",
    timestamp: "1 hour ago",
    user: "Zenith Retail"
  },
  {
    id: "act-3",
    type: "project",
    title: "Project Portfolio Updated",
    description: "PayFlow Digital Wallet & API featured status set to active.",
    timestamp: "3 hours ago"
  },
  {
    id: "act-4",
    type: "course",
    title: "Course Curriculum Updated",
    description: "Added React 19 and Next.js 15 modules to Web Development syllabus.",
    timestamp: "Yesterday at 4:30 PM"
  },
  {
    id: "act-5",
    type: "testimonial",
    title: "Client Testimonial Approved",
    description: "Approved testimonial from paiko agritech union for AgriConnect Mobile.",
    timestamp: "2 days ago"
  }
];

export const mockCourseInterestData = [
  { course: "Web Development", students: 54, percentage: 42 },
  { course: "Cybersecurity", students: 32, percentage: 25 },
  { course: "Mobile Apps", students: 24, percentage: 19 },
  { course: "Computer Fundamentals", students: 18, percentage: 14 }
];
