import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Award, ExternalLink, CheckCircle } from "lucide-react";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { SectionHeading } from "../ui/SectionHeading";
import { certifications } from "../../data/certifications";

export const CertificationsSection: React.FC = () => {
  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badgeText="Technical Credibility"
          title="Certifications & Accreditation"
          subtitle="Our engineering practices and educational programs align with recognized technical standards and quality frameworks."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col justify-between p-6 space-y-6 group border-gray-800/80 hover:border-cyan-500/40">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 group-hover:bg-cyan-500/20 transition-colors">
                      <Award className="w-6 h-6" />
                    </div>
                    {cert.isVerified && (
                      <Badge variant="emerald" size="sm">
                        <CheckCircle className="w-3 h-3 text-emerald-400" /> Standard Ready
                      </Badge>
                    )}
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {cert.title}
                    </h3>
                    <p className="text-xs text-gray-400 font-mono">
                      Issuer: {cert.issuer} ({cert.issueDate})
                    </p>
                  </div>

                  {cert.isPlaceholder && (
                    <div className="p-3 rounded-xl bg-gray-950/80 border border-gray-800/80 text-[11px] font-mono text-gray-400 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>Verified credential framework slot ready for audit data.</span>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-gray-800/80 flex items-center justify-between text-xs text-gray-500">
                  <span>Credential Status</span>
                  {cert.credentialUrl ? (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-semibold"
                    >
                      <span>Verify</span> <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <span className="font-mono text-emerald-400 font-semibold">AMAGix Standard</span>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
