import React from "react";
import { motion } from "framer-motion";
import { techStackItems } from "../../data/techstack";
import { SectionHeading } from "../ui/SectionHeading";
import { Code2, FileCode, Palette, Zap, Layout, Server, Terminal, Cpu, Database, HardDrive, GitBranch } from "lucide-react";

export const TechStackSection: React.FC = () => {
  const getTechIcon = (iconName: string) => {
    switch (iconName) {
      case "Code2":
        return <Code2 className="w-5 h-5 text-cyan-400" />;
      case "FileCode":
        return <FileCode className="w-5 h-5 text-blue-400" />;
      case "Palette":
        return <Palette className="w-5 h-5 text-teal-400" />;
      case "Zap":
        return <Zap className="w-5 h-5 text-yellow-400" />;
      case "Layout":
        return <Layout className="w-5 h-5 text-emerald-400" />;
      case "Server":
        return <Server className="w-5 h-5 text-red-400" />;
      case "Terminal":
        return <Terminal className="w-5 h-5 text-purple-400" />;
      case "Cpu":
        return <Cpu className="w-5 h-5 text-emerald-400" />;
      case "Database":
        return <Database className="w-5 h-5 text-cyan-400" />;
      case "HardDrive":
        return <HardDrive className="w-5 h-5 text-blue-400" />;
      case "GitBranch":
        return <GitBranch className="w-5 h-5 text-amber-400" />;
      default:
        return <Code2 className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <section className="py-20 bg-gray-950/40 border-y border-gray-800/60 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-cyan-500/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badgeText="Our Stack & Tools"
          title="Technologies We Work With"
          subtitle="We leverage proven, high-performance web frameworks and engineering tools to build reliable digital systems."
        />

        <div className="flex flex-wrap items-center justify-center gap-4 max-w-4xl mx-auto">
          {techStackItems.map((tech, idx) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.04 }}
              whileHover={{ y: -4, rotateX: 5, rotateY: 5, scale: 1.05 }}
              className="group relative p-3.5 px-5 rounded-2xl bg-gray-900/70 border border-gray-800 backdrop-blur-xl shadow-lg hover:border-cyan-500/50 hover:bg-gray-900/90 transition-all duration-200 flex items-center space-x-3 cursor-pointer select-none"
            >
              <div className="p-2 rounded-xl bg-gray-950 border border-gray-800 group-hover:border-cyan-400/40 group-hover:bg-gray-800/80 transition-colors shrink-0">
                {getTechIcon(tech.iconName)}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {tech.name}
                </span>
                <span className="text-[10px] text-gray-400 font-mono">
                  {tech.category}
                </span>
              </div>

              {/* Hover Glow Light */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
