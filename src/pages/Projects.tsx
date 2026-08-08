import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Info, Filter } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { ProjectPreview } from "../components/ui/ProjectPreview";
import { SEO } from "../components/common/SEO";
import { CTASection } from "../components/layout/CTASection";
import { projects, type Project } from "../data/projects";

export const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [demoNotice, setDemoNotice] = useState<string | null>(null);

  const categories = ["All", "Web Development", "Software Development", "Mobile App Development", "Cybersecurity"];

  const filteredProjects = selectedCategory === "All"
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  const handleDemoClick = (project: Project) => {
    if (project.liveUrl) {
      window.open(project.liveUrl, "_blank", "noopener,noreferrer");
    } else {
      setDemoNotice(`Live demo for "${project.title}" is coming soon!`);
      setTimeout(() => setDemoNotice(null), 4000);
    }
  };

  return (
    <>
      <SEO title="Projects Portfolio | AMAGix Work Showcase" description="Discover software applications, CBT exam portals, security suites, and web applications engineered by AMAGix Technologies." />

      {/* Header Banner */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-b from-gray-950 via-slate-900 to-[#0B0F17] relative border-b border-gray-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-4">
          <Badge variant="cyan" size="md">Our Portfolio</Badge>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Featured <span className="gradient-text">Software Projects</span>
          </h1>
          <p className="text-gray-300 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            Explore our portfolio of production applications, custom software platforms, and digital solutions engineered for client success.
          </p>
        </div>
      </section>

      {/* Main Portfolio Grid Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* Category Filter Bar */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 bg-gray-900/60 p-2 rounded-2xl border border-gray-800/80 max-w-3xl mx-auto">
            <span className="text-xs font-mono text-gray-400 px-3 flex items-center gap-1.5 hidden sm:flex">
              <Filter className="w-3.5 h-3.5" /> Filter:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                  selectedCategory === cat
                    ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20"
                    : "text-gray-400 hover:text-white hover:bg-gray-800/60"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Live Demo Notification Toast */}
          <AnimatePresence>
            {demoNotice && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="max-w-xl mx-auto p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs flex items-center gap-3 shadow-lg"
              >
                <Info className="w-5 h-5 shrink-0 text-cyan-400" />
                <span>{demoNotice}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="group p-0 overflow-hidden flex flex-col justify-between">
                <div className="space-y-4">
                  {/* REAL PROJECT INTERFACE PREVIEW FIRST */}
                  <div className="p-2 pb-0">
                    <ProjectPreview
                      previewUrl={project.previewUrl}
                      image={project.image}
                      title={project.title}
                      alt={project.title}
                    />
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge variant="emerald">{project.category}</Badge>
                      <span className="text-[11px] font-mono text-gray-500">{project.year}</span>
                    </div>

                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-gray-400 line-clamp-3 leading-relaxed">
                      {project.shortDescription}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="text-[10px] font-mono text-gray-400 bg-gray-800/80 px-2 py-0.5 rounded border border-gray-700/60">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 flex items-center gap-3 border-t border-gray-800/60 mt-4">
                  <Link to={`/projects/${project.slug}`} className="flex-1">
                    <Button variant="secondary" size="sm" className="w-full">
                      View Details
                    </Button>
                  </Link>
                  {project.liveUrl ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDemoClick(project)}
                      rightIcon={<ExternalLink className="w-3.5 h-3.5" />}
                    >
                      Live Demo
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      disabled
                      className="opacity-50 cursor-not-allowed text-[11px]"
                    >
                      Live Demo Coming Soon
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>

        </div>
      </section>

      <CTASection />
    </>
  );
};
