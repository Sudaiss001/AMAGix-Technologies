import React, { useEffect, useState } from "react";
import { Save, CheckCircle2, Building, Share2 } from "lucide-react";
import { AdminLayout } from "../components/AdminLayout";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Card } from "../../components/ui/Card";
import { LoadingState } from "../components/LoadingState";
import { ErrorState } from "../components/ErrorState";
import { SEO } from "../../components/common/SEO";
import { adminApi } from "../../services/adminApi";
import type { SiteConfig } from "../../data/site";

export const AdminSettings: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const [settings, setSettings] = useState<SiteConfig | null>(null);

  const fetchSettings = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await adminApi.getSiteSettings();
      if (res.success) {
        setSettings(res.data);
      }
    } catch (err) {
      setError("Failed to fetch site settings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    setSaving(true);
    setSuccessMsg(null);
    try {
      const res = await adminApi.updateSiteSettings(settings);
      if (res.success) {
        setSuccessMsg(res.message || "Site settings updated successfully.");
        setTimeout(() => setSuccessMsg(null), 4000);
      }
    } catch (err) {
      setError("Failed to save settings.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout title="Site & Company Settings">
      <SEO title="Site Settings | AMAGix Admin" />

      <div className="space-y-6 max-w-4xl mx-auto">
        
        {/* Header Banner */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-gray-900 via-slate-900 to-gray-950 border border-gray-800 shadow-xl">
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            Company & Site <span className="gradient-text">Settings</span>
          </h2>
          <p className="text-xs text-gray-400 font-mono mt-1">
            Manage official corporate contact details, location, and social media handles.
          </p>
        </div>

        {loading ? (
          <LoadingState rows={4} />
        ) : error || !settings ? (
          <ErrorState message={error || "Settings unavailable"} onRetry={fetchSettings} />
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {successMsg && (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>{successMsg}</span>
              </div>
            )}

            {/* Official Company Details */}
            <Card className="p-6 sm:p-8 space-y-6 border-gray-800">
              <div className="border-b border-gray-800 pb-3 flex items-center gap-2">
                <Building className="w-5 h-5 text-cyan-400" />
                <h3 className="text-lg font-bold text-white">Official Company Information</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Input
                  label="Company Name"
                  required
                  value={settings.name}
                  onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                />

                <Input
                  label="Official Email Address"
                  required
                  type="email"
                  value={settings.contact.email}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      contact: { ...settings.contact, email: e.target.value }
                    })
                  }
                />

                <Input
                  label="Official Phone Number"
                  required
                  value={settings.contact.phone}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      contact: { ...settings.contact, phone: e.target.value }
                    })
                  }
                />

                <Input
                  label="Official Location Address"
                  required
                  value={settings.location.fullLocation}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      location: { ...settings.location, fullLocation: e.target.value, address: e.target.value }
                    })
                  }
                />
              </div>
            </Card>

            {/* Social Media Links */}
            <Card className="p-6 sm:p-8 space-y-6 border-gray-800">
              <div className="border-b border-gray-800 pb-3 flex items-center gap-2">
                <Share2 className="w-5 h-5 text-purple-400" />
                <h3 className="text-lg font-bold text-white">Social Media Channels</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Input
                  label="WhatsApp URL / Number"
                  value={settings.contact.whatsapp}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      contact: { ...settings.contact, whatsapp: e.target.value }
                    })
                  }
                />

                <Input
                  label="GitHub Organization URL"
                  value={settings.socials.github}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      socials: { ...settings.socials, github: e.target.value }
                    })
                  }
                />

                <Input
                  label="LinkedIn Page URL"
                  value={settings.socials.linkedin}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      socials: { ...settings.socials, linkedin: e.target.value }
                    })
                  }
                />

                <Input
                  label="Twitter / X Handle URL"
                  value={settings.socials.twitter}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      socials: { ...settings.socials, twitter: e.target.value }
                    })
                  }
                />
              </div>

              <div className="flex items-center justify-end pt-4 border-t border-gray-800">
                <Button type="submit" isLoading={saving} leftIcon={<Save className="w-4 h-4" />}>
                  Save Settings
                </Button>
              </div>
            </Card>

          </form>
        )}

      </div>
    </AdminLayout>
  );
};
