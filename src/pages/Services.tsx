import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Globe, 
  Smartphone, 
  Code, 
  Layout, 
  ShieldCheck, 
  GraduationCap, 
  CheckCircle2, 
  ArrowRight, 
  Layers 
} from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { SEO } from "../components/common/SEO";
import { CTASection } from "../components/layout/CTASection";
import { services } from "../data/services";

export const Services: React.FC = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case "Globe":
        return <Globe className="w-8 h-8 text-cyan-400" />;
      case "Smartphone":
        return <Smartphone className="w-8 h-8 text-emerald-400" />;
      case "Code":
        return <Code className="w-8 h-8 text-blue-400" />;
      case "Layout":
        return <Layout className="w-8 h-8 text-purple-400" />;
      case "ShieldCheck":
        return <ShieldCheck className="w-8 h-8 text-teal-400" />;
      case "GraduationCap":
        return <GraduationCap className="w-8 h-8 text-cyan-400" />;
      default:
        return <Code className="w-8 h-8 text-cyan-400" />;
    }
  };

  return (
    <>
      <SEO title="Technology Services" description="Explore AMAGix Technologies' specialized services: Web Development, Mobile Apps, Custom Software, UI/UX Design, Cybersecurity, and Technology Training." />

      {/* Header Banner */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-b from-gray-950 via-slate-900 to-[#0B0F17] relative border-b border-gray-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-4">
          <Badge variant="cyan" size="md">Our Expertise</Badge>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Digital Solutions Tailored for <span className="gradient-text">Growth</span>
          </h1>
          <p className="text-gray-300 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            From modern responsive web applications to enterprise software and hands-on developer training, we build technology that delivers real-world results.
          </p>
        </div>
      </section>

      {/* Services Breakdown List */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              id={service.id}
            >
              <Card className="p-8 lg:p-10 border-gray-800/80 bg-gradient-to-br from-gray-900 via-slate-900 to-gray-950">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Left Summary (5 cols) */}
                  <div className="lg:col-span-5 space-y-4">
                    <div className="p-4 rounded-2xl bg-gray-800/60 border border-gray-700/60 w-fit">
                      {getIcon(service.iconName)}
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-white">{service.title}</h2>
                    <p className="text-gray-300 text-sm lg:text-base leading-relaxed">
                      {service.fullDescription}
                    </p>

                    <div className="pt-4 flex flex-wrap gap-3">
                      <Link to="/contact">
                        <Button size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                          Request Service
                        </Button>
                      </Link>
                      {service.id === "technology-training" && (
                        <Link to="/courses">
                          <Button variant="secondary" size="sm">
                            Browse Courses
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>

                  {/* Right Features & Deliverables (7 cols) */}
                  <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 bg-gray-950/60 p-6 rounded-2xl border border-gray-800/80">
                    <div className="space-y-3">
                      <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" /> Key Capabilities
                      </h4>
                      <ul className="space-y-2">
                        {service.features.map((feat, fIdx) => (
                          <li key={fIdx} className="text-xs text-gray-300 flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                        <Layers className="w-4 h-4" /> Deliverables
                      </h4>
                      <ul className="space-y-2">
                        {service.deliverables.map((deliv, dIdx) => (
                          <li key={dIdx} className="text-xs text-gray-300 flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-1" />
                            <span>{deliv}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <CTASection />
    </>
  );
};
