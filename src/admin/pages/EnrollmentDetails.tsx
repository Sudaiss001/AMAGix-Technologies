import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, Phone, MapPin, GraduationCap, Calendar, Clock, CheckCircle2 } from "lucide-react";
import { AdminLayout } from "../components/AdminLayout";
import { StatusBadge } from "../components/StatusBadge";
import { Card } from "../../components/ui/Card";
import { LoadingState } from "../components/LoadingState";
import { ErrorState } from "../components/ErrorState";
import { SEO } from "../../components/common/SEO";
import { adminApi } from "../../services/adminApi";
import type { EnrollmentRecord } from "../data/mockEnrollments";

export const AdminEnrollmentDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [record, setRecord] = useState<EnrollmentRecord | null>(null);
  const [updating, setUpdating] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const fetchRecord = async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const res = await adminApi.getEnrollmentById(id);
      if (res.success && res.data) {
        setRecord(res.data);
      } else {
        setError("Enrollment application record not found.");
      }
    } catch (err) {
      setError("Failed to fetch application details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecord();
  }, [id]);

  const handleStatusChange = async (newStatus: EnrollmentRecord["status"]) => {
    if (!record) return;
    setUpdating(true);
    setStatusMessage(null);
    try {
      const res = await adminApi.updateEnrollmentStatus(record.id, newStatus);
      if (res.success && res.data) {
        setRecord(res.data);
        setStatusMessage(res.message || `Status updated to ${newStatus}`);
        setTimeout(() => setStatusMessage(null), 4000);
      }
    } catch (err) {
      setStatusMessage("Failed to update status.");
    } finally {
      setUpdating(false);
    }
  };

  const statuses: EnrollmentRecord["status"][] = ["New", "Reviewing", "Contacted", "Enrolled", "Rejected"];

  return (
    <AdminLayout title="Enrollment Inspection">
      <SEO title={`Application ${id} | AMAGix Admin`} />

      <div className="space-y-6">
        {/* Back Link Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate("/admin/enrollments")}
            className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Enrollments List
          </button>
          {record && <StatusBadge status={record.status} size="md" />}
        </div>

        {loading ? (
          <LoadingState rows={5} />
        ) : error || !record ? (
          <ErrorState message={error || "Record not found"} onRetry={fetchRecord} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Main Information (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Student Personal Info */}
              <Card className="p-6 space-y-6 border-gray-800">
                <div className="flex items-center justify-between border-b border-gray-800 pb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">{record.fullName}</h3>
                    <p className="text-xs text-cyan-400 font-mono mt-0.5">Application ID: {record.id}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
                  <div className="space-y-1">
                    <p className="text-gray-500 font-mono uppercase tracking-wider flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-cyan-400" /> Email Address
                    </p>
                    <a href={`mailto:${record.email}`} className="text-gray-200 font-bold hover:text-cyan-400 transition-colors block">
                      {record.email}
                    </a>
                  </div>

                  <div className="space-y-1">
                    <p className="text-gray-500 font-mono uppercase tracking-wider flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-emerald-400" /> Phone Number
                    </p>
                    <a href={`tel:${record.phone}`} className="text-gray-200 font-bold hover:text-cyan-400 transition-colors block">
                      {record.phone}
                    </a>
                  </div>

                  <div className="space-y-1">
                    <p className="text-gray-500 font-mono uppercase tracking-wider flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-purple-400" /> Location
                    </p>
                    <p className="text-gray-200 font-bold">{record.location}</p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-gray-500 font-mono uppercase tracking-wider flex items-center gap-1.5">
                      <GraduationCap className="w-3.5 h-3.5 text-amber-400" /> Education Level
                    </p>
                    <p className="text-gray-200 font-bold">{record.educationLevel}</p>
                  </div>
                </div>
              </Card>

              {/* Course Requirement Details */}
              <Card className="p-6 space-y-4 border-gray-800">
                <h4 className="text-base font-bold text-white border-b border-gray-800 pb-3">
                  Applied Course Specification
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-3.5 rounded-xl bg-gray-900/60 border border-gray-800 space-y-1">
                    <span className="text-gray-500 font-mono">SELECTED COURSE</span>
                    <p className="text-sm font-extrabold text-cyan-300">{record.courseTitle}</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-gray-900/60 border border-gray-800 space-y-1">
                    <span className="text-gray-500 font-mono">LEARNING FORMAT</span>
                    <p className="text-sm font-extrabold text-emerald-300">{record.learningFormat}</p>
                  </div>
                </div>

                {record.additionalMessage && (
                  <div className="pt-2 space-y-1.5">
                    <span className="text-xs font-mono text-gray-400">STUDENT STATEMENT / GOALS</span>
                    <div className="p-4 rounded-xl bg-gray-950 border border-gray-800 text-xs text-gray-300 leading-relaxed italic">
                      "{record.additionalMessage}"
                    </div>
                  </div>
                )}
              </Card>

            </div>

            {/* Right Status Management Sidebar (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              
              <Card className="p-6 space-y-6 border-gray-800">
                <h4 className="text-base font-bold text-white border-b border-gray-800 pb-3">
                  Update Application Status
                </h4>

                {statusMessage && (
                  <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-cyan-400" />
                    <span>{statusMessage}</span>
                  </div>
                )}

                <div className="space-y-2">
                  {statuses.map((st) => (
                    <button
                      key={st}
                      disabled={updating || record.status === st}
                      onClick={() => handleStatusChange(st)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-semibold border transition-all ${
                        record.status === st
                          ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/40"
                          : "bg-gray-900 border-gray-800 text-gray-400 hover:text-white hover:border-gray-700"
                      }`}
                    >
                      <span>{st}</span>
                      {record.status === st && <CheckCircle2 className="w-4 h-4 text-cyan-400" />}
                    </button>
                  ))}
                </div>

                <div className="pt-4 border-t border-gray-800 text-[11px] font-mono text-gray-500 space-y-1">
                  <p className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-gray-600" /> Submitted: {record.submittedAt}
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-gray-600" /> Last Updated: {record.updatedAt}
                  </p>
                </div>
              </Card>

            </div>

          </div>
        )}
      </div>
    </AdminLayout>
  );
};
