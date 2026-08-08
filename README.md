# AMAGix Technologies — Enterprise Website & Academy Portal

**Building Digital Solutions. Empowering the Future.**

AMAGix Technologies is a modern technology company based in **Minna, Niger State, Nigeria**, providing digital software solutions and practical hands-on technology training.

---

## 🚀 Tech Stack

- **Frontend Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS + Custom Glassmorphic Utilities
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Routing**: React Router v7 (`react-router-dom`)
- **API Architecture**: Service abstraction layer (`src/services/api.ts`) ready for REST/Laravel backend connection

---

## 📁 Project Structure

```
src/
├── assets/                 # Brand assets & graphic placeholders
├── components/
│   ├── layout/             # Navbar, Footer, MobileMenu, CTASection
│   ├── ui/                 # Button, Card, Badge, Input, Select, Textarea, SectionHeading, WhatsAppCTA, ProjectScreenshot
│   ├── common/             # SEO metadata, ScrollToTop, AnimatedCounter, ProcessTimeline
│   ├── home/               # Home page specific modules
│   ├── projects/           # Portfolio showcase modules
│   ├── courses/            # Academy modules
│   └── contact/            # Contact modules
├── data/
│   ├── site.ts             # Global company info, stats, socials, location (Minna, Niger State)
│   ├── services.ts         # Service offerings specifications
│   ├── projects.ts         # Portfolio projects with real screenshots & fallback UI frames
│   ├── courses.ts          # Training programs, curriculums, & FAQs
│   └── process.ts          # 6-step engineering methodology
├── services/
│   └── api.ts              # Decoupled backend API connector with mock fallback
├── pages/
│   ├── Home.tsx            # Main Landing Page
│   ├── About.tsx           # Company Mission, Vision, Core Values, & Process
│   ├── Services.tsx        # Comprehensive Services Breakdown
│   ├── Projects.tsx        # Filterable Portfolio Showcase
│   ├── ProjectDetails.tsx  # Deep-dive Project Page
│   ├── Courses.tsx         # Training Programs Page
│   ├── CourseDetails.tsx   # Course Syllabus & Details Page
│   ├── Enroll.tsx          # Interactive Student Application Form
│   ├── Contact.tsx         # Contact Form, Info, & Embedded Map
│   └── NotFound.tsx        # Technical 404 Page
├── App.tsx                 # Router setup & layout wrapper
└── index.css               # Tailwind directives & dark mode variables
```

---

## 🛠️ Quick Start & Local Development

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Define configuration settings inside `.env`:

```env
VITE_API_URL=https://api.amagixtech.com/v1
VITE_COMPANY_EMAIL=amagixtechnologies@gmail.com
VITE_COMPANY_PHONE=08139081076
VITE_WHATSAPP_NUMBER=2348139081076
VITE_MAP_URL=https://www.google.com/maps/embed?...
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build for Production

```bash
npm run build
```

The production output bundle will be generated inside the `dist/` directory.

---

## ➕ How to Manage Content

### Adding a New Project

Edit [`src/data/projects.ts`](file:///c:/Users/ObiTech%20Computers/Desktop/AMAGix%20Technologies/src/data/projects.ts) and insert a new project object:

```ts
{
  id: 7,
  slug: "new-system",
  title: "New System Name",
  category: "Web Development",
  shortDescription: "Short summary...",
  fullOverview: "Detailed breakdown...",
  problem: "Challenge faced...",
  solution: "Engineering approach...",
  keyFeatures: ["Feature 1", "Feature 2"],
  image: "/images/projects/new-system.png",
  gallery: ["/images/projects/new-system.png"],
  technologies: ["React", "Laravel"],
  liveUrl: "https://example.com", // Leave empty string for "Live demo coming soon"
  githubUrl: "",
  featured: true,
  client: "Client Name",
  year: "2026"
}
```

### Adding a New Course

Edit [`src/data/courses.ts`](file:///c:/Users/ObiTech%20Computers/Desktop/AMAGix%20Technologies/src/data/courses.ts) and add a course object into the array.

### Updating Company Info & Contact Details

Edit [`src/data/site.ts`](file:///c:/Users/ObiTech%20Computers/Desktop/AMAGix%20Technologies/src/data/site.ts) or set environment variables in `.env`.

---

## 🔗 Connecting to a Backend API

The application forms (`/enroll` and `/contact`) use [`src/services/api.ts`](file:///c:/Users/ObiTech%20Computers/Desktop/AMAGix%20Technologies/src/services/api.ts).

To connect to a real backend (e.g. Laravel / Node / Express REST API):
1. Set `VITE_API_URL` in `.env` to your API domain (e.g. `https://api.yourdomain.com/v1`).
2. The service functions `submitEnrollment()` and `submitContactForm()` will automatically issue `POST` requests to `${VITE_API_URL}/enrollments` and `${VITE_API_URL}/contact`.
3. If `VITE_API_URL` is empty, the application seamlessly uses a clean development fallback mode with realistic loading latency and feedback alerts.

---

## 📄 License & Ownership

© 2026 **AMAGix Technologies**. All Rights Reserved.  
Minna, Niger State, Nigeria.
