import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  Clock, 
  BookOpen, 
  CheckCircle2, 
  HelpCircle, 
  ChevronDown, 
  GraduationCap, 
  UserCheck 
} from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { SEO } from "../components/common/SEO";
import { CTASection } from "../components/layout/CTASection";
import { courses } from "../data/courses";

export const CourseDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const course = courses.find((c) => c.slug === slug);

  if (!course) {
    return (
      <div className="pt-40 pb-20 text-center space-y-6">
        <SEO title="Course Not Found" />
        <h1 className="text-3xl font-bold text-white">Course Not Found</h1>
        <p className="text-gray-400">The training program you are looking for is not listed.</p>
        <Link to="/courses">
          <Button leftIcon={<ArrowLeft className="w-4 h-4" />}>Back to Courses</Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <SEO title={`${course.title} Course`} description={course.shortDescription} />

      {/* Header Banner */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-gradient-to-b from-gray-950 via-slate-900 to-[#0B0F17] relative border-b border-gray-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <button
            onClick={() => navigate("/courses")}
            className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Courses
          </button>

          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="purple" size="md">{course.level}</Badge>
            <span className="text-xs font-mono text-cyan-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> Duration: {course.duration}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            {course.title}
          </h1>
          <p className="text-gray-300 text-base sm:text-lg max-w-3xl leading-relaxed">
            {course.fullDescription}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link to={`/enroll?course=${encodeURIComponent(course.title)}`}>
              <Button size="lg" leftIcon={<GraduationCap className="w-5 h-5" />}>
                Start Your Learning Journey
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content Details Body */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Content (8 cols) */}
            <div className="lg:col-span-8 space-y-12">
              
              {/* What You Will Learn */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white border-b border-gray-800 pb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6 text-cyan-400" /> What You Will Learn
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {course.whatYouWillLearn.map((item, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-gray-900/60 border border-gray-800 flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-2" />
                      <span className="text-xs text-gray-300 leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Course Curriculum Breakdown */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white border-b border-gray-800 pb-3 flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-emerald-400" /> Course Curriculum
                </h2>

                <div className="space-y-4">
                  {course.curriculum.map((module, mIdx) => (
                    <Card key={mIdx} hoverable={false} className="p-6 space-y-3 bg-gray-900/80">
                      <h3 className="text-base font-bold text-white flex items-center gap-2">
                        <span className="p-1.5 rounded bg-cyan-500/10 text-cyan-400 text-xs font-mono">0{mIdx + 1}</span>
                        {module.moduleTitle}
                      </h3>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-gray-800/60">
                        {module.topics.map((top, tIdx) => (
                          <li key={tIdx} className="text-xs text-gray-400 flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-gray-600 shrink-0" />
                            {top}
                          </li>
                        ))}
                      </ul>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Who Is This For */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white border-b border-gray-800 pb-3 flex items-center gap-2">
                  <UserCheck className="w-6 h-6 text-purple-400" /> Target Audience
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {course.whoIsThisFor.map((audience, aIdx) => (
                    <Card key={aIdx} className="p-4 space-y-2 text-center bg-gray-900/50">
                      <span className="text-xs font-semibold text-gray-200">{audience}</span>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Frequently Asked Questions */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white border-b border-gray-800 pb-3 flex items-center gap-2">
                  <HelpCircle className="w-6 h-6 text-teal-400" /> Frequently Asked Questions
                </h2>

                <div className="space-y-3">
                  {course.faqs.map((faq, fIdx) => (
                    <div key={fIdx} className="rounded-xl bg-gray-900/80 border border-gray-800 overflow-hidden">
                      <button
                        onClick={() => setOpenFaq(openFaq === fIdx ? null : fIdx)}
                        className="w-full p-4 text-left font-bold text-sm text-white flex items-center justify-between hover:text-cyan-400 transition-colors"
                      >
                        <span>{faq.question}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openFaq === fIdx ? "rotate-180 text-cyan-400" : "text-gray-500"}`} />
                      </button>
                      <AnimatePresence>
                        {openFaq === fIdx && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="px-4 pb-4 text-xs text-gray-300 leading-relaxed border-t border-gray-800/60 pt-3"
                          >
                            {faq.answer}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Sidebar Details (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              <Card className="p-6 space-y-6 sticky top-28">
                <h3 className="text-lg font-bold text-white border-b border-gray-800 pb-3">
                  Program Overview
                </h3>

                <div className="space-y-4 text-xs">
                  <div className="flex justify-between items-center py-2 border-b border-gray-800/60">
                    <span className="text-gray-400">Duration:</span>
                    <span className="font-mono font-bold text-white">{course.duration}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-800/60">
                    <span className="text-gray-400">Skill Level:</span>
                    <Badge variant="purple">{course.level}</Badge>
                  </div>
                  <div className="space-y-2 py-2 border-b border-gray-800/60">
                    <span className="text-gray-400 block">Learning Formats:</span>
                    <div className="flex flex-wrap gap-1">
                      {course.learningFormat.map((fmt) => (
                        <span key={fmt} className="bg-gray-800 text-gray-300 px-2 py-0.5 rounded text-[10px]">
                          {fmt}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2 py-2">
                    <span className="text-gray-400 block">Prerequisites:</span>
                    <ul className="space-y-1">
                      {course.prerequisites.map((req, rIdx) => (
                        <li key={rIdx} className="text-gray-300 flex items-center gap-1.5">
                          <span className="w-1 h-1 rounded-full bg-cyan-400" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-800">
                  <Link to={`/enroll?course=${encodeURIComponent(course.title)}`} className="w-full block">
                    <Button size="md" className="w-full" leftIcon={<GraduationCap className="w-4 h-4" />}>
                      Enroll Now
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>

          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
};
