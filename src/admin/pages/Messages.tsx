import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search, Mail, Eye } from "lucide-react";
import { AdminLayout } from "../components/AdminLayout";
import { StatusBadge } from "../components/StatusBadge";
import { DataTable } from "../components/DataTable";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { LoadingState } from "../components/LoadingState";
import { ErrorState } from "../components/ErrorState";
import { SEO } from "../../components/common/SEO";
import { adminApi } from "../../services/adminApi";
import type { MessageRecord } from "../data/mockMessages";

export const AdminMessages: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<MessageRecord[]>([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const fetchMessages = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await adminApi.getMessages();
      if (res.success) {
        setMessages(res.data);
      }
    } catch (err) {
      setError("Failed to fetch contact inquiries.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const filteredMessages = messages.filter((m) => {
    const matchesSearch =
      m.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.subject.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "All" || m.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statuses = ["All", "Unread", "Read", "Replied", "Archived"];

  return (
    <AdminLayout title="Messages & Inquiries">
      <SEO title="Contact Inquiries | AMAGix Admin" />

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-gray-900 via-slate-900 to-gray-950 border border-gray-800 shadow-xl">
        <div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            Contact <span className="gradient-text">Messages Inbox</span>
          </h2>
          <p className="text-xs text-gray-400 font-mono mt-1">
            Manage inquiries, corporate requests, and messages sent via the contact page.
          </p>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20 w-fit">
          <Mail className="w-4 h-4" /> Total Messages: {messages.length}
        </div>
      </div>

      {/* Search & Filter Bar */}
      <Card className="p-4 space-y-4 border-gray-800">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-8 relative">
            <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search sender, email or subject..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-900 border border-gray-800 rounded-xl pl-10 pr-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors font-mono"
            />
          </div>

          <div className="sm:col-span-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full bg-gray-900 border border-gray-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors font-mono"
            >
              {statuses.map((st) => (
                <option key={st} value={st}>Filter Status: {st}</option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {/* Table */}
      {loading ? (
        <LoadingState rows={5} />
      ) : error ? (
        <ErrorState message={error} onRetry={fetchMessages} />
      ) : (
        <Card className="p-0 overflow-hidden border-gray-800">
          <DataTable
            data={filteredMessages}
            keyExtractor={(item) => item.id}
            emptyTitle="No messages match filter"
            emptyDescription="There are no contact inquiries matching your search."
            columns={[
              {
                header: "SENDER",
                accessor: (item) => (
                  <div>
                    <p className={`font-bold ${item.status === "Unread" ? "text-cyan-400 font-extrabold" : "text-white"}`}>
                      {item.fullName}
                    </p>
                    <p className="text-[11px] text-gray-500 font-mono">{item.email}</p>
                  </div>
                )
              },
              {
                header: "SUBJECT",
                accessor: (item) => (
                  <p className="font-semibold text-gray-200 line-clamp-1 max-w-xs">{item.subject}</p>
                )
              },
              {
                header: "STATUS",
                accessor: (item) => <StatusBadge status={item.status} />
              },
              { header: "DATE", accessor: "submittedAt" },
              {
                header: "ACTION",
                accessor: (item) => (
                  <Link to={`/admin/messages/${item.id}`}>
                    <Button variant="secondary" size="sm" leftIcon={<Eye className="w-3.5 h-3.5" />}>
                      Read Message
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
