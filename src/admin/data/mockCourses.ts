import { courses as publicCourses, type Course } from "../../data/courses";

export interface AdminCourse extends Course {
  status: "Published" | "Draft" | "Archived";
  enrolledStudentsCount: number;
}

export const mockCourses: AdminCourse[] = publicCourses.map((c, idx) => ({
  ...c,
  status: idx === 4 ? "Draft" : "Published",
  enrolledStudentsCount: (idx + 1) * 24
}));
