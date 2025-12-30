import { Metadata } from "next";

interface StructuredDataProps {
  type: "Person" | "WebSite" | "BlogPosting" | "Article";
  data: Record<string, any>;
}

export function StructuredData({ type, data }: StructuredDataProps) {
  const baseSchema = {
    "@context": "https://schema.org",
    "@type": type,
    ...data,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(baseSchema) }}
    />
  );
}

