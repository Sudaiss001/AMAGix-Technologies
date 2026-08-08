import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Edit, Trash2 } from "lucide-react";
import { AdminLayout } from "../components/AdminLayout";
import { StatusBadge } from "../components/StatusBadge";
import { DataTable } from "../components/DataTable";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { LoadingState } from "../components/LoadingState";
import { ErrorState } from "../components/ErrorState";
import { Modal } from "../components/Modal";
import { SEO } from "../../components/common/SEO";
import { adminApi } from "../../services/adminApi";
import type { AdminProject } from "../data/mockProjects";

export const AdminProjects: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [projects, setProjects] = useState<AdminProject[]>([]);
  
  const [deleteTarget, setDeleteTarget] = useState<AdminProject | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchProjects = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await adminApi.getProjects();
      if (res.success) {
        setProjects(res.data);
      }
    } catch (err) {
      setError("Failed to fetch project portfolio.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await adminApi.deleteProject(deleteTarget.id);
      if (res.success) {
        setProjects(projects.filter((p) => p.id !== deleteTarget.id));
        setDeleteTarget(null);
      }
    } catch (err) {
      setError("Failed to delete project.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <AdminLayout title="Software Projects Portfolio">
      <SEO title="Projects Management | AMAGix Admin" />

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-gray-900 via-slate-900 to-gray-950 border border-gray-800 shadow-xl">
        <div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            Software <span className="gradient-text">Projects Portfolio</span>
          </h2>
          <p className="text-xs text-gray-400 font-mono mt-1">
            Manage showcase projects, technologies, screenshots, and live deployment links.
          </p>
        </div>
        <Link to="/admin/projects/new">
          <Button size="sm" leftIcon={<Plus className="w-4 h-4" />}>
            New Project
          </Button>
        </Link>
      </div>

      {/* Main Table */}
      {loading ? (
        <LoadingState rows={5} />
      ) : error ? (
        <ErrorState message={error} onRetry={fetchProjects} />
      ) : (
        <Card className="p-0 overflow-hidden border-gray-800">
          <DataTable
            data={projects}
            keyExtractor={(item) => item.id.toString()}
            columns={[
              {
                header: "PREVIEW & TITLE",
                accessor: (item) => (
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-8 rounded-lg overflow-hidden border border-gray-800 bg-gray-900 shrink-0">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="font-bold text-white text-sm">{item.title}</p>
                      <p className="text-[11px] text-gray-500 font-mono">Client: {item.client}</p>
                    </div>
                  </div>
                )
              },
              { header: "CATEGORY", accessor: "category" },
              {
                header: "FEATURED",
                accessor: (item) => (
                  <span className={`font-mono text-xs ${item.featured ? "text-cyan-400 font-bold" : "text-gray-500"}`}>
                    {item.featured ? "★ Featured" : "Standard"}
                  </span>
                )
              },
              {
                header: "STATUS",
                accessor: (item) => <StatusBadge status={item.status} />
              },
              {
                header: "ACTIONS",
                accessor: (item) => (
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => navigate(`/admin/projects/${item.id}/edit`)}
                      leftIcon={<Edit className="w-3.5 h-3.5" />}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setDeleteTarget(item)}
                      className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                )
              }
            ]}
          />
        </Card>
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        title="Confirm Project Deletion"
      >
        <div className="space-y-4">
          <p className="text-xs text-gray-300 leading-relaxed">
            Are you sure you want to delete <span className="font-bold text-white">"{deleteTarget?.title}"</span> from the company portfolio?
          </p>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" size="sm" onClick={() => setDeleteTarget(null)}>
              Cancel
            </Button>
            <Button
              size="sm"
              isLoading={deleting}
              onClick={handleDeleteConfirm}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Delete Project
            </Button>
          </div>
        </div>
      </Modal>
    </AdminLayout>
  );
};
