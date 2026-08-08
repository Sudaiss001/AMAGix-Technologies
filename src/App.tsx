import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { ScrollToTop } from "./components/common/ScrollToTop";
import { WhatsAppCTA } from "./components/ui/WhatsAppCTA";

// Public Pages
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Services } from "./pages/Services";
import { Projects } from "./pages/Projects";
import { ProjectDetails } from "./pages/ProjectDetails";
import { Courses } from "./pages/Courses";
import { CourseDetails } from "./pages/CourseDetails";
import { Enroll } from "./pages/Enroll";
import { Contact } from "./pages/Contact";
import { NotFound } from "./pages/NotFound";

// Admin Context & Pages
import { AdminAuthProvider } from "./admin/context/AdminAuthContext";
import { AdminLogin } from "./admin/pages/Login";
import { AdminDashboard } from "./admin/pages/Dashboard";
import { AdminEnrollments } from "./admin/pages/Enrollments";
import { AdminEnrollmentDetails } from "./admin/pages/EnrollmentDetails";
import { AdminMessages } from "./admin/pages/Messages";
import { AdminMessageDetails } from "./admin/pages/MessageDetails";
import { AdminCourses } from "./admin/pages/Courses";
import { AdminCourseForm } from "./admin/pages/CourseForm";
import { AdminProjects } from "./admin/pages/Projects";
import { AdminProjectForm } from "./admin/pages/ProjectForm";
import { AdminTestimonials } from "./admin/pages/Testimonials";
import { AdminCertifications } from "./admin/pages/Certifications";
import { AdminSettings } from "./admin/pages/Settings";
import { AdminProfile } from "./admin/pages/Profile";
import { AdminNotFound } from "./admin/pages/AdminNotFound";

const AppContent: React.FC = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  if (isAdminRoute) {
    return (
      <AdminAuthProvider>
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/enrollments" element={<AdminEnrollments />} />
          <Route path="/admin/enrollments/:id" element={<AdminEnrollmentDetails />} />
          <Route path="/admin/messages" element={<AdminMessages />} />
          <Route path="/admin/messages/:id" element={<AdminMessageDetails />} />
          <Route path="/admin/courses" element={<AdminCourses />} />
          <Route path="/admin/courses/new" element={<AdminCourseForm />} />
          <Route path="/admin/courses/:id/edit" element={<AdminCourseForm />} />
          <Route path="/admin/projects" element={<AdminProjects />} />
          <Route path="/admin/projects/new" element={<AdminProjectForm />} />
          <Route path="/admin/projects/:id/edit" element={<AdminProjectForm />} />
          <Route path="/admin/testimonials" element={<AdminTestimonials />} />
          <Route path="/admin/certifications" element={<AdminCertifications />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          <Route path="/admin/profile" element={<AdminProfile />} />
          <Route path="/admin/404" element={<AdminNotFound />} />
          <Route path="/admin/*" element={<AdminNotFound />} />
        </Routes>
      </AdminAuthProvider>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#0B0F17] text-gray-100 font-sans selection:bg-cyan-500 selection:text-white relative">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetails />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:slug" element={<CourseDetails />} />
          <Route path="/enroll" element={<Enroll />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppCTA variant="floating" />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
