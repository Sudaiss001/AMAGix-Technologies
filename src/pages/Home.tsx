import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Globe, 
  Smartphone, 
  Code, 
  Layout, 
  ShieldCheck, 
  GraduationCap, 
  CheckCircle2, 
  ExternalLink, 
  Sparkles,
  Cpu,
  Zap,
  Users
} from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { SectionHeading } from "../components/ui/SectionHeading";
import { ProjectPreview } from "../components/ui/ProjectPreview";
import { AnimatedCounter } from "../components/common/AnimatedCounter";
import { SEO } from "../components/common/SEO";
import { CTASection } from "../components/layout/CTASection";

import { HeroVisual3D } from "../components/home/HeroVisual3D";
import { TechStackSection } from "../components/home/TechStackSection";
import { CertificationsSection } from "../components/home/CertificationsSection";
import { TestimonialsSection } from "../components/home/TestimonialsSection";
import { TrustSection } from "../components/home/TrustSection";

import { siteConfig } from "../data/site";
import { services } from "../data/services";
import { projects } from "../data/projects";
import { courses } from "../data/courses";

export const Home: React.FC = () => {
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);
  const featuredCourses = courses.filter((c) => c.featured).slice(0, 3);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case "Globe":
        return <Globe className="w-6 h-6 text-cyan-400" />;
      case "Smartphone":
        return <Smartphone className="w-6 h-6 text-emerald-400" />;
      case "Code":
        return <Code className="w-6 h-6 text-blue-400" />;
      case "Layout":
        return <Layout className="w-6 h-6 text-purple-400" />;
      case "ShieldCheck":
        return <ShieldCheck className="w-6 h-6 text-teal-400" />;
      case "GraduationCap":
        return <GraduationCap className="w-6 h-6 text-cyan-400" />;
      default:
        return <Code className="w-6 h-6 text-cyan-400" />;
    }
  };

  const whyUsItems = [
    {
      title: "Practical Approach",
      description: "We focus on real-world solutions that solve operational bottlenecks and deliver measurable value.",
      icon: <Zap className="w-6 h-6 text-cyan-400" />
    },
    {
      title: "Modern Technology",
      description: "We leverage industry-tested frameworks and high-efficiency development methodologies.",
      icon: <Cpu className="w-6 h-6 text-emerald-400" />
    },
    {
      title: "User-Centered Design",
      description: "Our intuitive interfaces are designed around the human workflows of those who use them daily.",
      icon: <Layout className="w-6 h-6 text-purple-400" />
    },
    {
      title: "Continuous Learning",
      description: "We believe practical technology education should be accessible, empowering, and outcome-focused.",
      icon: <GraduationCap className="w-6 h-6 text-teal-400" />
    },
    {
      title: "Reliable Support",
      description: "We partner closely with clients from initial concept through deployment and continuous post-launch care.",
      icon: <Users className="w-6 h-6 text-blue-400" />
    }
  ];

  return (
    <>
      <SEO title="Digital Solutions & Technology Training" />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        {/* Glowing Background Gradients */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-r from-cyan-500/10 via-emerald-500/10 to-blue-500/10 blur-[130px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Hero Content (7 cols) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-6 text-center lg:text-left"
            >
              <Badge variant="cyan" size="md">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Minna, Niger State, Nigeria
              </Badge>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
                Building Digital Solutions. <br className="hidden sm:inline" />
                <span className="gradient-text">Empowering the Future.</span>
              </h1>

              <p className="text-gray-300 text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {siteConfig.description}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link to="/services" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto" rightIcon={<ArrowRight className="w-5 h-5" />}>
                    Explore Our Services
                  </Button>
                </Link>
                <Link to="/enroll" className="w-full sm:w-auto">
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                    Enroll in Training
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Right Interactive 3D Visual Composition (5 cols) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-5 relative"
            >
              <HeroVisual3D />
            </motion.div>

          </div>
        </div>
      </section>

      {/* Hero Stats Section */}
      <section className="py-10 border-y border-gray-800/80 bg-gray-950/60 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {siteConfig.stats.map((stat, idx) => (
              <div key={idx} className="text-center space-y-1">
                <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight gradient-text">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm font-semibold text-gray-200">{stat.label}</div>
                <div className="text-xs text-gray-500 hidden sm:block">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-6 space-y-6"
            >
              <Badge variant="cyan" size="md">About AMAGix</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
                Technology Built Around <span className="gradient-text">People & Growth</span>
              </h2>
              <p className="text-gray-300 text-base leading-relaxed">
                AMAGix Technologies combines modern software engineering with practical technology education. We believe that technology should solve real problems for businesses while equipping individuals with actionable skills to thrive in the digital economy.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                {[
                  { title: "Innovation", desc: "Modern engineering standards" },
                  { title: "Practical Learning", desc: "Project-driven skill building" },
                  { title: "Quality", desc: "Robust & scalable delivery" },
                  { title: "Reliability", desc: "Long-term client partnership" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start space-x-3 p-3 rounded-xl bg-gray-900/60 border border-gray-800">
                    <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-white">{item.title}</h4>
                      <p className="text-xs text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <Link to="/about">
                  <Button variant="outline" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    Learn More About Us
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-6"
            >
              <Card hoverable={false} className="p-8 space-y-6 bg-gradient-to-br from-gray-900 via-slate-900 to-gray-950">
                <div className="space-y-2">
                  <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">Our Core Philosophy</span>
                  <h3 className="text-2xl font-bold text-white">Dual Engine of Impact</h3>
                </div>

                <div className="space-y-4 text-sm text-gray-300">
                  <div className="p-4 rounded-xl bg-gray-950/60 border border-gray-800/80 space-y-1">
                    <h4 className="font-bold text-white flex items-center gap-2">
                      <Code className="w-4 h-4 text-cyan-400" /> Digital Solutions Engine
                    </h4>
                    <p className="text-xs text-gray-400">Building web applications, mobile tools, and custom software for local and international organizations.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-gray-950/60 border border-gray-800/80 space-y-1">
                    <h4 className="font-bold text-white flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-emerald-400" /> Skill Empowerment Academy
                    </h4>
                    <p className="text-xs text-gray-400">Equipping aspiring developers, designers, and IT specialists in Minna, Niger State with practical hands-on training.</p>
                  </div>
                </div>

                <div className="text-xs text-gray-400 font-mono flex items-center justify-between border-t border-gray-800 pt-4">
                  <span>Base: Minna, Niger State</span>
                  <span className="text-cyan-400">100% Commitment</span>
                </div>
              </Card>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-950/50 border-y border-gray-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badgeText="What We Offer"
            title="Comprehensive Technology Services"
            subtitle="We deliver end-to-end digital solutions designed to elevate your business performance and build technical capabilities."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <Card className="h-full flex flex-col justify-between group">
                  <div className="space-y-4">
                    <div className="p-3.5 rounded-2xl bg-gray-800/60 border border-gray-700/60 w-fit group-hover:border-cyan-400/40 group-hover:bg-gray-800 transition-colors">
                      {getServiceIcon(service.iconName)}
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      {service.shortDescription}
                    </p>

                    <ul className="space-y-2 pt-2">
                      {service.features.slice(0, 3).map((feat, fIdx) => (
                        <li key={fIdx} className="text-xs text-gray-300 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6 mt-6 border-t border-gray-800/80">
                    <Link to="/services">
                      <Button variant="ghost" size="sm" className="w-full justify-between group-hover:text-cyan-400">
                        <span>Learn More</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies We Work With */}
      <TechStackSection />

      {/* Featured Projects Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <Badge variant="cyan" size="md" className="mb-3">Our Work</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">Featured Digital Projects</h2>
            </div>
            <Link to="/projects" className="mt-4 md:mt-0">
              <Button variant="outline" rightIcon={<ArrowRight className="w-4 h-4" />}>
                View All Projects
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <Card key={project.id} className="group p-0 overflow-hidden flex flex-col justify-between">
                <div className="space-y-3">
                  {/* REAL PROJECT INTERFACE PREVIEW FIRST */}
                  <div className="p-2 pb-0">
                    <ProjectPreview
                      previewUrl={project.previewUrl}
                      image={project.image}
                      title={project.title}
                      alt={project.title}
                    />
                  </div>
                  <div className="p-6 pt-2 space-y-3">
                    <Badge variant="emerald">{project.category}</Badge>
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                      {project.shortDescription}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span key={tech} className="text-[11px] font-mono text-gray-400 bg-gray-800/80 px-2 py-0.5 rounded border border-gray-700/60">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 flex items-center gap-3">
                  <Link to={`/projects/${project.slug}`} className="flex-1">
                    <Button variant="secondary" size="sm" className="w-full">
                      View Details
                    </Button>
                  </Link>
                  {project.liveUrl ? (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm" rightIcon={<ExternalLink className="w-3.5 h-3.5" />}>
                        Live Demo
                      </Button>
                    </a>
                  ) : (
                    <Button variant="outline" size="sm" disabled className="opacity-50 cursor-not-allowed text-[11px]">
                      Live Demo Coming Soon
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <CertificationsSection />

      {/* Why Choose AMAGix */}
      <section className="py-20 bg-gray-950/60 border-y border-gray-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badgeText="Why Partner With Us"
            title="Why Choose AMAGix Technologies?"
            subtitle="We blend technical excellence with practical delivery to create lasting technology value."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyUsItems.map((item, idx) => (
              <Card key={idx} className="p-6 space-y-4">
                <div className="p-3 rounded-xl bg-gray-800/60 border border-gray-700/60 w-fit">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-white">{item.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Client Testimonials */}
      <TestimonialsSection />

      {/* Trust & Credibility Section */}
      <TrustSection />

      {/* Featured Courses Preview */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <Badge variant="cyan" size="md" className="mb-3">AMAGix Academy</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">Practical Technology Training</h2>
            </div>
            <Link to="/courses" className="mt-4 md:mt-0">
              <Button variant="outline" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Explore All Courses
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course) => (
              <Card key={course.id} className="flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="purple">{course.level}</Badge>
                    <span className="text-xs font-mono text-cyan-400">{course.duration}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white">{course.title}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed line-clamp-3">
                    {course.shortDescription}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-gray-800">
                    <div className="text-xs font-semibold text-gray-300">Topics Covered:</div>
                    <div className="flex flex-wrap gap-1.5">
                      {course.topics.map((t) => (
                        <span key={t} className="text-[11px] bg-gray-800 text-gray-300 px-2 py-0.5 rounded">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-800 flex items-center gap-3">
                  <Link to={`/courses/${course.slug}`} className="flex-1">
                    <Button variant="secondary" size="sm" className="w-full">
                      View Syllabus
                    </Button>
                  </Link>
                  <Link to={`/enroll?course=${encodeURIComponent(course.title)}`}>
                    <Button size="sm">
                      Enroll
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Global CTA */}
      <CTASection />
    </>
  );
};
