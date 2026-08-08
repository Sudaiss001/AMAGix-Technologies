import React, { useState, useRef } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface CardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  hoverable?: boolean;
  glow?: boolean;
  tilt3d?: boolean;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  hoverable = true,
  glow = false,
  tilt3d = true,
  className,
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tilt3d || !hoverable || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Calculate mouse position relative to center of card (-0.5 to 0.5)
    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;

    // Max 6 degrees of tilt for subtle, premium 3D perspective
    const maxTilt = 6;
    setRotateY(mouseX * maxTilt);
    setRotateX(-mouseY * maxTilt);
  };

  const handleMouseEnter = () => {
    if (hoverable) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: isHovered && tilt3d ? rotateX : 0,
        rotateY: isHovered && tilt3d ? rotateY : 0,
        y: isHovered && hoverable ? -6 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
        mass: 0.5,
      }}
      style={{
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      className={twMerge(
        clsx(
          "relative rounded-2xl p-6 transition-colors duration-300 overflow-hidden select-none",
          "bg-gray-900/60 backdrop-blur-xl border border-gray-800/80 shadow-xl",
          hoverable && "hover:border-cyan-500/40 hover:shadow-2xl hover:shadow-cyan-500/10 hover:bg-gray-900/85",
          glow && "after:absolute after:inset-0 after:-z-10 after:bg-gradient-to-r after:from-cyan-500/10 after:to-emerald-500/10 after:blur-xl",
          className
        )
      )}
      {...props}
    >
      {/* Ambient Inner 3D Highlight Layer */}
      {isHovered && (
        <div
          className="pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-300 opacity-100"
          style={{
            background: `radial-gradient(400px circle at ${rotateY * 20 + 50}% ${-rotateX * 20 + 50}%, rgba(6, 182, 212, 0.12), transparent 80%)`,
          }}
        />
      )}
      <div style={{ transform: isHovered && tilt3d ? "translateZ(12px)" : "translateZ(0px)", transition: "transform 0.2s ease-out" }}>
        {children}
      </div>
    </motion.div>
  );
};
