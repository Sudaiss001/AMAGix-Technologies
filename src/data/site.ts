export interface SiteConfig {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  supportingText: string;
  location: {
    address: string;
    city: string;
    state: string;
    country: string;
    fullLocation: string;
  };
  contact: {
    email: string;
    phone: string;
    whatsapp: string;
    whatsappFormatted: string;
  };
  socials: {
    facebook: string;
    twitter: string;
    linkedin: string;
    github: string;
    instagram: string;
  };
  stats: Array<{
    label: string;
    value: number;
    suffix: string;
    description: string;
  }>;
}

export const siteConfig: SiteConfig = {
  name: "AMAGix Technologies",
  shortName: "AMAGix",
  tagline: "Building Digital Solutions. Empowering the Future.",
  description: "AMAGix Technologies delivers modern digital solutions and practical technology training designed to help businesses and individuals thrive in a digital world.",
  supportingText: "We design, develop, and deliver modern digital solutions while equipping the next generation with practical technology skills.",
  location: {
    address: "Minna",
    city: "Minna",
    state: "Niger State",
    country: "Nigeria",
    fullLocation: "Minna, Niger State, Nigeria"
  },
  contact: {
    email: import.meta.env.VITE_COMPANY_EMAIL || "amagixtechnologies@gmail.com",
    phone: import.meta.env.VITE_COMPANY_PHONE || "08139081076",
    whatsapp: import.meta.env.VITE_WHATSAPP_NUMBER || "2348139081076",
    whatsappFormatted: "08139081076"
  },
  socials: {
    facebook: "https://facebook.com/amagixtech",
    twitter: "https://twitter.com/amagixtech",
    linkedin: "https://linkedin.com/company/amagixtech",
    github: "https://github.com/amagixtech",
    instagram: "https://instagram.com/amagixtech"
  },
  stats: [
    { label: "Delivered Projects", value: 10, suffix: "+", description: "Successful digital software applications" },
    { label: "Technology Services", value: 5, suffix: "+", description: "Core enterprise-grade service areas" },
    { label: "Trained Learners", value: 100, suffix: "+", description: "Students empowered with technical skills" },
    { label: "Client Satisfaction", value: 100, suffix: "%", description: "Uncompromised commitment to quality" }
  ]
};
