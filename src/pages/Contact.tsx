import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Mail, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Textarea } from "../components/ui/Textarea";
import { Badge } from "../components/ui/Badge";
import { WhatsAppCTA } from "../components/ui/WhatsAppCTA";
import { SEO } from "../components/common/SEO";
import { siteConfig } from "../data/site";
import { submitContactForm, type ContactPayload } from "../services/api";

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactPayload>({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverMessage, setServerMessage] = useState<string | null>(null);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Please enter your full name.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Please enter a subject for your message.";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Please enter your message.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerMessage(null);

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const response = await submitContactForm(formData);
      if (response.success) {
        setIsSuccess(true);
        setServerMessage(response.message);
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          subject: "",
          message: ""
        });
        setErrors({});
      } else {
        setServerMessage(response.message || "Failed to send message.");
      }
    } catch (err) {
      setServerMessage("Something went wrong while sending your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const mapEmbedUrl = import.meta.env.VITE_MAP_URL || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125712.9231846399!2d5.9555!3d9.6158!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104d49a37adbd023%3A0xfaee2b591ebfe2c2!2sMinna%2C%20Niger%20State!5e0!3m2!1sen!2sng!4v1700000000000!5m2!1sen!2sng";

  return (
    <>
      <SEO title="Contact Us" description="Get in touch with AMAGix Technologies in Minna, Niger State, Nigeria. Submit an inquiry or chat with us on WhatsApp." />

      {/* Header Banner */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-gradient-to-b from-gray-950 via-slate-900 to-[#0B0F17] relative border-b border-gray-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-4">
          <Badge variant="cyan" size="md">Get In Touch</Badge>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Contact <span className="gradient-text">AMAGix Technologies</span>
          </h1>
          <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Have a project idea, software requirement, or question about our technology training programs? Reach out to our team in Minna, Niger State.
          </p>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Contact Information (5 cols) */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white">Let's Connect</h2>
                <p className="text-sm text-gray-300 leading-relaxed">
                  We are eager to assist you with custom web & mobile software development, enterprise solutions, and training enrollments.
                </p>
              </div>

              <div className="space-y-4">
                {/* Location */}
                <Card hoverable={false} className="p-5 flex items-start gap-4 bg-gray-900/80">
                  <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-gray-400">Headquarters</h4>
                    <p className="text-sm font-bold text-white mt-0.5">{siteConfig.location.fullLocation}</p>
                    <p className="text-xs text-gray-400">{siteConfig.location.address}</p>
                  </div>
                </Card>

                {/* Phone */}
                <Card hoverable={false} className="p-5 flex items-start gap-4 bg-gray-900/80">
                  <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-gray-400">Phone</h4>
                    <a href={`tel:${siteConfig.contact.phone}`} className="text-sm font-bold text-white mt-0.5 hover:text-cyan-400 transition-colors block">{siteConfig.contact.phone}</a>
                    <p className="text-xs text-gray-400">Mon - Fri, 8:00 AM - 5:00 PM</p>
                  </div>
                </Card>

                {/* Email */}
                <Card hoverable={false} className="p-5 flex items-start gap-4 bg-gray-900/80">
                  <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-gray-400">Email Inquiry</h4>
                    <a href={`mailto:${siteConfig.contact.email}`} className="text-sm font-bold text-white mt-0.5 hover:text-cyan-400 transition-colors block break-all">{siteConfig.contact.email}</a>
                    <p className="text-xs text-gray-400">We aim to respond within 24 hours</p>
                  </div>
                </Card>
              </div>

              {/* WhatsApp Quick Action Button */}
              <div className="pt-2">
                <WhatsAppCTA variant="button" />
              </div>
            </div>

            {/* Right Contact Form (7 cols) */}
            <div className="lg:col-span-7">
              <Card className="p-8 sm:p-10 border-gray-800/80 bg-gradient-to-br from-gray-900 via-slate-900 to-gray-950">
                
                <h2 className="text-2xl font-bold text-white mb-6">Send Us a Message</h2>

                <AnimatePresence>
                  {isSuccess && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="mb-8 p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 space-y-3"
                    >
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                        <h3 className="text-lg font-bold text-white">Message Sent Successfully!</h3>
                      </div>
                      <p className="text-sm text-emerald-200 leading-relaxed">
                        {serverMessage}
                      </p>
                      <div className="pt-2">
                        <Button variant="outline" size="sm" onClick={() => setIsSuccess(false)}>
                          Send Another Message
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {serverMessage && !isSuccess && (
                  <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                    <span>{serverMessage}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <Input
                      label="Full Name"
                      required
                      placeholder="e.g. Amina Mohammed"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      error={errors.fullName}
                    />

                    <Input
                      label="Email Address"
                      type="email"
                      required
                      placeholder="e.g. amina@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      error={errors.email}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <Input
                      label="Phone Number"
                      type="tel"
                      placeholder="e.g. 08139081076"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />

                    <Input
                      label="Subject"
                      required
                      placeholder="e.g. Web App Development Project"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      error={errors.subject}
                    />
                  </div>

                  <Textarea
                    label="Your Message"
                    required
                    placeholder="Describe your project requirement or inquiry..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    error={errors.message}
                  />

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    isLoading={isSubmitting}
                    leftIcon={<Send className="w-4 h-4" />}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>

              </Card>
            </div>

          </div>

          {/* Embedded Location Map Section */}
          <div className="mt-16 space-y-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <MapPin className="w-5 h-5 text-cyan-400" /> Location Map (Minna, Niger State, Nigeria)
            </h3>
            <div className="rounded-2xl overflow-hidden border border-gray-800 h-[380px] shadow-2xl bg-gray-900">
              <iframe
                title="AMAGix Technologies Location Map - Minna, Niger State, Nigeria"
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full filter saturate-150 contrast-125 opacity-90 hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          </div>

        </div>
      </section>
    </>
  );
};
