import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Cpu, Headphones, Award, UserCheck } from "lucide-react";
import { Card } from "../ui/Card";
import { SectionHeading } from "../ui/SectionHeading";

export const TrustSection: React.FC = () => {
  const trustPillars = [
    {
      title: "Practical Solutions",
      description: "We focus exclusively on technology architectures that solve real operational challenges.",
      icon: <ShieldCheck className="w-6 h-6 text-cyan-400" />
    },
    {
      title: "Modern Technology",
      description: "Building with current industry standards, fast frameworks, and secure coding practices.",
      icon: <Cpu className="w-6 h-6 text-emerald-400" />
    },
    {
      title: "Responsive Support",
      description: "Dedicated client communication from discovery through post-launch software maintenance.",
      icon: <Headphones className="w-6 h-6 text-purple-400" />
    },
    {
      title: "Professional Development",
      description: "Empowering aspiring developers with mentor-guided, hands-on software engineering skills.",
      icon: <Award className="w-6 h-6 text-teal-400" />
    },
    {
      title: "Client-Focused Approach",
      description: "Every digital product is designed around the human workflows of the people using it.",
      icon: <UserCheck className="w-6 h-6 text-blue-400" />
    }
  ];

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badgeText="Our Commitment"
          title="Trusted to Build. Designed to Deliver."
          subtitle="We combine software engineering rigor with practical technical education to drive real digital impact."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trustPillars.map((pillar, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
            >
              <Card className="h-full p-6 space-y-4 border-gray-800/80 hover:border-cyan-500/40">
                <div className="p-3 rounded-2xl bg-gray-800/60 border border-gray-700/60 w-fit">
                  {pillar.icon}
                </div>
                <h3 className="text-lg font-bold text-white">{pillar.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{pillar.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
