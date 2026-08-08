import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, GraduationCap, Rocket } from "lucide-react";
import { Button } from "../ui/Button";

export const CTASection: React.FC = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-3xl p-8 sm:p-12 lg:p-16 bg-gradient-to-r from-gray-900 via-slate-900 to-gray-950 border border-gray-800 shadow-2xl overflow-hidden text-center"
        >
          {/* Ambient Decorative Accents */}
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-semibold uppercase tracking-widest">
              <Rocket className="w-3.5 h-3.5" /> Ready to Take the Next Step?
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Have an Idea? <span className="gradient-text">Let's Build It.</span>
            </h2>
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
              Whether you need a modern website, custom software application, or practical hands-on technology training, AMAGix Technologies is ready to help you succeed.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link to="/contact" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto" rightIcon={<ArrowRight className="w-5 h-5" />}>
                  Start a Project
                </Button>
              </Link>
              <Link to="/enroll" className="w-full sm:w-auto">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto" leftIcon={<GraduationCap className="w-5 h-5 text-cyan-400" />}>
                  Enroll in Training
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
