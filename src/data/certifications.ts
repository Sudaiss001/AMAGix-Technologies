export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialUrl?: string;
  image?: string;
  isVerified: boolean;
  isPlaceholder?: boolean;
}

export const certifications: Certification[] = [
  {
    id: "cert-placeholder-1",
    title: "Software Engineering & Quality Standard",
    issuer: "Certification Partner",
    issueDate: "2026",
    credentialUrl: "",
    isVerified: true,
    isPlaceholder: true,
  },
  {
    id: "cert-placeholder-2",
    title: "Cybersecurity & Web Defence Accreditation",
    issuer: "Security Standard Board",
    issueDate: "2025",
    credentialUrl: "",
    isVerified: true,
    isPlaceholder: true,
  },
  {
    id: "cert-placeholder-3",
    title: "Technology Training Delivery Standard",
    issuer: "Educational Accreditation Body",
    issueDate: "2025",
    credentialUrl: "",
    isVerified: true,
    isPlaceholder: true,
  }
];
