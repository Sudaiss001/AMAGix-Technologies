import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle2, 
  AlertCircle, 
  Send, 
  Clock, 
  Award, 
  ShieldCheck 
} from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Select } from "../components/ui/Select";
import { Textarea } from "../components/ui/Textarea";
import { Badge } from "../components/ui/Badge";
import { SEO } from "../components/common/SEO";
import { submitEnrollment, type EnrollmentPayload } from "../services/api";
import { courses } from "../data/courses";
import { siteConfig } from "../data/site";

export const Enroll: React.FC = () => {
  const [searchParams] = useSearchParams();
  const courseParam = searchParams.get("course") || "";

  const [formData, setFormData] = useState<EnrollmentPayload>({
    fullName: "",
    email: "",
    phone: "",
    course: courseParam,
    educationalLevel: "Undergraduate",
    location: "Medan, Niger State",
    preferredFormat: "Physical",
    reason: "",
    message: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverMessage, setServerMessage] = useState<string | null>(null);

  useEffect(() => {
    if (courseParam) {
      setFormData((prev) => ({ ...prev, course: courseParam }));
    }
  }, [courseParam]);

  const courseOptions = courses.map((c) => c.title);
  const selectedCourseObj = courses.find((c) => c.title === formData.course);

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

    if (!formData.phone.trim()) {
      newErrors.phone = "Please enter your phone number.";
    } else if (formData.phone.trim().length < 8) {
      newErrors.phone = "Please enter a valid phone number.";
    }

    if (!formData.course) {
      newErrors.course = "Please select a technology course.";
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
      const response = await submitEnrollment(formData);
      if (response.success) {
        setIsSuccess(true);
        setServerMessage(response.message);
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          course: "",
          educationalLevel: "Undergraduate",
          location: "Medan, Niger State",
          preferredFormat: "Physical",
          reason: "",
          message: ""
        });
        setErrors({});
      } else {
        setServerMessage(response.message || "Failed to submit enrollment request.");
      }
    } catch (err) {
      setServerMessage("Something went wrong while submitting your request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEO title="Enroll in Course | Training Registration" description="Register for practical software development, cybersecurity, mobile app, and UI/UX design courses at AMAGix Technologies." />

      {/* Header Banner */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-gradient-to-b from-gray-950 via-slate-900 to-[#0B0F17] relative border-b border-gray-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-4">
          <Badge variant="cyan" size="md">Student Registration</Badge>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Enroll in a <span className="gradient-text">Technology Course</span>
          </h1>
          <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Take the next step toward building practical technology skills. Fill out the form below and our admissions team in Medan, Niger State will contact you.
          </p>
        </div>
      </section>

      {/* Split 2-Column Layout Container */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* LEFT: Course Info / Academy Benefits Visual Card (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <Card className="p-8 space-y-6 bg-gradient-to-br from-gray-900 via-slate-900 to-gray-950 border-cyan-500/30 sticky top-28">
                <div className="space-y-2">
                  <Badge variant="purple" size="md">AMAGix Academy</Badge>
                  <h2 className="text-2xl font-bold text-white">Why Learn With Us?</h2>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Our training programs combine mentor guidance with practical building to prepare students for real technology careers.
                  </p>
                </div>

                {selectedCourseObj ? (
                  <div className="p-4 rounded-xl bg-gray-950/80 border border-cyan-500/30 space-y-3">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400">Selected Program</span>
                    <h3 className="text-lg font-bold text-white">{selectedCourseObj.title}</h3>
                    <div className="flex items-center gap-3 text-xs text-gray-300 font-mono">
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-cyan-400" /> {selectedCourseObj.duration}</span>
                      <span className="flex items-center gap-1"><Award className="w-3.5 h-3.5 text-emerald-400" /> {selectedCourseObj.level}</span>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-gray-950/60 border border-gray-800 text-xs text-gray-400 font-mono">
                    Select a program from the form to view course specifications.
                  </div>
                )}

                <div className="space-y-3 pt-2">
                  {[
                    { title: "Project-Driven Learning", desc: "Build real portfolio applications" },
                    { title: "Experienced Industry Mentors", desc: "Direct guidance from software developers" },
                    { title: "Certificate of Completion", desc: "Recognized technical skill accreditation" },
                    { title: "Hub Base in Medan", desc: "Located at " + siteConfig.location.fullLocation },
                  ].map((benefit, bIdx) => (
                    <div key={bIdx} className="flex items-start space-x-3 p-3 rounded-xl bg-gray-900/60 border border-gray-800/80">
                      <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-bold text-white">{benefit.title}</h4>
                        <p className="text-[11px] text-gray-400">{benefit.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* RIGHT: Enrollment Application Form (7 cols) */}
            <div className="lg:col-span-7">
              <Card className="p-8 sm:p-10 border-gray-800/80 bg-gradient-to-br from-gray-900 via-slate-900 to-gray-950">
                
                {/* Success Alert Banner */}
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
                        <h3 className="text-lg font-bold text-white">Enrollment Submitted Successfully!</h3>
                      </div>
                      <p className="text-sm text-emerald-200 leading-relaxed">
                        {serverMessage}
                      </p>
                      <div className="pt-2">
                        <Button variant="outline" size="sm" onClick={() => setIsSuccess(false)}>
                          Submit Another Application
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Server Error Alert */}
                {serverMessage && !isSuccess && (
                  <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                    <span>{serverMessage}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    
                    {/* Full Name */}
                    <Input
                      label="Full Name"
                      required
                      placeholder="e.g. Ibrahim Abubakar"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      error={errors.fullName}
                    />

                    {/* Email Address */}
                    <Input
                      label="Email Address"
                      type="email"
                      required
                      placeholder="e.g. ibrahim@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      error={errors.email}
                    />

                    {/* Phone Number */}
                    <Input
                      label="Phone Number"
                      type="tel"
                      required
                      placeholder="e.g. +234 800 000 0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      error={errors.phone}
                    />

                    {/* Course Selection */}
                    <Select
                      label="Select Course"
                      required
                      options={courseOptions}
                      value={formData.course}
                      onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                      error={errors.course}
                      placeholder="-- Choose a Program --"
                    />

                    {/* Educational Level */}
                    <Select
                      label="Educational Level"
                      options={["Secondary / High School", "Undergraduate", "Graduate", "Self-Taught / Professional", "Other"]}
                      value={formData.educationalLevel}
                      onChange={(e) => setFormData({ ...formData, educationalLevel: e.target.value })}
                    />

                    {/* Location */}
                    <Input
                      label="Location"
                      placeholder="e.g. Medan, Niger State"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    />

                  </div>

                  {/* Preferred Learning Format */}
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300">
                      Preferred Learning Format <span className="text-cyan-400">*</span>
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {["Physical", "Online", "Hybrid"].map((fmt) => (
                        <button
                          type="button"
                          key={fmt}
                          onClick={() => setFormData({ ...formData, preferredFormat: fmt })}
                          className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                            formData.preferredFormat === fmt
                              ? "bg-cyan-500/20 border-cyan-500 text-cyan-300 shadow-md shadow-cyan-500/10"
                              : "bg-gray-900 border-gray-800 text-gray-400 hover:text-white hover:border-gray-700"
                          }`}
                        >
                          {fmt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Why do you want to learn? */}
                  <Input
                    label="Why do you want to learn?"
                    placeholder="e.g. To start a career in web development"
                    value={formData.reason}
                    onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  />

                  {/* Additional Message */}
                  <Textarea
                    label="Additional Message"
                    placeholder="Share any background details or questions with our team..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />

                  {/* Submit Button */}
                  <div className="pt-4">
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full"
                      isLoading={isSubmitting}
                      leftIcon={<Send className="w-4 h-4" />}
                    >
                      {isSubmitting ? "Submitting..." : "Submit Enrollment"}
                    </Button>
                  </div>

                </form>
              </Card>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};
