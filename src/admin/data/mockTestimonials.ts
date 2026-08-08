export interface TestimonialRecord {
  id: string;
  clientName: string;
  role: string;
  company: string;
  message: string;
  rating: number;
  photoUrl?: string;
  status: "Pending" | "Approved" | "Rejected" | "Published";
  createdAt: string;
}

export const mockTestimonials: TestimonialRecord[] = [
  {
    id: "TST-001",
    clientName: "Alhaji Usman Mokwa",
    role: "President",
    company: "Paiko Agritech Union",
    message: "AMAGix Technologies engineered the AgriConnect mobile marketplace platform. Our farmers in Niger State can now view commodity prices and connect directly with commercial grain buyers.",
    rating: 5,
    status: "Published",
    createdAt: "2026-08-01 10:00"
  },
  {
    id: "TST-002",
    clientName: "Hajiya Zainab Kida",
    role: "Director of Studies",
    company: "Minna Academy Group",
    message: "The CBT Examination System deployed by AMAGix has completely eliminated paper testing errors and reduced our transcript processing time to instant auto-marking.",
    rating: 5,
    status: "Published",
    createdAt: "2026-07-25 14:30"
  },
  {
    id: "TST-003",
    clientName: "Engr. Patrick Kalu",
    role: "CTO",
    company: "Fintech Venture",
    message: "The PayFlow Digital Wallet gateway API built by AMAGix handled our high-volume card transaction traffic with sub-second response times.",
    rating: 5,
    status: "Approved",
    createdAt: "2026-07-15 09:20"
  },
  {
    id: "TST-004",
    clientName: "Dr. S. Ibrahim",
    role: "Medical Administrator",
    company: "Regional Health Clinic",
    message: "HealthTrack mobile app made appointment scheduling seamless for our clinic patients in Minna.",
    rating: 4,
    status: "Pending",
    createdAt: "2026-08-05 11:10"
  }
];
