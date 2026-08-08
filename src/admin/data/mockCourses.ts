import { courses as publicCourses, type Course } from "../../data/courses";

export interface AdminCourse extends Course {
  category: string;
  status: "Published" | "Draft" | "Archived";
  enrolledStudentsCount: number;
}

export const mockCourses: AdminCourse[] = publicCourses.map((c, idx) => ({
  ...c,
  category: idx === 1 ? "Cybersecurity" : idx === 2 ? "Software Development" : idx === 3 ? "Computer Skills" : "Web Development",
  status: idx === 4 ? "Draft" : "Published",
  enrolledStudentsCount: (idx + 1) * 24
}));
