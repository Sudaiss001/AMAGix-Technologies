import { mockDashboardStats, mockActivities, mockCourseInterestData, type DashboardStats, type ActivityItem } from "../admin/data/mockDashboard";
import { mockEnrollments, type EnrollmentRecord } from "../admin/data/mockEnrollments";
import { mockMessages, type MessageRecord } from "../admin/data/mockMessages";
import { mockCourses, type AdminCourse } from "../admin/data/mockCourses";
import { mockProjects, type AdminProject } from "../admin/data/mockProjects";
import { mockTestimonials, type TestimonialRecord } from "../admin/data/mockTestimonials";
import { mockCertifications, type CertificationRecord } from "../admin/data/mockCertifications";
import { siteConfig, type SiteConfig } from "../data/site";

// Shared API Response Wrapper matching future Laravel REST API responses
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

// In-Memory Storage for Demo Session State Mutations
let enrollmentsStore = [...mockEnrollments];
let messagesStore = [...mockMessages];
let coursesStore = [...mockCourses];
let projectsStore = [...mockProjects];
let testimonialsStore = [...mockTestimonials];
let certificationsStore = [...mockCertifications];
let siteSettingsStore = { ...siteConfig };

const delay = (ms = 250) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Admin API Abstraction Layer
 * Structured for future Laravel REST API backend connection (/api/v1/admin/...)
 */
export const adminApi = {
  // --- Dashboard API ---
  async getDashboardStats(): Promise<ApiResponse<{ stats: DashboardStats; activities: ActivityItem[]; courseInterest: typeof mockCourseInterestData }>> {
    await delay();
    return {
      success: true,
      data: {
        stats: {
          ...mockDashboardStats,
          totalEnrollments: enrollmentsStore.length,
          totalMessages: messagesStore.length,
          unreadMessages: messagesStore.filter((m) => m.status === "Unread").length,
          totalCourses: coursesStore.length,
          totalProjects: projectsStore.length
        },
        activities: mockActivities,
        courseInterest: mockCourseInterestData
      }
    };
  },

  // --- Enrollments API ---
  async getEnrollments(): Promise<ApiResponse<EnrollmentRecord[]>> {
    await delay();
    return { success: true, data: [...enrollmentsStore] };
  },

  async getEnrollmentById(id: string): Promise<ApiResponse<EnrollmentRecord | null>> {
    await delay();
    const record = enrollmentsStore.find((e) => e.id === id) || null;
    return { success: Boolean(record), data: record };
  },

  async updateEnrollmentStatus(id: string, status: EnrollmentRecord["status"]): Promise<ApiResponse<EnrollmentRecord | null>> {
    await delay();
    const idx = enrollmentsStore.findIndex((e) => e.id === id);
    if (idx !== -1) {
      enrollmentsStore[idx] = {
        ...enrollmentsStore[idx],
        status,
        updatedAt: new Date().toISOString().replace("T", " ").substring(0, 16)
      };
      return { success: true, message: `Status updated to ${status}`, data: enrollmentsStore[idx] };
    }
    return { success: false, message: "Enrollment record not found", data: null };
  },

  // --- Messages API ---
  async getMessages(): Promise<ApiResponse<MessageRecord[]>> {
    await delay();
    return { success: true, data: [...messagesStore] };
  },

  async getMessageById(id: string): Promise<ApiResponse<MessageRecord | null>> {
    await delay();
    const record = messagesStore.find((m) => m.id === id) || null;
    if (record && record.status === "Unread") {
      record.status = "Read";
    }
    return { success: Boolean(record), data: record };
  },

  async updateMessageStatus(id: string, status: MessageRecord["status"]): Promise<ApiResponse<MessageRecord | null>> {
    await delay();
    const idx = messagesStore.findIndex((m) => m.id === id);
    if (idx !== -1) {
      messagesStore[idx] = {
        ...messagesStore[idx],
        status,
        updatedAt: new Date().toISOString().replace("T", " ").substring(0, 16)
      };
      return { success: true, message: `Message status updated to ${status}`, data: messagesStore[idx] };
    }
    return { success: false, message: "Message record not found", data: null };
  },

  // --- Courses API ---
  async getCourses(): Promise<ApiResponse<AdminCourse[]>> {
    await delay();
    return { success: true, data: [...coursesStore] };
  },

  async getCourseById(id: string): Promise<ApiResponse<AdminCourse | null>> {
    await delay();
    const course = coursesStore.find((c) => c.id === id || c.slug === id) || null;
    return { success: Boolean(course), data: course };
  },

  async saveCourse(courseData: Partial<AdminCourse>): Promise<ApiResponse<AdminCourse>> {
    await delay();
    if (courseData.id) {
      const idx = coursesStore.findIndex((c) => c.id === courseData.id);
      if (idx !== -1) {
        coursesStore[idx] = { ...coursesStore[idx], ...courseData } as AdminCourse;
        return { success: true, message: "Course updated successfully", data: coursesStore[idx] };
      }
    }

    const newCourse: AdminCourse = {
      id: `crs-${Date.now()}`,
      slug: courseData.slug || courseData.title?.toLowerCase().replace(/\s+/g, "-") || "new-course",
      title: courseData.title || "Untitled Course",
      category: courseData.category || "Web Development",
      shortDescription: courseData.shortDescription || "",
      fullDescription: courseData.fullDescription || "",
      duration: courseData.duration || "8 Weeks",
      level: courseData.level || "Beginner to Intermediate",
      curriculum: courseData.curriculum || [],
      learningFormat: courseData.learningFormat || ["Physical Classes in Minna Hub"],
      faqs: [],
      status: courseData.status || "Published",
      enrolledStudentsCount: 0
    };

    coursesStore.unshift(newCourse);
    return { success: true, message: "Course created successfully", data: newCourse };
  },

  async deleteCourse(id: string): Promise<ApiResponse<boolean>> {
    await delay();
    coursesStore = coursesStore.filter((c) => c.id !== id);
    return { success: true, message: "Course deleted successfully", data: true };
  },

  // --- Projects API ---
  async getProjects(): Promise<ApiResponse<AdminProject[]>> {
    await delay();
    return { success: true, data: [...projectsStore] };
  },

  async getProjectById(id: string): Promise<ApiResponse<AdminProject | null>> {
    await delay();
    const project = projectsStore.find((p) => p.id.toString() === id || p.slug === id) || null;
    return { success: Boolean(project), data: project };
  },

  async saveProject(projectData: Partial<AdminProject>): Promise<ApiResponse<AdminProject>> {
    await delay();
    if (projectData.id) {
      const idx = projectsStore.findIndex((p) => p.id === projectData.id);
      if (idx !== -1) {
        projectsStore[idx] = { ...projectsStore[idx], ...projectData } as AdminProject;
        return { success: true, message: "Project updated successfully", data: projectsStore[idx] };
      }
    }

    const newProject: AdminProject = {
      id: Date.now(),
      slug: projectData.slug || projectData.title?.toLowerCase().replace(/\s+/g, "-") || "new-project",
      title: projectData.title || "Untitled Project",
      category: projectData.category || "Web Development",
      shortDescription: projectData.shortDescription || "",
      fullOverview: projectData.fullOverview || "",
      problem: projectData.problem || "",
      solution: projectData.solution || "",
      keyFeatures: projectData.keyFeatures || [],
      previewUrl: projectData.previewUrl || "",
      liveUrl: projectData.liveUrl || "",
      githubUrl: projectData.githubUrl || "",
      image: projectData.image || "/images/projects/ecommerce.png",
      gallery: projectData.gallery || [],
      technologies: projectData.technologies || ["React", "TypeScript"],
      featured: projectData.featured || false,
      client: projectData.client || "AMAGix Enterprise Client",
      year: projectData.year || "2026",
      status: projectData.status || "Published",
      viewCount: 0
    };

    projectsStore.unshift(newProject);
    return { success: true, message: "Project created successfully", data: newProject };
  },

  async deleteProject(id: number | string): Promise<ApiResponse<boolean>> {
    await delay();
    projectsStore = projectsStore.filter((p) => p.id.toString() !== id.toString());
    return { success: true, message: "Project deleted successfully", data: true };
  },

  // --- Testimonials API ---
  async getTestimonials(): Promise<ApiResponse<TestimonialRecord[]>> {
    await delay();
    return { success: true, data: [...testimonialsStore] };
  },

  async updateTestimonialStatus(id: string, status: TestimonialRecord["status"]): Promise<ApiResponse<TestimonialRecord | null>> {
    await delay();
    const idx = testimonialsStore.findIndex((t) => t.id === id);
    if (idx !== -1) {
      testimonialsStore[idx].status = status;
      return { success: true, message: `Testimonial set to ${status}`, data: testimonialsStore[idx] };
    }
    return { success: false, message: "Testimonial not found", data: null };
  },

  // --- Certifications API ---
  async getCertifications(): Promise<ApiResponse<CertificationRecord[]>> {
    await delay();
    return { success: true, data: [...certificationsStore] };
  },

  async saveCertification(certData: Partial<CertificationRecord>): Promise<ApiResponse<CertificationRecord>> {
    await delay();
    if (certData.id) {
      const idx = certificationsStore.findIndex((c) => c.id === certData.id);
      if (idx !== -1) {
        certificationsStore[idx] = { ...certificationsStore[idx], ...certData } as CertificationRecord;
        return { success: true, message: "Certification updated", data: certificationsStore[idx] };
      }
    }

    const newCert: CertificationRecord = {
      id: `CERT-${Date.now()}`,
      certificationName: certData.certificationName || "New Certification",
      issuingOrganization: certData.issuingOrganization || "Issuing Body",
      year: certData.year || "2026",
      status: certData.status || "Published"
    };

    certificationsStore.unshift(newCert);
    return { success: true, message: "Certification created", data: newCert };
  },

  async deleteCertification(id: string): Promise<ApiResponse<boolean>> {
    await delay();
    certificationsStore = certificationsStore.filter((c) => c.id !== id);
    return { success: true, message: "Certification deleted", data: true };
  },

  // --- Site Settings API ---
  async getSiteSettings(): Promise<ApiResponse<SiteConfig>> {
    await delay();
    return { success: true, data: siteSettingsStore };
  },

  async updateSiteSettings(newSettings: Partial<SiteConfig>): Promise<ApiResponse<SiteConfig>> {
    await delay();
    siteSettingsStore = { ...siteSettingsStore, ...newSettings };
    return { success: true, message: "Settings updated successfully", data: siteSettingsStore };
  }
};
