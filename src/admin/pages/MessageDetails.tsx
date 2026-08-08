import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, Phone, Calendar, CheckCircle2, Archive, Reply } from "lucide-react";
import { AdminLayout } from "../components/AdminLayout";
import { StatusBadge } from "../components/StatusBadge";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { LoadingState } from "../components/LoadingState";
import { ErrorState } from "../components/ErrorState";
import { SEO } from "../../components/common/SEO";
import { adminApi } from "../../services/adminApi";
import type { MessageRecord } from "../data/mockMessages";

export const AdminMessageDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<MessageRecord | null>(null);
  const [updating, setUpdating] = useState(false);
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  const fetchMessage = async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const res = await adminApi.getMessageById(id);
      if (res.success && res.data) {
        setMessage(res.data);
      } else {
        setError("Message record not found.");
      }
    } catch (err) {
      setError("Failed to load message.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessage();
  }, [id]);

  const handleUpdateStatus = async (newStatus: MessageRecord["status"]) => {
    if (!message) return;
    setUpdating(true);
    setActionFeedback(null);
    try {
      const res = await adminApi.updateMessageStatus(message.id, newStatus);
      if (res.success && res.data) {
        setMessage(res.data);
        setActionFeedback(`Message status updated to ${newStatus}`);
        setTimeout(() => setActionFeedback(null), 4000);
      }
    } catch (err) {
      setActionFeedback("Failed to update status.");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <AdminLayout title="Inquiry Inspection">
      <SEO title={`Message ${id} | AMAGix Admin`} />

      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate("/admin/messages")}
            className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Messages List
          </button>
          {message && <StatusBadge status={message.status} size="md" />}
        </div>

        {loading ? (
          <LoadingState rows={4} />
        ) : error || !message ? (
          <ErrorState message={error || "Message not found"} onRetry={fetchMessage} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Content (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              
              <Card className="p-6 space-y-6 border-gray-800">
                <div className="border-b border-gray-800 pb-4 space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400">SUBJECT</span>
                  <h3 className="text-xl font-bold text-white">{message.subject}</h3>
                </div>

                {/* Sender Metadata */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs p-4 rounded-xl bg-gray-900/60 border border-gray-800">
                  <div>
                    <span className="text-gray-500 font-mono">FROM</span>
                    <p className="font-bold text-white text-sm">{message.fullName}</p>
                    <a href={`mailto:${message.email}`} className="text-cyan-400 hover:underline font-mono">
                      {message.email}
                    </a>
                  </div>

                  <div>
                    <span className="text-gray-500 font-mono">PHONE & DATE</span>
                    <p className="font-bold text-gray-200">{message.phone || "Not provided"}</p>
                    <p className="text-gray-400 font-mono">{message.submittedAt}</p>
                  </div>
                </div>

                {/* Full Message Body */}
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-mono text-gray-400">MESSAGE BODY</span>
                  <div className="p-5 rounded-xl bg-gray-950 border border-gray-800 text-sm text-gray-200 leading-relaxed font-sans whitespace-pre-wrap">
                    {message.message}
                  </div>
                </div>
              </Card>

            </div>

            {/* Right Action Sidebar (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              
              <Card className="p-6 space-y-6 border-gray-800">
                <h4 className="text-base font-bold text-white border-b border-gray-800 pb-3">
                  Message Actions
                </h4>

                {actionFeedback && (
                  <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-cyan-400" />
                    <span>{actionFeedback}</span>
                  </div>
                )}

                <div className="space-y-3">
                  <a
                    href={`mailto:${message.email}?subject=RE: ${encodeURIComponent(message.subject)}`}
                    onClick={() => handleUpdateStatus("Replied")}
                    className="w-full"
                  >
                    <Button size="md" className="w-full" leftIcon={<Reply className="w-4 h-4" />}>
                      Reply via Email Client
                    </Button>
                  </a>

                  <Button
                    variant="outline"
                    size="md"
                    className="w-full"
                    disabled={updating || message.status === "Archived"}
                    onClick={() => handleUpdateStatus("Archived")}
                    leftIcon={<Archive className="w-4 h-4" />}
                  >
                    {message.status === "Archived" ? "Archived" : "Archive Message"}
                  </Button>
                </div>

                <div className="pt-4 border-t border-gray-800 text-[11px] font-mono text-gray-500 space-y-1">
                  <p>Message ID: {message.id}</p>
                  <p>Status: {message.status}</p>
                </div>
              </Card>

            </div>

          </div>
        )}
      </div>
    </AdminLayout>
  );
};
