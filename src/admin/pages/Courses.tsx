import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Edit, Trash2, BookOpen } from "lucide-react";
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
import type { AdminCourse } from "../data/mockCourses";

export const AdminCourses: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [courses, setCourses] = useState<AdminCourse[]>([]);
  
  const [deleteTarget, setDeleteTarget] = useState<AdminCourse | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchCourses = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await adminApi.getCourses();
      if (res.success) {
        setCourses(res.data);
      }
    } catch (err) {
      setError("Failed to fetch course catalog.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await adminApi.deleteCourse(deleteTarget.id);
      if (res.success) {
        setCourses(courses.filter((c) => c.id !== deleteTarget.id));
        setDeleteTarget(null);
      }
    } catch (err) {
      setError("Failed to delete course.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <AdminLayout title="Course Catalog Management">
      <SEO title="Courses Management | AMAGix Admin" />

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-gray-900 via-slate-900 to-gray-950 border border-gray-800 shadow-xl">
        <div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            Academy <span className="gradient-text">Training Courses</span>
          </h2>
          <p className="text-xs text-gray-400 font-mono mt-1">
            Create, edit, publish and organize tech academy training curriculums.
          </p>
        </div>
        <Link to="/admin/courses/new">
          <Button size="sm" leftIcon={<Plus className="w-4 h-4" />}>
            New Course
          </Button>
        </Link>
      </div>

      {/* Main Table */}
      {loading ? (
        <LoadingState rows={5} />
      ) : error ? (
        <ErrorState message={error} onRetry={fetchCourses} />
      ) : (
        <Card className="p-0 overflow-hidden border-gray-800">
          <DataTable
            data={courses}
            keyExtractor={(item) => item.id}
            columns={[
              {
                header: "COURSE TITLE",
                accessor: (item) => (
                  <div>
                    <p className="font-bold text-white text-sm">{item.title}</p>
                    <p className="text-[11px] text-gray-500 font-mono">/{item.slug}</p>
                  </div>
                )
              },
              { header: "CATEGORY", accessor: "category" },
              { header: "DURATION", accessor: "duration" },
              { header: "LEVEL", accessor: "level" },
              {
                header: "STUDENTS",
                accessor: (item) => (
                  <span className="font-mono text-cyan-400 font-bold">{item.enrolledStudentsCount}</span>
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
                      size="xs"
                      onClick={() => navigate(`/admin/courses/${item.id}/edit`)}
                      leftIcon={<Edit className="w-3.5 h-3.5" />}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="xs"
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
        title="Confirm Course Deletion"
      >
        <div className="space-y-4">
          <p className="text-xs text-gray-300 leading-relaxed">
            Are you sure you want to delete <span className="font-bold text-white">"{deleteTarget?.title}"</span>? This action cannot be undone.
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
              Delete Course
            </Button>
          </div>
        </div>
      </Modal>
    </AdminLayout>
  );
};
