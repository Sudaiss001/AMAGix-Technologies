import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  ExternalLink, 
  Github, 
  CheckCircle2, 
  AlertTriangle, 
  Lightbulb, 
  Info,
  Calendar,
  UserCheck
} from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { ProjectPreview } from "../components/ui/ProjectPreview";
import { SEO } from "../components/common/SEO";
import { CTASection } from "../components/layout/CTASection";
import { projects } from "../data/projects";

export const ProjectDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [demoNotice, setDemoNotice] = useState<string | null>(null);

  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="pt-40 pb-20 text-center space-y-6">
        <SEO title="Project Not Found" />
        <h1 className="text-3xl font-bold text-white">Project Not Found</h1>
        <p className="text-gray-400">The project you are looking for does not exist or has been relocated.</p>
        <Link to="/projects">
          <Button leftIcon={<ArrowLeft className="w-4 h-4" />}>Back to Projects</Button>
        </Link>
      </div>
    );
  }

  const handleDemoClick = () => {
    if (project.liveUrl) {
      window.open(project.liveUrl, "_blank", "noopener,noreferrer");
    } else {
      setDemoNotice("Live demo coming soon.");
      setTimeout(() => setDemoNotice(null), 4000);
    }
  };

  return (
    <>
      <SEO title={project.title} description={project.shortDescription} />

      {/* Header Banner */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-16 bg-gradient-to-b from-gray-950 via-slate-900 to-[#0B0F17] relative border-b border-gray-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <button
            onClick={() => navigate("/projects")}
            className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Projects
          </button>

          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="cyan" size="md">{project.category}</Badge>
            <span className="text-xs font-mono text-gray-400 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-gray-500" /> {project.year}
            </span>
            <span className="text-xs font-mono text-gray-400 flex items-center gap-1">
              <UserCheck className="w-3.5 h-3.5 text-gray-500" /> Client: {project.client}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            {project.title}
          </h1>
          <p className="text-gray-300 text-base sm:text-lg max-w-3xl leading-relaxed">
            {project.shortDescription}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            {project.liveUrl ? (
              <Button size="md" onClick={handleDemoClick} rightIcon={<ExternalLink className="w-4 h-4" />}>
                Live Demo
              </Button>
            ) : (
              <Button size="md" disabled className="opacity-50 cursor-not-allowed">
                Live Demo Coming Soon
              </Button>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="secondary" size="md" leftIcon={<Github className="w-4 h-4" />}>
                  GitHub Repository
                </Button>
              </a>
            )}
          </div>

          {demoNotice && (
            <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs inline-flex items-center gap-2">
              <Info className="w-4 h-4 text-cyan-400" /> {demoNotice}
            </div>
          )}
        </div>
      </section>

      {/* Main Details Body */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* Main Visual Image Gallery Frame */}
          <div className="rounded-2xl overflow-hidden border border-gray-800 shadow-2xl">
            <ProjectPreview
              previewUrl={project.previewUrl}
              image={project.image}
              title={project.title}
              alt={project.title}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Content (8 cols) */}
            <div className="lg:col-span-8 space-y-12">
              
              {/* Project Overview */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white border-b border-gray-800 pb-3">
                  Project Overview
                </h2>
                <p className="text-gray-300 text-base leading-relaxed">
                  {project.fullOverview}
                </p>
              </div>

              {/* Problem & Solution */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6 space-y-3 border-red-500/20 bg-gray-900/80">
                  <div className="p-2.5 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 w-fit">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white">The Challenge</h3>
                  <p className="text-xs text-gray-300 leading-relaxed">{project.problem}</p>
                </Card>

                <Card className="p-6 space-y-3 border-emerald-500/20 bg-gray-900/80">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 w-fit">
                    <Lightbulb className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white">The Solution</h3>
                  <p className="text-xs text-gray-300 leading-relaxed">{project.solution}</p>
                </Card>
              </div>

              {/* Key Features List */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white border-b border-gray-800 pb-3">
                  Key Features & Technical Capabilities
                </h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.keyFeatures.map((feat, i) => (
                    <li key={i} className="flex items-start space-x-3 p-3.5 rounded-xl bg-gray-900/60 border border-gray-800">
                      <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                      <span className="text-xs text-gray-300 leading-relaxed">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Right Sidebar (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              <Card className="p-6 space-y-6">
                <h3 className="text-lg font-bold text-white border-b border-gray-800 pb-3">
                  Technologies Used
                </h3>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="text-xs font-mono font-semibold text-cyan-300 bg-cyan-500/10 px-3 py-1 rounded-lg border border-cyan-500/20">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t border-gray-800 space-y-3">
                  {project.liveUrl ? (
                    <Button size="md" className="w-full" onClick={handleDemoClick} rightIcon={<ExternalLink className="w-4 h-4" />}>
                      Live Demo
                    </Button>
                  ) : (
                    <Button size="md" disabled className="w-full opacity-50 cursor-not-allowed text-xs">
                      Live Demo Coming Soon
                    </Button>
                  )}
                  <Link to="/contact">
                    <Button variant="secondary" size="md" className="w-full">
                      Request Similar Project
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
