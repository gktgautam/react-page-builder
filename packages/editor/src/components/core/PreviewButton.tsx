"use client";
import React from "react";

export default function PreviewButton({
  getPageJson,
  className,
}: {
  getPageJson: () => any;
  className?: string;
}) {
  const [loading, setLoading] = React.useState(false);

  async function onPreview() {
    setLoading(true);
    try {
      const page = getPageJson();
      const key = `preview_${Date.now()}`;
      localStorage.setItem(key, JSON.stringify(page));
      window.open(`/preview.html?key=${encodeURIComponent(key)}`, "_blank", "noopener,noreferrer");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button className={className ?? "px-3 py-1 border rounded"} onClick={onPreview} disabled={loading}>
      {loading ? "Saving…" : "Preview"}
    </button>
  );
}
