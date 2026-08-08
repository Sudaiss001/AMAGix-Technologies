import React from "react";
import { Link } from "react-router-dom";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { AdminLayout } from "../components/AdminLayout";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { SEO } from "../../components/common/SEO";

export const AdminNotFound: React.FC = () => {
  return (
    <AdminLayout title="404 — Admin Page Not Found">
      <SEO title="404 Not Found | AMAGix Admin" />

      <div className="py-16 text-center max-w-lg mx-auto space-y-6">
        <Card className="p-8 border-gray-800 bg-gray-950/80 space-y-6">
          <div className="p-4 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 w-fit mx-auto">
            <AlertCircle className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl font-extrabold text-white tracking-tight">404 Page Not Found</h2>
            <p className="text-xs text-gray-400 font-mono leading-relaxed">
              The requested administrative endpoint or resource does not exist in the AMAGix control panel.
            </p>
          </div>

          <Link to="/admin" className="inline-block">
            <Button size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />}>
              Return to Admin Dashboard
            </Button>
          </Link>
        </Card>
      </div>
    </AdminLayout>
  );
};
