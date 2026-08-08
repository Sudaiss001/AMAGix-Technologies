import { projects as publicProjects, type Project } from "../../data/projects";

export interface AdminProject extends Project {
  status: "Published" | "In Development" | "Archived";
  viewCount: number;
}

export const mockProjects: AdminProject[] = publicProjects.map((p, idx) => ({
  ...p,
  status: idx % 3 === 0 ? "Published" : idx % 3 === 1 ? "In Development" : "Published",
  viewCount: (idx + 1) * 315
}));
