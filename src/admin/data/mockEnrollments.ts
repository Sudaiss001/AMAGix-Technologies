export interface EnrollmentRecord {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  location: string;
  educationLevel: string;
  courseTitle: string;
  learningFormat: string;
  additionalMessage?: string;
  status: "New" | "Reviewing" | "Contacted" | "Enrolled" | "Rejected";
  submittedAt: string;
  updatedAt: string;
}

export const mockEnrollments: EnrollmentRecord[] = [
  {
    id: "ENR-2026-001",
    fullName: "Amina Mohammed",
    email: "amina.mohammed@example.com",
    phone: "08139081076",
    location: "Minna, Niger State",
    educationLevel: "Undergraduate / University Student",
    courseTitle: "Full-Stack Web Development",
    learningFormat: "Physical Classes in Minna Hub",
    additionalMessage: "I want to gain practical hands-on experience in React, TypeScript, and Laravel to build real web software.",
    status: "New",
    submittedAt: "2026-08-08 14:20",
    updatedAt: "2026-08-08 14:20"
  },
  {
    id: "ENR-2026-002",
    fullName: "Ibrahim Abubakar",
    email: "ibrahim.a@example.com",
    phone: "08023456789",
    location: "Minna, Niger State",
    educationLevel: "Graduate / Job Seeker",
    courseTitle: "Cybersecurity Fundamentals",
    learningFormat: "Hybrid Self-Paced + Mentorship",
    additionalMessage: "Looking to transition into cybersecurity auditing and ethical hacking.",
    status: "Reviewing",
    submittedAt: "2026-08-07 11:45",
    updatedAt: "2026-08-07 16:30"
  },
  {
    id: "ENR-2026-003",
    fullName: "Grace Danjuma",
    email: "grace.d@example.com",
    phone: "08129876543",
    location: "Bida, Niger State",
    educationLevel: "Secondary School Graduate",
    courseTitle: "Computer Fundamentals & Digital Skills",
    learningFormat: "Physical Classes in Minna Hub",
    additionalMessage: "Interested in computer operations, Microsoft Office suite, and web navigation.",
    status: "Contacted",
    submittedAt: "2026-08-06 09:15",
    updatedAt: "2026-08-06 14:10"
  },
  {
    id: "ENR-2026-004",
    fullName: "Usman Paiko",
    email: "usman.paiko@example.com",
    phone: "08091122334",
    location: "Paikoro, Niger State",
    educationLevel: "Working Professional",
    courseTitle: "Mobile App Development",
    learningFormat: "Live Online Webinars",
    additionalMessage: "I am a backend developer wanting to learn React Native and Flutter mobile app development.",
    status: "Enrolled",
    submittedAt: "2026-08-04 16:50",
    updatedAt: "2026-08-05 10:00"
  },
  {
    id: "ENR-2026-005",
    fullName: "Fatima Bello",
    email: "fatima.bello@example.com",
    phone: "08155443322",
    location: "Suleja, Niger State",
    educationLevel: "Undergraduate",
    courseTitle: "Graphics & UI/UX Design",
    learningFormat: "Physical Classes in Minna Hub",
    additionalMessage: "Excited about Figma prototyping, wireframing, and branding design.",
    status: "Enrolled",
    submittedAt: "2026-08-02 13:10",
    updatedAt: "2026-08-03 09:20"
  },
  {
    id: "ENR-2026-006",
    fullName: "David Okafor",
    email: "david.o@example.com",
    phone: "08033221100",
    location: "Minna, Niger State",
    educationLevel: "High School",
    courseTitle: "Full-Stack Web Development",
    learningFormat: "Live Online Webinars",
    additionalMessage: "Want to learn web programming from scratch.",
    status: "Rejected",
    submittedAt: "2026-07-28 10:00",
    updatedAt: "2026-07-29 11:15"
  }
];
