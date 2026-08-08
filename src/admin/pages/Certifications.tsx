import React, { useEffect, useState } from "react";
import { Plus, Award, Trash2 } from "lucide-react";
import { AdminLayout } from "../components/AdminLayout";
import { StatusBadge } from "../components/StatusBadge";
import { DataTable } from "../components/DataTable";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { LoadingState } from "../components/LoadingState";
import { ErrorState } from "../components/ErrorState";
import { Modal } from "../components/Modal";
import { SEO } from "../../components/common/SEO";
import { adminApi } from "../../services/adminApi";
import type { CertificationRecord } from "../data/mockCertifications";

export const AdminCertifications: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [certs, setCerts] = useState<CertificationRecord[]>([]);

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [newCert, setNewCert] = useState({
    certificationName: "",
    issuingOrganization: "",
    year: "2026",
    status: "Published" as const
  });

  const fetchCertifications = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await adminApi.getCertifications();
      if (res.success) {
        setCerts(res.data);
      }
    } catch (err) {
      setError("Failed to fetch certifications.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertifications();
  }, []);

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await adminApi.saveCertification(newCert);
      if (res.success && res.data) {
        setCerts([res.data, ...certs]);
        setAddModalOpen(false);
        setNewCert({
          certificationName: "",
          issuingOrganization: "",
          year: "2026",
          status: "Published"
        });
      }
    } catch (err) {
      setError("Failed to add certification.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await adminApi.deleteCertification(id);
      if (res.success) {
        setCerts(certs.filter((c) => c.id !== id));
      }
    } catch (err) {
      setError("Failed to delete certification.");
    }
  };

  return (
    <AdminLayout title="Company Certifications">
      <SEO title="Certifications Management | AMAGix Admin" />

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-gray-900 via-slate-900 to-gray-950 border border-gray-800 shadow-xl">
        <div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            Company Accreditation & <span className="gradient-text">Certifications</span>
          </h2>
          <p className="text-xs text-gray-400 font-mono mt-1">
            Manage official business licenses, ISO standards, and agency certifications.
          </p>
        </div>
        <Button size="sm" onClick={() => setAddModalOpen(true)} leftIcon={<Plus className="w-4 h-4" />}>
          Add Certification
        </Button>
      </div>

      {/* Main Table */}
      {loading ? (
        <LoadingState rows={4} />
      ) : error ? (
        <ErrorState message={error} onRetry={fetchCertifications} />
      ) : (
        <Card className="p-0 overflow-hidden border-gray-800">
          <DataTable
            data={certs}
            keyExtractor={(item) => item.id}
            columns={[
              {
                header: "CERTIFICATION NAME",
                accessor: (item) => (
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shrink-0">
                      <Award className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-bold text-white text-sm">{item.certificationName}</p>
                      <p className="text-[11px] text-gray-500 font-mono">ID: {item.id}</p>
                    </div>
                  </div>
                )
              },
              { header: "ISSUING ORGANIZATION", accessor: "issuingOrganization" },
              {
                header: "YEAR",
                accessor: (item) => <span className="font-mono text-cyan-400 font-bold">{item.year}</span>
              },
              {
                header: "STATUS",
                accessor: (item) => <StatusBadge status={item.status} />
              },
              {
                header: "ACTION",
                accessor: (item) => (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(item.id)}
                    className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                )
              }
            ]}
          />
        </Card>
      )}

      {/* Add Modal */}
      <Modal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        title="Add Company Certification"
      >
        <form onSubmit={handleCreateSubmit} className="space-y-4">
          <Input
            label="Certification Name"
            required
            placeholder="e.g. ISO 27001 Information Security Management"
            value={newCert.certificationName}
            onChange={(e) => setNewCert({ ...newCert, certificationName: e.target.value })}
          />

          <Input
            label="Issuing Organization"
            required
            placeholder="e.g. Corporate Affairs Commission"
            value={newCert.issuingOrganization}
            onChange={(e) => setNewCert({ ...newCert, issuingOrganization: e.target.value })}
          />

          <Input
            label="Year Issued"
            required
            placeholder="2026"
            value={newCert.year}
            onChange={(e) => setNewCert({ ...newCert, year: e.target.value })}
          />

          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" size="sm" onClick={() => setAddModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" size="sm" isLoading={saving}>
              Save Certification
            </Button>
          </div>
        </form>
      </Modal>
    </AdminLayout>
  );
};
