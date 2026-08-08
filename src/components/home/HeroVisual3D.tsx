import React from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Terminal, Shield, Cpu, Layers, Sparkles } from "lucide-react";

export const HeroVisual3D: React.FC = () => {
  // Raw mouse offsets
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for fluid, subtle parallax tracking
  const springX = useSpring(mouseX, { stiffness: 120, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Normalize offset from -25 to +25 max pixels
    const offsetX = ((e.clientX - centerX) / rect.width) * 30;
    const offsetY = ((e.clientY - centerY) / rect.height) * 30;

    mouseX.set(offsetX);
    mouseY.set(offsetY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-md lg:max-w-lg mx-auto h-[420px] sm:h-[460px] flex items-center justify-center select-none"
    >
      {/* Ambient Pulsing Background Orbs */}
      <div className="absolute w-72 h-72 rounded-full bg-gradient-to-r from-cyan-500/20 via-emerald-500/20 to-purple-500/20 blur-[90px] animate-pulse-slow pointer-events-none" />

      {/* Outer Floating 3D Geometric Ring */}
      <motion.div
        style={{ x: springX, y: springY, rotate: 12 }}
        className="absolute inset-4 rounded-3xl border border-cyan-500/20 bg-cyan-500/5 backdrop-blur-sm -z-10 shadow-2xl pointer-events-none"
      />

      {/* Main Glass Code Terminal Layer */}
      <motion.div
        style={{
          x: springX,
          y: springY,
          rotateX: useSpring(useMotionValue(0)),
        }}
        className="w-full rounded-2xl bg-gray-900/90 border border-gray-800/90 p-6 shadow-2xl backdrop-blur-xl relative z-10 space-y-4 border-cyan-500/30"
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-gray-800 pb-3">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
            <span className="text-xs font-mono text-gray-400 pl-2">amagix-system-v2.6.app</span>
          </div>
          <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20 flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> Live Engine
          </span>
        </div>

        {/* Code Visual Screen */}
        <div className="space-y-3 font-mono text-xs text-gray-300">
          <div className="flex items-center justify-between text-gray-400">
            <span>&gt; amagix.verifySystemStatus()</span>
            <span className="text-emerald-400 flex items-center gap-1.5 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" /> Operational
            </span>
          </div>

          <div className="bg-slate-950/90 p-4 rounded-xl border border-gray-800 space-y-1.5 text-cyan-300 shadow-inner">
            <p><span className="text-purple-400">const</span> location = <span className="text-emerald-300">"Minna, Niger State"</span>;</p>
            <p><span className="text-purple-400">const</span> services = [<span className="text-emerald-300">"Software"</span>, <span className="text-emerald-300">"Web"</span>, <span className="text-emerald-300">"Training"</span>];</p>
            <p><span className="text-purple-400">await</span> amagix.<span className="text-yellow-300">deliverSolutions</span>(services);</p>
          </div>
        </div>

        {/* Floating Interactive Sub-Panels */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <div className="p-3 rounded-xl bg-gray-800/60 border border-gray-700/60 flex items-center space-x-3 hover:border-cyan-400/40 transition-colors">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Software Dev</div>
              <div className="text-[10px] text-gray-400">Enterprise Apps</div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-gray-800/60 border border-gray-700/60 flex items-center space-x-3 hover:border-emerald-400/40 transition-colors">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Tech Academy</div>
              <div className="text-[10px] text-gray-400">Practical Skills</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating 3D Satellite Glass Panels */}
      <motion.div
        style={{
          x: useSpring(mouseX, { stiffness: 60, damping: 20 }),
          y: useSpring(mouseY, { stiffness: 60, damping: 20 }),
        }}
        className="absolute -top-4 -right-4 p-3 rounded-xl bg-gray-900/90 border border-cyan-500/40 shadow-xl backdrop-blur-xl z-20 flex items-center gap-2 text-xs font-semibold text-cyan-300 animate-float-slow"
      >
        <Shield className="w-4 h-4 text-cyan-400" />
        <span>Security Audited</span>
      </motion.div>

      <motion.div
        style={{
          x: useSpring(mouseX, { stiffness: 80, damping: 20 }),
          y: useSpring(mouseY, { stiffness: 80, damping: 20 }),
        }}
        className="absolute -bottom-4 -left-4 p-3 rounded-xl bg-gray-900/90 border border-emerald-500/40 shadow-xl backdrop-blur-xl z-20 flex items-center gap-2 text-xs font-semibold text-emerald-300"
      >
        <Layers className="w-4 h-4 text-emerald-400" />
        <span>Scalable Stack</span>
      </motion.div>
    </div>
  );
};
