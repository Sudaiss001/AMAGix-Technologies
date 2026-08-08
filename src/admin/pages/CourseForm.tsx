import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Save, CheckCircle2 } from "lucide-react";
import { AdminLayout } from "../components/AdminLayout";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Textarea } from "../../components/ui/Textarea";
import { Card } from "../../components/ui/Card";
import { LoadingState } from "../components/LoadingState";
import { ErrorState } from "../components/ErrorState";
import { SEO } from "../../components/common/SEO";
import { adminApi } from "../../services/adminApi";
import type { AdminCourse } from "../data/mockCourses";

export const AdminCourseForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [loading, setLoading] = useState(isEdit);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const [formData, setFormData] = useState<Partial<AdminCourse>>({
    title: "",
    slug: "",
    category: "Web Development",
    duration: "8 Weeks",
    level: "Beginner to Intermediate",
    shortDescription: "",
    fullDescription: "",
    status: "Published"
  });

  useEffect(() => {
    if (isEdit && id) {
      const loadCourse = async () => {
        setLoading(true);
        try {
          const res = await adminApi.getCourseById(id);
          if (res.success && res.data) {
            setFormData(res.data);
          } else {
            setError("Course not found.");
          }
        } catch (err) {
          setError("Failed to fetch course details.");
        } finally {
          setLoading(false);
        }
      };
      loadCourse();
    }
  }, [id, isEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg(null);
    try {
      const res = await adminApi.saveCourse(formData);
      if (res.success) {
        setSuccessMsg(res.message || "Course saved successfully.");
        setTimeout(() => {
          navigate("/admin/courses");
        }, 1500);
      }
    } catch (err) {
      setError("Failed to save course.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout title={isEdit ? "Edit Course" : "Create New Course"}>
      <SEO title={isEdit ? "Edit Course | AMAGix Admin" : "Create Course | AMAGix Admin"} />

      <div className="space-y-6 max-w-4xl mx-auto">
        <button
          onClick={() => navigate("/admin/courses")}
          className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Courses List
        </button>

        {loading ? (
          <LoadingState rows={4} />
        ) : error ? (
          <ErrorState message={error} />
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <Card className="p-6 sm:p-8 space-y-6 border-gray-800">
              
              <div className="border-b border-gray-800 pb-4 flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">
                  {isEdit ? "Update Course Details" : "Course Specification"}
                </h3>
                <span className="text-xs font-mono text-cyan-400">
                  {isEdit ? `ID: ${formData.id}` : "Draft Mode"}
                </span>
              </div>

              {successMsg && (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                  <span>{successMsg}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Input
                  label="Course Title"
                  required
                  placeholder="e.g. Full-Stack Web Development"
                  value={formData.title || ""}
                  onChange={(e) => {
                    const title = e.target.value;
                    const slug = title.toLowerCase().replace(/[^a-z0-9]/g, "-");
                    setFormData({ ...formData, title, slug: isEdit ? formData.slug : slug });
                  }}
                />

                <Input
                  label="URL Slug"
                  required
                  placeholder="web-development"
                  value={formData.slug || ""}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-gray-300">Category *</label>
                  <select
                    value={formData.category || "Web Development"}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500 font-mono"
                  >
                    <option value="Web Development">Web Development</option>
                    <option value="Mobile App Development">Mobile App Development</option>
                    <option value="Software Development">Software Development</option>
                    <option value="Cybersecurity">Cybersecurity</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                  </select>
                </div>

                <Input
                  label="Duration"
                  placeholder="e.g. 12 Weeks"
                  value={formData.duration || ""}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                />

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-gray-300">Publish Status *</label>
                  <select
                    value={formData.status || "Published"}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500 font-mono"
                  >
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>
              </div>

              <Textarea
                label="Short Description (Summary)"
                required
                placeholder="Brief summary displayed on cards..."
                value={formData.shortDescription || ""}
                onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
              />

              <Textarea
                label="Full Overview & Syllabus Description"
                placeholder="Detailed curriculum overview..."
                value={formData.fullDescription || ""}
                onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
              />

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-800">
                <Button type="button" variant="outline" onClick={() => navigate("/admin/courses")}>
                  Cancel
                </Button>
                <Button type="submit" isLoading={saving} leftIcon={<Save className="w-4 h-4" />}>
                  {isEdit ? "Update Course" : "Save & Publish Course"}
                </Button>
              </div>

            </Card>
          </form>
        )}
      </div>
    </AdminLayout>
  );
};
