import React, { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, ShieldCheck, ArrowRight, AlertCircle } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Card } from "../../components/ui/Card";
import { SEO } from "../../components/common/SEO";
import { useAdminAuth } from "../context/AdminAuthContext";

export const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAdminAuth();

  const [email, setEmail] = useState("amagixtechnologies@gmail.com");
  const [password, setPassword] = useState("admin123");
  const [showPassword, setShowPassword] = useState(false);
  
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const res = await login(email, password);
      if (res.success) {
        navigate("/admin");
      } else {
        setError(res.message || "Failed to log in.");
      }
    } catch (err) {
      setError("An error occurred during login. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEO title="Admin Login | AMAGix Control Panel" />

      <div className="min-h-screen bg-gradient-to-b from-gray-950 via-slate-900 to-[#0B0F17] flex items-center justify-center p-4 relative overflow-hidden">
        {/* Ambient Glow background */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 blur-[150px] pointer-events-none rounded-full" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md relative z-10"
        >
          <Card className="p-8 sm:p-10 border-gray-800 bg-gray-950/90 shadow-2xl backdrop-blur-xl">
            
            {/* Header Brand */}
            <div className="text-center space-y-3 mb-8">
              <div className="w-16 h-16 rounded-2xl overflow-hidden border border-cyan-500/30 bg-gray-900 shadow-xl mx-auto">
                <img src="/logo.jpeg" alt="AMAGix Technologies Logo" className="w-full h-full object-cover" />
              </div>

              <div>
                <h1 className="text-2xl font-extrabold text-white tracking-tight">
                  AMAGix<span className="text-cyan-400">.</span> Admin Portal
                </h1>
                <p className="text-xs text-gray-400 font-mono mt-1">
                  Management & Control Panel Access
                </p>
              </div>
            </div>

            {/* Error Banner */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-3"
                >
                  <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Administrator Email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@amagixtech.com"
              />

              <div className="space-y-1.5 relative">
                <label className="block text-xs font-semibold text-gray-300">
                  Password <span className="text-cyan-400">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  isLoading={isSubmitting}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  {isSubmitting ? "Authenticating..." : "Login to Dashboard"}
                </Button>
              </div>
            </form>

            {/* Frontend Simulation Note */}
            <div className="mt-8 pt-6 border-t border-gray-800/80 text-center">
              <p className="text-[11px] text-gray-500 font-mono flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-cyan-400" /> Frontend authentication prototype
              </p>
            </div>

          </Card>
        </motion.div>
      </div>
    </>
  );
};
