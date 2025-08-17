// packages/editor/src/palette/WidgetPalette.tsx
"use client";
import * as React from "react";
import { widgetsByCategory } from "../widgets/registry";
import type { Node } from "@schema/core";
import { useEditorStore } from "../store/createEditorStore";
import { nanoid } from "nanoid";

export function WidgetPalette({ parentId }: { parentId: string }) {
  const groups = widgetsByCategory();
  const addChild = useEditorStore((s) => s.addChild);

  const onAdd = (def: () => Node) => {
    const n = def();
    // ensure an id exists
    const withId: Node = { ...n, id: n.id ?? nanoid() };
    addChild(parentId, withId);
  };

  return (
    <aside style={{ width: 260, padding: 12, borderRight: "1px solid #e5e7eb", background: "#fff" }}>
      <div style={{ fontWeight: 700, marginBottom: 8 }}>Widgets</div>
      {Object.entries(groups).map(([cat, items]) => (
        <div key={cat} style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 6 }}>{cat}</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8 }}>
            {items.map((w) => (
              <button
                key={w.type}
                onClick={() => onAdd(w.defaultNode)}
                style={{
                  border: "1px solid #e5e7eb",
                  borderRadius: 8,
                  padding: "8px 10px",
                  textAlign: "left",
                  background: "#fff",
                  cursor: "pointer"
                }}
                title={`Add ${w.title}`}
              >
                <div style={{ fontWeight: 600, fontSize: 13 }}>{w.title}</div>
                <div style={{ fontSize: 11, color: "#6b7280" }}>{w.category}</div>
              </button>
            ))}
          </div>
        </div>
      ))}
    </aside>
  );
}
