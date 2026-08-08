import React from "react";
import { motion } from "framer-motion";
import { Target, Eye } from "lucide-react";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { SectionHeading } from "../components/ui/SectionHeading";
import { ProcessTimeline } from "../components/common/ProcessTimeline";
import { SEO } from "../components/common/SEO";
import { CTASection } from "../components/layout/CTASection";
import { siteConfig } from "../data/site";

export const About: React.FC = () => {
  const coreValues = [
    { title: "Innovation", desc: "Adopting modern engineering practices and creating creative technical answers to complex problems." },
    { title: "Integrity", desc: "Building honest, transparent relationships with clients, learners, and community partners." },
    { title: "Excellence", desc: "Maintaining rigorous quality control in code delivery, UI aesthetics, and educational instruction." },
    { title: "Learning", desc: "Promoting continuous skill evolution for our software engineers, mentors, and students alike." },
    { title: "Collaboration", desc: "Partnering closely with organizations to build software aligned with actual operational goals." },
    { title: "Impact", desc: "Measuring our success by the tangible growth of businesses and careers we help shape." },
  ];

  return (
    <>
      <SEO title="About Us | Digital Solutions & Tech Education" description="Learn about AMAGix Technologies, our mission, vision, values, and 6-step engineering methodology in Minna, Niger State, Nigeria." />

      {/* Header Banner */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-b from-gray-950 via-slate-900 to-[#0B0F17] relative border-b border-gray-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-4">
          <Badge variant="cyan" size="md">Who We Are</Badge>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Empowering Business & Learners Through <span className="gradient-text">Practical Technology</span>
          </h1>
          <p className="text-gray-300 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            Based in {siteConfig.location.fullLocation}, AMAGix Technologies operates at the intersection of custom software engineering and hands-on technology education.
          </p>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <Card className="h-full p-8 space-y-4 border-cyan-500/20 bg-gradient-to-br from-gray-900 to-slate-900">
                <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 w-fit">
                  <Target className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-white">Our Mission</h2>
                <p className="text-gray-300 text-base leading-relaxed">
                  To create practical digital solutions and empower individuals with technology skills that create real opportunities.
                </p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <Card className="h-full p-8 space-y-4 border-emerald-500/20 bg-gradient-to-br from-gray-900 to-slate-900">
                <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 w-fit">
                  <Eye className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-white">Our Vision</h2>
                <p className="text-gray-300 text-base leading-relaxed">
                  To become a trusted technology partner and learning hub for individuals and organizations across Nigeria and beyond.
                </p>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-gray-950/60 border-y border-gray-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badgeText="What Guides Us"
            title="Our Core Values"
            subtitle="The foundational principles behind every software system we deploy and every student we mentor."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreValues.map((value, idx) => (
              <Card key={idx} className="p-6 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  <h3 className="text-lg font-bold text-white">{value.title}</h3>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">{value.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Engineering Approach / Timeline */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badgeText="How We Work"
            title="Our Proven Development Approach"
            subtitle="We follow a systematic 6-step lifecycle to ensure software projects are delivered on time, securely, and to specification."
          />

          <ProcessTimeline />
        </div>
      </section>

      <CTASection />
    </>
  );
};
