import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { 
  GraduationCap, 
  Mail, 
  Briefcase, 
  Plus, 
  ArrowRight, 
  Activity,
  UserPlus
} from "lucide-react";
import { AdminLayout } from "../components/AdminLayout";
import { StatCard } from "../components/StatCard";
import { StatusBadge } from "../components/StatusBadge";
import { DataTable } from "../components/DataTable";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { LoadingState } from "../components/LoadingState";
import { ErrorState } from "../components/ErrorState";
import { SEO } from "../../components/common/SEO";
import { adminApi } from "../../services/adminApi";
import type { DashboardStats, ActivityItem } from "../data/mockDashboard";
import type { EnrollmentRecord } from "../data/mockEnrollments";
import type { MessageRecord } from "../data/mockMessages";

export const AdminDashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [enrollments, setEnrollments] = useState<EnrollmentRecord[]>([]);
  const [messages, setMessages] = useState<MessageRecord[]>([]);
  const [courseInterest, setCourseInterest] = useState<Array<{ course: string; students: number; percentage: number }>>([]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [dashRes, enrRes, msgRes] = await Promise.all([
        adminApi.getDashboardStats(),
        adminApi.getEnrollments(),
        adminApi.getMessages()
      ]);

      if (dashRes.success) {
        setStats(dashRes.data.stats);
        setActivities(dashRes.data.activities);
        setCourseInterest(dashRes.data.courseInterest);
      }
      if (enrRes.success) {
        setEnrollments(enrRes.data.slice(0, 5));
      }
      if (msgRes.success) {
        setMessages(msgRes.data.slice(0, 5));
      }
    } catch (err) {
      setError("Failed to connect to administrative data service.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AdminLayout title="Overview Dashboard">
      <SEO title="Admin Overview | AMAGix Technologies" />

      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-gray-900 via-slate-900 to-gray-950 border border-gray-800 shadow-xl">
        <div className="space-y-1">
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            Good day, <span className="gradient-text">Administrator</span> 👋
          </h2>
          <p className="text-xs text-gray-400 font-mono">
            Here's what is happening with AMAGix Technologies digital services and academy.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/admin/courses/new">
            <Button size="sm" leftIcon={<Plus className="w-4 h-4" />}>
              Add Course
            </Button>
          </Link>
          <Link to="/admin/projects/new">
            <Button variant="secondary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
              Add Project
            </Button>
          </Link>
        </div>
      </div>

      {loading ? (
        <LoadingState rows={4} />
      ) : error ? (
        <ErrorState message={error} onRetry={fetchData} />
      ) : (
        <>
          {/* Stat Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <StatCard
              title="Total Enrollments"
              value={stats?.totalEnrollments || 0}
              change={stats?.enrollmentsChange}
              icon={<GraduationCap className="w-6 h-6" />}
              variant="cyan"
            />
            <StatCard
              title="New Applications"
              value={stats?.newEnrollments || 0}
              change={stats?.newEnrollmentsChange}
              icon={<UserPlus className="w-6 h-6" />}
              variant="emerald"
            />
            <StatCard
              title="Contact Messages"
              value={stats?.totalMessages || 0}
              change={`${stats?.unreadMessages || 0} Unread`}
              icon={<Mail className="w-6 h-6" />}
              variant="purple"
            />
            <StatCard
              title="Active Projects"
              value={stats?.totalProjects || 0}
              change={`${stats?.featuredProjects || 0} Featured`}
              icon={<Briefcase className="w-6 h-6" />}
              variant="amber"
            />
          </div>

          {/* Main Grid: Recent Enrollments (8 cols) & Activity Timeline (4 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column (8 cols) */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Recent Enrollments Table */}
              <Card className="p-6 space-y-4 border-gray-800">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white">Recent Enrollments</h3>
                    <p className="text-xs text-gray-400 font-mono">Latest student applications received</p>
                  </div>
                  <Link to="/admin/enrollments">
                    <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                      View All
                    </Button>
                  </Link>
                </div>

                <DataTable
                  data={enrollments}
                  keyExtractor={(item) => item.id}
                  columns={[
                    {
                      header: "Student",
                      accessor: (item) => (
                        <div>
                          <p className="font-bold text-white">{item.fullName}</p>
                          <p className="text-[11px] text-gray-500 font-mono">{item.email}</p>
                        </div>
                      )
                    },
                    { header: "Course", accessor: "courseTitle" },
                    {
                      header: "Status",
                      accessor: (item) => <StatusBadge status={item.status} />
                    },
                    { header: "Date", accessor: "submittedAt" }
                  ]}
                />
              </Card>

              {/* Course Interest Analytics */}
              <Card className="p-6 space-y-4 border-gray-800">
                <h3 className="text-lg font-bold text-white">Academy Course Demand Analytics</h3>
                <p className="text-xs text-gray-400 font-mono">Student enrollment distribution across training programs</p>

                <div className="space-y-4 pt-2">
                  {courseInterest.map((ci, i) => (
                    <div key={i} className="space-y-1.5">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-gray-200 font-semibold">{ci.course}</span>
                        <span className="text-cyan-400">{ci.students} students ({ci.percentage}%)</span>
                      </div>
                      <div className="h-2 rounded-full bg-gray-900 overflow-hidden border border-gray-800">
                        <div
                          className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 rounded-full"
                          style={{ width: `${ci.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

            </div>

            {/* Right Column (4 cols) */}
            <div className="lg:col-span-4 space-y-8">
              
              {/* Unread Contact Messages */}
              <Card className="p-6 space-y-4 border-gray-800">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white">Recent Inquiries</h3>
                  <Link to="/admin/messages" className="text-xs font-mono text-cyan-400 hover:underline">
                    View All
                  </Link>
                </div>

                <div className="space-y-3">
                  {messages.slice(0, 3).map((m) => (
                    <Link
                      key={m.id}
                      to={`/admin/messages/${m.id}`}
                      className="block p-3.5 rounded-xl bg-gray-900/60 border border-gray-800 hover:border-cyan-500/40 transition-colors space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white truncate">{m.fullName}</span>
                        <StatusBadge status={m.status} />
                      </div>
                      <p className="text-xs text-gray-300 font-medium truncate">{m.subject}</p>
                      <p className="text-[10px] font-mono text-gray-500">{m.submittedAt}</p>
                    </Link>
                  ))}
                </div>
              </Card>

              {/* Activity Timeline */}
              <Card className="p-6 space-y-4 border-gray-800">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Activity className="w-4 h-4 text-cyan-400" /> Recent Activity
                </h3>

                <div className="space-y-4 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-800">
                  {activities.map((act) => (
                    <div key={act.id} className="relative flex items-start space-x-3 pl-8">
                      <div className="absolute left-1.5 top-1 w-4 h-4 rounded-full bg-cyan-500/20 border border-cyan-500 text-cyan-400 flex items-center justify-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-xs font-bold text-gray-200">{act.title}</p>
                        <p className="text-[11px] text-gray-400 leading-relaxed">{act.description}</p>
                        <span className="text-[10px] font-mono text-gray-500">{act.timestamp}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

            </div>

          </div>
        </>
      )}
    </AdminLayout>
  );
};
