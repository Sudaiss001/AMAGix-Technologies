import React, { useState, useEffect } from "react";
import { Monitor } from "lucide-react";

export interface ProjectPreviewProps {
  previewUrl?: string;
  image?: string;
  title: string;
  alt?: string;
  className?: string;
}

export const ProjectPreview: React.FC<ProjectPreviewProps> = ({
  previewUrl,
  image,
  title,
  alt = "",
  className = ""
}) => {
  const [iframeError, setIframeError] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Reset errors whenever props change
  useEffect(() => {
    setImageError(false);
    setIframeError(false);
  }, [image, previewUrl]);

  // 1. Try Live Iframe if previewUrl exists and has not failed
  const showIframe = Boolean(previewUrl && !iframeError);

  // 2. Fallback to actual image screenshot if image exists and has not failed (and iframe not shown)
  const showImage = Boolean(image && !imageError && !showIframe);

  // 3. Clean fallback if neither live iframe nor screenshot is available
  const showFallback = !showIframe && !showImage;

  return (
    <div
      className={`relative w-full aspect-video min-h-[200px] rounded-xl overflow-hidden bg-gray-950 border border-gray-800/80 shadow-xl group ${className}`}
    >
      {showIframe && (
        <iframe
          src={previewUrl}
          title={`Live preview of ${title}`}
          onError={() => setIframeError(true)}
          className="w-full h-full border-0 pointer-events-none"
          sandbox="allow-scripts allow-same-origin"
          loading="lazy"
        />
      )}

      {showImage && (
        <img
          src={image}
          alt={alt || title}
          onError={() => setImageError(true)}
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
      )}

      {showFallback && (
        <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center space-y-3 bg-gradient-to-br from-gray-950 via-slate-900 to-gray-900 select-none">
          <div className="p-3.5 rounded-2xl bg-gray-900 border border-gray-800 text-gray-500">
            <Monitor className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold text-gray-300">{title}</h4>
            <p className="text-xs text-gray-500 font-mono">Project Preview</p>
          </div>
        </div>
      )}
    </div>
  );
};
