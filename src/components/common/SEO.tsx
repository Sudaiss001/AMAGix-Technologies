import { useEffect } from "react";

export interface SEOProps {
  title?: string;
  description?: string;
}

export const SEO = ({ title, description }: SEOProps) => {
  useEffect(() => {
    const siteTitle = title ? `${title} | AMAGix Technologies` : "AMAGix Technologies | Digital Solutions & Technology Training";
    const metaDescription = description || "AMAGix Technologies delivers modern digital solutions, software development, web & mobile applications, and practical technology training in Minna, Niger State, Nigeria.";

    document.title = siteTitle;

    let metaDescTag = document.querySelector('meta[name="description"]');
    if (!metaDescTag) {
      metaDescTag = document.createElement("meta");
      metaDescTag.setAttribute("name", "description");
      document.head.appendChild(metaDescTag);
    }
    metaDescTag.setAttribute("content", metaDescription);

    // OpenGraph Title
    let ogTitleTag = document.querySelector('meta[property="og:title"]');
    if (!ogTitleTag) {
      ogTitleTag = document.createElement("meta");
      ogTitleTag.setAttribute("property", "og:title");
      document.head.appendChild(ogTitleTag);
    }
    ogTitleTag.setAttribute("content", siteTitle);

    // OpenGraph Description
    let ogDescTag = document.querySelector('meta[property="og:description"]');
    if (!ogDescTag) {
      ogDescTag = document.createElement("meta");
      ogDescTag.setAttribute("property", "og:description");
      document.head.appendChild(ogDescTag);
    }
    ogDescTag.setAttribute("content", metaDescription);

  }, [title, description]);

  return null;
};
