import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Globe, 
  Monitor, 
  Smartphone, 
  ShieldAlert, 
  Palette, 
  Clock, 
  GraduationCap, 
  ArrowRight 
} from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { SEO } from "../components/common/SEO";
import { CTASection } from "../components/layout/CTASection";
import { courses } from "../data/courses";

export const Courses: React.FC = () => {
  const getCourseIcon = (iconName: string) => {
    switch (iconName) {
      case "Globe":
        return <Globe className="w-7 h-7 text-cyan-400" />;
      case "Monitor":
        return <Monitor className="w-7 h-7 text-emerald-400" />;
      case "Smartphone":
        return <Smartphone className="w-7 h-7 text-blue-400" />;
      case "ShieldAlert":
        return <ShieldAlert className="w-7 h-7 text-teal-400" />;
      case "Palette":
        return <Palette className="w-7 h-7 text-purple-400" />;
      default:
        return <GraduationCap className="w-7 h-7 text-cyan-400" />;
    }
  };

  return (
    <>
      <SEO title="Technology Training & Academy" description="Learn Web Development, Computer Fundamentals, Mobile Apps, Cybersecurity, and UI/UX Design in Minna, Niger State with AMAGix Technologies." />

      {/* Header Banner */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-b from-gray-950 via-slate-900 to-[#0B0F17] relative border-b border-gray-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-4">
          <Badge variant="cyan" size="md">AMAGix Training Academy</Badge>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Learn<span className="text-cyan-400">.</span> Build<span className="text-emerald-400">.</span> Grow<span className="text-purple-400">.</span>
          </h1>
          <p className="text-gray-300 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            Develop practical technology skills through hands-on training designed for beginners and aspiring professionals in Minna, Niger State, Nigeria.
          </p>
        </div>
      </section>

      {/* Courses Catalog Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <Card className="h-full flex flex-col justify-between group p-6 space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="p-3 rounded-2xl bg-gray-800/60 border border-gray-700/60 group-hover:border-cyan-400/40 transition-colors">
                        {getCourseIcon(course.iconName)}
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <Badge variant="purple">{course.level}</Badge>
                        <span className="text-xs font-mono text-cyan-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {course.duration}
                        </span>
                      </div>
                    </div>

                    <h2 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {course.title}
                    </h2>

                    <p className="text-xs text-gray-400 leading-relaxed line-clamp-3">
                      {course.shortDescription}
                    </p>

                    <div className="space-y-2 pt-2 border-t border-gray-800">
                      <span className="text-xs font-semibold text-gray-300">Key Topics:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {course.topics.map((topic) => (
                          <span key={topic} className="text-[10px] font-mono text-gray-300 bg-gray-800/80 px-2 py-0.5 rounded border border-gray-700/60">
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-800/80 flex items-center gap-3">
                    <Link to={`/courses/${course.slug}`} className="flex-1">
                      <Button variant="secondary" size="sm" className="w-full">
                        View Details
                      </Button>
                    </Link>
                    <Link to={`/enroll?course=${encodeURIComponent(course.title)}`}>
                      <Button size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                        Enroll
                      </Button>
                    </Link>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
};
