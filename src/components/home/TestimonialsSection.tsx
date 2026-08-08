import React from "react";
import { motion } from "framer-motion";
import { Quote, Star, User } from "lucide-react";
import { Card } from "../ui/Card";
import { SectionHeading } from "../ui/SectionHeading";
import { testimonials } from "../../data/testimonials";

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 bg-gray-950/60 border-y border-gray-800/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badgeText="Client & Learner Feedback"
          title="What Our Clients Say"
          subtitle="Feedback from enterprise partners, institutional clients, and technology academy graduates."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col justify-between p-6 space-y-6 border-gray-800/80 bg-gradient-to-br from-gray-900 via-slate-900 to-gray-950">
                <div className="space-y-4">
                  {/* Rating Stars & Quote Icon */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1 text-amber-400">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <Quote className="w-6 h-6 text-cyan-500/30" />
                  </div>

                  <p className="text-sm text-gray-300 italic leading-relaxed">
                    "{item.message}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="pt-4 border-t border-gray-800/80 flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold shrink-0">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{item.name}</h4>
                    <p className="text-xs text-gray-400">{item.role} • <span className="text-cyan-400">{item.company}</span></p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
