export interface CertificationRecord {
  id: string;
  certificationName: string;
  issuingOrganization: string;
  year: string;
  credentialUrl?: string;
  imageUrl?: string;
  status: "Published" | "Draft" | "Archived";
}

export const mockCertifications: CertificationRecord[] = [
  {
    id: "CERT-001",
    certificationName: "Corporate Software & IT Services License",
    issuingOrganization: "Corporate Affairs Commission (CAC)",
    year: "2024",
    status: "Published"
  },
  {
    id: "CERT-002",
    certificationName: "ISO/IEC 27001 Cybersecurity & Information Security Management Standard",
    issuingOrganization: "International Security Standards Council",
    year: "2025",
    status: "Published"
  },
  {
    id: "CERT-003",
    certificationName: "Accredited Practical Technology Training Center",
    issuingOrganization: "National Information Technology Development Agency (NITDA)",
    year: "2025",
    status: "Published"
  }
];
