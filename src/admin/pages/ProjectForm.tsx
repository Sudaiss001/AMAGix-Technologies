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
import type { AdminProject } from "../data/mockProjects";

export const AdminProjectForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [loading, setLoading] = useState(isEdit);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const [formData, setFormData] = useState<Partial<AdminProject>>({
    title: "",
    slug: "",
    category: "Web Development",
    shortDescription: "",
    fullOverview: "",
    problem: "",
    solution: "",
    image: "/images/projects/ecommerce.png",
    previewUrl: "",
    liveUrl: "",
    technologies: ["React", "TypeScript", "Tailwind CSS"],
    featured: false,
    client: "AMAGix Client",
    year: "2026",
    status: "Published"
  });

  const [techInput, setTechInput] = useState("");

  useEffect(() => {
    if (isEdit && id) {
      const loadProject = async () => {
        setLoading(true);
        try {
          const res = await adminApi.getProjectById(id);
          if (res.success && res.data) {
            setFormData(res.data);
            setTechInput(res.data.technologies?.join(", ") || "");
          } else {
            setError("Project not found.");
          }
        } catch (err) {
          setError("Failed to fetch project details.");
        } finally {
          setLoading(false);
        }
      };
      loadProject();
    }
  }, [id, isEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg(null);

    const techArray = techInput
      ? techInput.split(",").map((t) => t.trim()).filter(Boolean)
      : formData.technologies || [];

    try {
      const res = await adminApi.saveProject({
        ...formData,
        technologies: techArray
      });
      if (res.success) {
        setSuccessMsg(res.message || "Project saved successfully.");
        setTimeout(() => {
          navigate("/admin/projects");
        }, 1500);
      }
    } catch (err) {
      setError("Failed to save project.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout title={isEdit ? "Edit Portfolio Project" : "Create New Project"}>
      <SEO title={isEdit ? "Edit Project | AMAGix Admin" : "Create Project | AMAGix Admin"} />

      <div className="space-y-6 max-w-4xl mx-auto">
        <button
          onClick={() => navigate("/admin/projects")}
          className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Projects List
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
                  {isEdit ? "Update Project Details" : "Project Specification"}
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
                  label="Project Title"
                  required
                  placeholder="e.g. E-Commerce Platform"
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
                  placeholder="ecommerce-platform"
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
                  label="Client Name"
                  placeholder="e.g. Retail Enterprise"
                  value={formData.client || ""}
                  onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                />

                <Input
                  label="Development Year"
                  placeholder="2026"
                  value={formData.year || ""}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Input
                  label="Project Screenshot Path"
                  required
                  placeholder="/images/projects/ecommerce.png"
                  value={formData.image || ""}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                />

                <Input
                  label="Live Demo URL (Optional)"
                  placeholder="https://example.com"
                  value={formData.liveUrl || ""}
                  onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                />
              </div>

              <Input
                label="Technologies Stack (comma separated)"
                placeholder="React, TypeScript, Tailwind CSS, Laravel"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
              />

              <Textarea
                label="Short Description"
                required
                placeholder="Brief project summary displayed on cards..."
                value={formData.shortDescription || ""}
                onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Textarea
                  label="The Challenge"
                  placeholder="Client problem faced..."
                  value={formData.problem || ""}
                  onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                />
                <Textarea
                  label="The Solution"
                  placeholder="Engineering approach delivered..."
                  value={formData.solution || ""}
                  onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                />
              </div>

              <div className="flex items-center space-x-6 pt-2">
                <label className="flex items-center space-x-2 text-xs font-semibold text-gray-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured || false}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="rounded bg-gray-900 border-gray-800 text-cyan-500 focus:ring-cyan-500/20"
                  />
                  <span>Feature on Home Page</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-800">
                <Button type="button" variant="outline" onClick={() => navigate("/admin/projects")}>
                  Cancel
                </Button>
                <Button type="submit" isLoading={saving} leftIcon={<Save className="w-4 h-4" />}>
                  {isEdit ? "Update Project" : "Save & Publish Project"}
                </Button>
              </div>

            </Card>
          </form>
        )}
      </div>
    </AdminLayout>
  );
};
