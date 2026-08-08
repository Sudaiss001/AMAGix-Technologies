import React, { useState } from "react";
import { User, KeyRound, CheckCircle2, ShieldCheck, Save } from "lucide-react";
import { AdminLayout } from "../components/AdminLayout";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Card } from "../../components/ui/Card";
import { SEO } from "../../components/common/SEO";
import { useAdminAuth } from "../context/AdminAuthContext";

export const AdminProfile: React.FC = () => {
  const { adminUser } = useAdminAuth();

  const [name, setName] = useState(adminUser?.name || "AMAGix Admin");
  const [email, setEmail] = useState(adminUser?.email || "amagixtechnologies@gmail.com");

  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const [profileMsg, setProfileMsg] = useState<string | null>(null);
  const [passMsg, setPassMsg] = useState<string | null>(null);
  const [passError, setPassError] = useState<string | null>(null);

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProfileMsg("Admin profile updated successfully.");
    setTimeout(() => setProfileMsg(null), 4000);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPassError(null);
    setPassMsg(null);

    if (newPass.length < 6) {
      setPassError("New password must be at least 6 characters long.");
      return;
    }
    if (newPass !== confirmPass) {
      setPassError("New passwords do not match.");
      return;
    }

    setPassMsg("Password change simulated. In production, Laravel Sanctum will update the hashed password.");
    setCurrentPass("");
    setNewPass("");
    setConfirmPass("");
    setTimeout(() => setPassMsg(null), 5000);
  };

  return (
    <AdminLayout title="Admin Profile & Security">
      <SEO title="Admin Profile | AMAGix Control Panel" />

      <div className="space-y-8 max-w-4xl mx-auto">
        
        {/* Header Banner */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-gray-900 via-slate-900 to-gray-950 border border-gray-800 shadow-xl flex flex-col sm:flex-row items-center gap-6">
          <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-cyan-500/40 bg-gray-900 shadow-2xl shrink-0">
            <img src="/logo.jpeg" alt="Admin Avatar" className="w-full h-full object-cover" />
          </div>
          <div className="text-center sm:text-left space-y-1">
            <h2 className="text-2xl font-extrabold text-white tracking-tight">{name}</h2>
            <p className="text-xs font-mono text-cyan-400">{adminUser?.role || "Super Administrator"}</p>
            <p className="text-xs text-gray-400 font-mono">{email}</p>
          </div>
        </div>

        {/* Profile Details Form */}
        <Card className="p-6 sm:p-8 space-y-6 border-gray-800">
          <div className="border-b border-gray-800 pb-3 flex items-center gap-2">
            <User className="w-5 h-5 text-cyan-400" />
            <h3 className="text-lg font-bold text-white">Administrator Personal Information</h3>
          </div>

          {profileMsg && (
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{profileMsg}</span>
            </div>
          )}

          <form onSubmit={handleProfileSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Input
                label="Full Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                label="Email Address"
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex justify-end pt-2">
              <Button type="submit" size="sm" leftIcon={<Save className="w-4 h-4" />}>
                Save Profile Changes
              </Button>
            </div>
          </form>
        </Card>

        {/* Change Password Form */}
        <Card className="p-6 sm:p-8 space-y-6 border-gray-800">
          <div className="border-b border-gray-800 pb-3 flex items-center gap-2">
            <KeyRound className="w-5 h-5 text-purple-400" />
            <h3 className="text-lg font-bold text-white">Security & Password Management</h3>
          </div>

          {passError && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs">
              {passError}
            </div>
          )}

          {passMsg && (
            <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>{passMsg}</span>
            </div>
          )}

          <form onSubmit={handlePasswordSubmit} className="space-y-6">
            <Input
              label="Current Password"
              type="password"
              required
              placeholder="••••••••"
              value={currentPass}
              onChange={(e) => setCurrentPass(e.target.value)}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Input
                label="New Password"
                type="password"
                required
                placeholder="••••••••"
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
              />
              <Input
                label="Confirm New Password"
                type="password"
                required
                placeholder="••••••••"
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
              />
            </div>

            <div className="flex justify-end pt-2">
              <Button type="submit" size="sm" leftIcon={<KeyRound className="w-4 h-4" />}>
                Update Password
              </Button>
            </div>
          </form>
        </Card>

      </div>
    </AdminLayout>
  );
};
