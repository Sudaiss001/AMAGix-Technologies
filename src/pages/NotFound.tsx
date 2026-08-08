import React from "react";
import { Link } from "react-router-dom";
import { Home, Terminal } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { SEO } from "../components/common/SEO";

export const NotFound: React.FC = () => {
  return (
    <>
      <SEO title="404 Page Not Found" />

      <section className="min-h-screen pt-36 pb-20 flex items-center justify-center relative overflow-hidden">
        {/* Background Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-xl mx-auto px-4 text-center space-y-6 relative z-10">
          <Badge variant="cyan" size="md">HTTP 404 Error</Badge>

          <div className="space-y-2">
            <h1 className="text-7xl font-extrabold text-white tracking-tighter gradient-text font-mono">
              404
            </h1>
            <h2 className="text-2xl font-bold text-white">
              Page Route Not Found
            </h2>
          </div>

          <p className="text-gray-400 text-sm leading-relaxed max-w-md mx-auto">
            The destination link you entered does not exist or has been relocated within our network architecture.
          </p>

          <Card hoverable={false} className="p-4 text-left font-mono text-xs bg-gray-950/80 border-gray-800 text-cyan-300">
            <div className="flex items-center gap-2 text-gray-500 mb-1">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span>system.diagnostics</span>
            </div>
            <p className="text-red-400">&gt; Error: Route target unavailable</p>
            <p className="text-gray-400">&gt; Status: 404_NOT_FOUND</p>
          </Card>

          <div className="flex items-center justify-center gap-4 pt-4">
            <Link to="/">
              <Button size="md" leftIcon={<Home className="w-4 h-4" />}>
                Return Home
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="secondary" size="md">
                Contact Support
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
