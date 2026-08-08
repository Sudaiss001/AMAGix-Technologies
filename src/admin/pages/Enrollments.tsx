import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search, Eye, GraduationCap } from "lucide-react";
import { AdminLayout } from "../components/AdminLayout";
import { StatusBadge } from "../components/StatusBadge";
import { DataTable } from "../components/DataTable";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { LoadingState } from "../components/LoadingState";
import { ErrorState } from "../components/ErrorState";
import { SEO } from "../../components/common/SEO";
import { adminApi } from "../../services/adminApi";
import type { EnrollmentRecord } from "../data/mockEnrollments";

export const AdminEnrollments: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [records, setRecords] = useState<EnrollmentRecord[]>([]);

  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");
  const [statusFilter, setStatusFilter] = useState("All");
  const [courseFilter, setCourseFilter] = useState("All");

  const fetchEnrollments = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await adminApi.getEnrollments();
      if (res.success) {
        setRecords(res.data);
      }
    } catch (err) {
      setError("Failed to fetch student enrollment records.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const filteredRecords = records.filter((rec) => {
    const matchesSearch =
      rec.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.phone.includes(searchTerm) ||
      rec.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "All" || rec.status === statusFilter;
    const matchesCourse = courseFilter === "All" || rec.courseTitle === courseFilter;

    return matchesSearch && matchesStatus && matchesCourse;
  });

  const coursesList = ["All", ...Array.from(new Set(records.map((r) => r.courseTitle)))];
  const statusesList = ["All", "New", "Reviewing", "Contacted", "Enrolled", "Rejected"];

  return (
    <AdminLayout title="Enrollments Management">
      <SEO title="Student Enrollments | AMAGix Admin" />

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-gray-900 via-slate-900 to-gray-950 border border-gray-800 shadow-xl">
        <div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            Student Application <span className="gradient-text">Enrollments</span>
          </h2>
          <p className="text-xs text-gray-400 font-mono mt-1">
            Review, evaluate, and manage academy student applications.
          </p>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 bg-cyan-500/10 px-3 py-1.5 rounded-xl border border-cyan-500/20 w-fit">
          <GraduationCap className="w-4 h-4" /> Total: {records.length} Applications
        </div>
      </div>

      {/* Filter & Search Bar */}
      <Card className="p-4 space-y-4 border-gray-800">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          
          {/* Search Field */}
          <div className="sm:col-span-6 relative">
            <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by student name, email, phone or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-900 border border-gray-800 rounded-xl pl-10 pr-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors font-mono"
            />
          </div>

          {/* Status Filter */}
          <div className="sm:col-span-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full bg-gray-900 border border-gray-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors font-mono"
            >
              {statusesList.map((st) => (
                <option key={st} value={st}>Status: {st}</option>
              ))}
            </select>
          </div>

          {/* Course Filter */}
          <div className="sm:col-span-3">
            <select
              value={courseFilter}
              onChange={(e) => setCourseFilter(e.target.value)}
              className="w-full bg-gray-900 border border-gray-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors font-mono"
            >
              {coursesList.map((cr) => (
                <option key={cr} value={cr}>Course: {cr}</option>
              ))}
            </select>
          </div>

        </div>
      </Card>

      {/* Main Table */}
      {loading ? (
        <LoadingState rows={6} />
      ) : error ? (
        <ErrorState message={error} onRetry={fetchEnrollments} />
      ) : (
        <Card className="p-0 overflow-hidden border-gray-800">
          <DataTable
            data={filteredRecords}
            keyExtractor={(item) => item.id}
            emptyTitle="No enrollments match criteria"
            emptyDescription="Try adjusting your search terms or filter selection."
            columns={[
              {
                header: "APPLICATION ID",
                accessor: (item) => <span className="font-mono text-cyan-400 font-bold">{item.id}</span>
              },
              {
                header: "STUDENT NAME",
                accessor: (item) => (
                  <div>
                    <p className="font-bold text-white">{item.fullName}</p>
                    <p className="text-[11px] text-gray-500 font-mono">{item.email}</p>
                  </div>
                )
              },
              { header: "PHONE", accessor: "phone" },
              { header: "COURSE", accessor: "courseTitle" },
              { header: "LEARNING FORMAT", accessor: "learningFormat" },
              {
                header: "STATUS",
                accessor: (item) => <StatusBadge status={item.status} />
              },
              { header: "SUBMITTED AT", accessor: "submittedAt" },
              {
                header: "ACTION",
                accessor: (item) => (
                  <Link to={`/admin/enrollments/${item.id}`}>
                    <Button variant="secondary" size="sm" leftIcon={<Eye className="w-3.5 h-3.5" />}>
                      Inspect
                    </Button>
                  </Link>
                )
              }
            ]}
          />
        </Card>
      )}
    </AdminLayout>
  );
};
