// packages/editor/src/components/Sidebar.tsx
"use client";
import * as React from "react";
import { WidgetPalette } from "../palette/WidgetPalette";
import { useEditorStore } from "../store/createEditorStore";

export function Sidebar() {
  const root = useEditorStore((s) => s.doc.tree);
  if (!root) return <aside className="w-64 border-r p-3">Loading…</aside>;

  return (
    <aside className="w-64 border-r">
      <WidgetPalette parentId={root.id} />
    </aside>
  );
}
