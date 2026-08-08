export interface MessageRecord {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: "Unread" | "Read" | "Replied" | "Archived";
  submittedAt: string;
  updatedAt: string;
}

export const mockMessages: MessageRecord[] = [
  {
    id: "MSG-2026-001",
    fullName: "Alhaji Garba Hassan",
    email: "garba.hassan@zenithretail.ng",
    phone: "08031234567",
    subject: "Custom E-Commerce & POS Solution Inquiry",
    message: "Hello AMAGix Technologies, we run a multi-branch retail network in Minna and would like a quote for a custom e-commerce marketplace integrated with our physical barcode POS terminals.",
    status: "Unread",
    submittedAt: "2026-08-08 15:30",
    updatedAt: "2026-08-08 15:30"
  },
  {
    id: "MSG-2026-002",
    fullName: "Dr. K. S. Suleiman",
    email: "suleiman@paiko-health.org",
    phone: "08149876543",
    subject: "Telehealth Mobile App Development Consultation",
    message: "We are seeking to develop a custom appointment scheduling mobile app for regional clinic patients in Niger State. Please let us know your availability for an architecture consultation call.",
    status: "Unread",
    submittedAt: "2026-08-08 11:15",
    updatedAt: "2026-08-08 11:15"
  },
  {
    id: "MSG-2026-003",
    fullName: "Engr. Patrick Kalu",
    email: "patrick.kalu@techinnovations.ng",
    phone: "08055443322",
    subject: "Cybersecurity Vulnerability Audit Quote",
    message: "We need CyberShield Security Suite endpoint auditing for our web portal applications. Kindly send us details of your security audit packages.",
    status: "Read",
    submittedAt: "2026-08-07 16:40",
    updatedAt: "2026-08-07 18:20"
  },
  {
    id: "MSG-2026-004",
    fullName: "Hajiya Maryam Kida",
    email: "m.kida@kida-academy.edu.ng",
    phone: "08166778899",
    subject: "CBT Examination System Licensing",
    message: "Our institution wants to license your CBT Examination System for our upcoming entrance examinations. We require offline test session persistence.",
    status: "Replied",
    submittedAt: "2026-08-05 10:20",
    updatedAt: "2026-08-06 09:30"
  },
  {
    id: "MSG-2026-005",
    fullName: "Samuel Adebayo",
    email: "samuel.a@example.com",
    phone: "08088990011",
    subject: "Corporate Tech Training Partnership",
    message: "Inquiry about corporate group discount packages for our IT staff training in Web Development and Cybersecurity.",
    status: "Archived",
    submittedAt: "2026-07-30 14:00",
    updatedAt: "2026-08-01 12:00"
  }
];
