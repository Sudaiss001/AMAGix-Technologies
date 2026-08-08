import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Github, Linkedin, Facebook, Instagram, MessageSquare } from "lucide-react";
import { siteConfig } from "../../data/site";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-950 border-t border-gray-800/80 text-gray-400 pt-16 pb-12 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-cyan-500/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-gray-800/80">
          
          {/* Column 1: Brand & Bio (2 cols wide on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl overflow-hidden border border-cyan-500/30 bg-gray-900 shadow-md shrink-0">
                <img src="/logo.jpeg" alt="AMAGix Technologies Logo" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-tight text-white leading-none">
                  AMAGix<span className="text-cyan-400">.</span>
                </span>
                <span className="text-[10px] uppercase font-mono tracking-widest text-gray-400 font-semibold leading-tight">
                  Technologies
                </span>
              </div>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
              {siteConfig.supportingText}
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a
                href={siteConfig.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="p-2.5 rounded-xl bg-gray-900 border border-gray-800 text-gray-400 hover:text-white hover:border-cyan-500/40 transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-2.5 rounded-xl bg-gray-900 border border-gray-800 text-gray-400 hover:text-white hover:border-cyan-500/40 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="p-2.5 rounded-xl bg-gray-900 border border-gray-800 text-gray-400 hover:text-white hover:border-cyan-500/40 transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="p-2.5 rounded-xl bg-gray-900 border border-gray-800 text-gray-400 hover:text-white hover:border-cyan-500/40 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent("Hello AMAGix Technologies, I would like to make an inquiry about your services.")}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="p-2.5 rounded-xl bg-gray-900 border border-gray-800 text-emerald-400 hover:text-emerald-300 hover:border-emerald-500/40 transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Company */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Company</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/about" className="hover:text-cyan-400 transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-cyan-400 transition-colors">Services</Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-cyan-400 transition-colors">Featured Projects</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-cyan-400 transition-colors">Contact Us</Link>
              </li>
              <li>
                <Link to="/enroll" className="hover:text-cyan-400 transition-colors">Enrollment Portal</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Training */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Training</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/courses/web-development" className="hover:text-cyan-400 transition-colors">Web Development</Link>
              </li>
              <li>
                <Link to="/courses/cybersecurity-fundamentals" className="hover:text-cyan-400 transition-colors">Cybersecurity</Link>
              </li>
              <li>
                <Link to="/courses/mobile-app-development" className="hover:text-cyan-400 transition-colors">Mobile App Development</Link>
              </li>
              <li>
                <Link to="/courses/computer-fundamentals" className="hover:text-cyan-400 transition-colors">Computer Fundamentals</Link>
              </li>
              <li>
                <Link to="/courses/graphics-ui-ux-design" className="hover:text-cyan-400 transition-colors">Graphics & UI/UX Design</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-3 text-gray-300">
                <MapPin className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                <span>{siteConfig.location.fullLocation}</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-300">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <a href={`tel:${siteConfig.contact.phone}`} className="hover:text-cyan-400 transition-colors">{siteConfig.contact.phone}</a>
              </li>
              <li className="flex items-center space-x-3 text-gray-300">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <a href={`mailto:${siteConfig.contact.email}`} className="break-all hover:text-cyan-400 transition-colors">{siteConfig.contact.email}</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© {currentYear} {siteConfig.name}. All Rights Reserved.</p>
          <div className="flex items-center space-x-6">
            <a href="#privacy" className="hover:text-gray-400 transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-gray-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
