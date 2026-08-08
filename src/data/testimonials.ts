export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  message: string;
  rating: number;
  avatar?: string;
  isPlaceholder?: boolean;
}

export const testimonials: Testimonial[] = [
  {
    id: "testimonial-1",
    name: "Commercial Client Partner",
    role: "Managing Director",
    company: "Retail Enterprise Partner",
    message: "AMAGix Technologies delivered our web platform with exceptional attention to detail. Their practical software engineering approach streamlined our sales workflow significantly.",
    rating: 5,
    isPlaceholder: true,
  },
  {
    id: "testimonial-2",
    name: "Educational Institution Director",
    role: "Principal Administrator",
    company: "Academy Group",
    message: "The CBT Examination System built by AMAGix has transformed how our center conducts student assessments. Reliable, fast, and completely secure.",
    rating: 5,
    isPlaceholder: true,
  },
  {
    id: "testimonial-3",
    name: "Academy Graduate Student",
    role: "Web Development Alumni",
    company: "AMAGix Training Academy",
    message: "The practical hands-on training at AMAGix Academy equipped me with real coding skills. The mentors guide you through actual project building rather than just theory.",
    rating: 5,
    isPlaceholder: true,
  }
];
