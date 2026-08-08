import React from "react";
import { MessageSquare } from "lucide-react";
import { siteConfig } from "../../data/site";
import { Button } from "./Button";

export interface WhatsAppCTAProps {
  message?: string;
  variant?: "floating" | "button" | "inline";
  className?: string;
}

export const WhatsAppCTA: React.FC<WhatsAppCTAProps> = ({
  message = "Hello AMAGix Technologies, I would like to make an inquiry about your services.",
  variant = "floating",
  className = ""
}) => {
  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(message)}`;

  if (variant === "floating") {
    return (
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp with AMAGix Technologies"
        className={`fixed bottom-6 right-6 z-50 p-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-xl shadow-emerald-500/30 hover:scale-110 transition-all duration-300 flex items-center justify-center group ${className}`}
      >
        <MessageSquare className="w-6 h-6 fill-current" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-500 ease-in-out font-semibold text-xs pl-0 group-hover:pl-2">
          Chat on WhatsApp
        </span>
      </a>
    );
  }

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      <Button
        variant="outline"
        leftIcon={<MessageSquare className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />}
        className="border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-400"
      >
        Chat With Us on WhatsApp
      </Button>
    </a>
  );
};
