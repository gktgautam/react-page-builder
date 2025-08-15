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
      const res = await fetch("/api/pages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(page),
      });
      if (!res.ok) throw new Error("Failed to save");
      const { pageId } = await res.json();
      window.open(`/preview/${pageId}`, "_blank", "noopener,noreferrer");
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
