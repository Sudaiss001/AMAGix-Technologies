import React, { useEffect, useState } from "react";
import { Star, CheckCircle2, XCircle, Trash2 } from "lucide-react";
import { AdminLayout } from "../components/AdminLayout";
import { StatusBadge } from "../components/StatusBadge";
import { DataTable } from "../components/DataTable";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { LoadingState } from "../components/LoadingState";
import { ErrorState } from "../components/ErrorState";
import { SEO } from "../../components/common/SEO";
import { adminApi } from "../../services/adminApi";
import type { TestimonialRecord } from "../data/mockTestimonials";

export const AdminTestimonials: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [testimonials, setTestimonials] = useState<TestimonialRecord[]>([]);

  const fetchTestimonials = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await adminApi.getTestimonials();
      if (res.success) {
        setTestimonials(res.data);
      }
    } catch (err) {
      setError("Failed to fetch testimonials.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleStatusToggle = async (id: string, newStatus: TestimonialRecord["status"]) => {
    try {
      const res = await adminApi.updateTestimonialStatus(id, newStatus);
      if (res.success) {
        setTestimonials(testimonials.map((t) => (t.id === id ? { ...t, status: newStatus } : t)));
      }
    } catch (err) {
      setError("Failed to update status.");
    }
  };

  return (
    <AdminLayout title="Client Testimonials">
      <SEO title="Testimonials Management | AMAGix Admin" />

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-gray-900 via-slate-900 to-gray-950 border border-gray-800 shadow-xl">
        <div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            Client Feedback & <span className="gradient-text">Testimonials</span>
          </h2>
          <p className="text-xs text-gray-400 font-mono mt-1">
            Review, approve, and publish client testimonials for display.
          </p>
        </div>
      </div>

      {/* Main Table */}
      {loading ? (
        <LoadingState rows={4} />
      ) : error ? (
        <ErrorState message={error} onRetry={fetchTestimonials} />
      ) : (
        <Card className="p-0 overflow-hidden border-gray-800">
          <DataTable
            data={testimonials}
            keyExtractor={(item) => item.id}
            columns={[
              {
                header: "CLIENT NAME",
                accessor: (item) => (
                  <div>
                    <p className="font-bold text-white text-sm">{item.clientName}</p>
                    <p className="text-[11px] text-gray-500 font-mono">{item.role}, {item.company}</p>
                  </div>
                )
              },
              {
                header: "TESTIMONIAL MESSAGE",
                accessor: (item) => (
                  <p className="text-xs text-gray-300 italic max-w-md line-clamp-2">"{item.message}"</p>
                )
              },
              {
                header: "RATING",
                accessor: (item) => (
                  <div className="flex items-center space-x-1 text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span className="font-mono text-xs font-bold">{item.rating}.0</span>
                  </div>
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
                    {item.status !== "Published" ? (
                      <Button
                        variant="secondary"
                        size="xs"
                        onClick={() => handleStatusToggle(item.id, "Published")}
                        leftIcon={<CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                      >
                        Publish
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="xs"
                        onClick={() => handleStatusToggle(item.id, "Pending")}
                        leftIcon={<XCircle className="w-3.5 h-3.5 text-amber-400" />}
                      >
                        Unpublish
                      </Button>
                    )}
                  </div>
                )
              }
            ]}
          />
        </Card>
      )}
    </AdminLayout>
  );
};
