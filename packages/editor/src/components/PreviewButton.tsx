// packages/editor/src/components/PreviewButton.tsx
// Drop this button into your toolbar. It saves first, then opens /preview/[pageId] in a new tab.

"use client";
import React, { useState } from "react";

export default function PreviewButton({ getPageJson }: { getPageJson: () => any }) {
  const [loading, setLoading] = useState(false);

  async function onPreview() {
    try {
      setLoading(true);
      const page = getPageJson();
      const res = await fetch("/api/pages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(page),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to save");
      const pageId = data.pageId;
      window.open(`/preview/${pageId}`, "_blank", "noopener,noreferrer");
    } catch (e) {
      alert((e as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={onPreview}
      disabled={loading}
      className="px-3 py-2 rounded bg-black text-white disabled:opacity-60"
      title="Preview (saved state only)"
    >
      {loading ? "Saving…" : "Preview"}
    </button>
  );
}
