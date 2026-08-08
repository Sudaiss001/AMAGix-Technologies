import React from "react";
import { motion } from "framer-motion";
import { processSteps } from "../../data/process";
import { Search, Layout, Code, CheckCircle, Rocket, LifeBuoy } from "lucide-react";

export const ProcessTimeline: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Search":
        return <Search className="w-5 h-5 text-cyan-400" />;
      case "Layout":
        return <Layout className="w-5 h-5 text-emerald-400" />;
      case "Code":
        return <Code className="w-5 h-5 text-blue-400" />;
      case "CheckCircle":
        return <CheckCircle className="w-5 h-5 text-purple-400" />;
      case "Rocket":
        return <Rocket className="w-5 h-5 text-teal-400" />;
      case "LifeBuoy":
        return <LifeBuoy className="w-5 h-5 text-cyan-400" />;
      default:
        return <Code className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <div className="relative my-12">
      {/* Animated Glowing Connecting Line Desktop */}
      <div className="hidden lg:block absolute top-1/2 left-4 right-4 h-1 bg-gray-800 -translate-y-1/2 z-0 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: "0%" }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="h-full bg-gradient-to-r from-cyan-500 via-emerald-400 to-purple-500 shadow-lg shadow-cyan-500/50"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 relative z-10">
        {processSteps.map((stepItem, index) => (
          <motion.div
            key={stepItem.step}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.12 }}
            whileHover={{ y: -6, scale: 1.03 }}
            className="flex flex-col items-center text-center group cursor-pointer"
          >
            {/* Step 3D Illuminated Node Circle */}
            <div className="w-16 h-16 rounded-2xl bg-gray-900 border border-gray-800 group-hover:border-cyan-400 group-hover:shadow-2xl group-hover:shadow-cyan-500/20 flex items-center justify-center transition-all duration-300 relative z-10 mb-4 backdrop-blur-xl group-hover:bg-gray-900/90">
              {getIcon(stepItem.iconName)}
              
              {/* Illuminated Badge Number */}
              <span className="absolute -top-2.5 -right-2.5 w-7 h-7 rounded-full bg-gray-950 border border-cyan-500/40 text-[11px] font-mono font-bold text-cyan-400 flex items-center justify-center group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors shadow-md">
                0{stepItem.step}
              </span>
            </div>

            {/* Step Info Box */}
            <h4 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
              {stepItem.title}
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed max-w-xs group-hover:text-gray-300 transition-colors">
              {stepItem.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
