"use client";

import * as React from "react";
import type { Node, PageDocument } from "@schema/core";
import { useEditorStore } from "../store/createEditorStore";
import { FieldControl } from "./FieldControl";
// ✅ import from the widgets index (not from ./registry)
import { getWidget } from "../widgets";

/** Find a node by id in the current document tree */
function findNode(doc: PageDocument, id?: string | null): Node | null {
  if (!id) return null;
  const stack: Node[] = [doc.tree];
  while (stack.length) {
    const cur = stack.pop()!;
    if (cur.id === id) return cur;
    if (cur.children) stack.push(...cur.children);
  }
  return null;
}

/** Style tab controls */
function StyleControls({ node }: { node: Node }) {
  const update = useEditorStore((s) => s.updateByPath);
  const id = node.id;

  const make = (
    label: string,
    path: string,
    placeholder?: string,
    type: "text" | "color" = "text"
  ) => (
    <label key={path} style={{ display: "block", marginBottom: 8 }}>
      <div style={{ fontSize: 12, marginBottom: 4 }}>{label}</div>
      <input
        type={type}
        value={String(
          path.split(".").reduce<any>((o, k) => (o ? o[k as keyof typeof o] : undefined), node) ?? ""
        )}
        placeholder={placeholder}
        onChange={(e) => update(id, path, e.target.value)}
        style={{ width: "100%", padding: 8 }}
      />
    </label>
  );

  return (
    <div>
      {make("Width", "style.width", "e.g. 100%")}
      {make("Max Width", "style.maxWidth", "e.g. 1200px")}
      {make("Height", "style.height", "e.g. auto")}
      {make("Margin", "style.margin", "e.g. 16px 0")}
      {make("Padding", "style.padding", "e.g. 8px 12px")}
      {make("Background", "style.background", "e.g. #f3f4f6 or linear-gradient(...)")}
      {make("Border", "style.border", "e.g. 1px solid #ddd")}
      {make("Border Radius", "style.borderRadius", "e.g. 8px")}
      {make("Box Shadow", "style.boxShadow", "e.g. 0 2px 8px rgba(0,0,0,.1)")}
      {make("Text Color", "style.color", undefined, "color")}
      {make("Font Size", "style.fontSize", "e.g. 32px")}
      {make("Font Weight", "style.fontWeight", "e.g. 700")}
      {make("Line Height", "style.lineHeight", "e.g. 1.5")}
      {make("Text Align", "style.textAlign", "left|center|right|justify")}
      {make("Display", "style.display", "block|flex|grid")}
      {make("Gap", "style.gap", "e.g. 16px")}
      {make("Justify Content", "style.justifyContent", "e.g. center|space-between")}
      {make("Align Items", "style.alignItems", "e.g. center")}
    </div>
  );
}

/** Advanced tab controls */
function AdvancedControls({ node }: { node: Node }) {
  const update = useEditorStore((s) => s.updateByPath);
  const id = node.id;

  return (
    <div>
      <label style={{ display: "block", marginBottom: 8 }}>
        <div style={{ fontSize: 12, marginBottom: 4 }}>HTML id</div>
        <input
          type="text"
          value={(node.props?._id ?? "") as string}
          onChange={(e) => update(id, "props._id", e.target.value)}
          style={{ width: "100%", padding: 8 }}
        />
      </label>

      <label style={{ display: "block", marginBottom: 8 }}>
        <div style={{ fontSize: 12, marginBottom: 4 }}>CSS class</div>
        <input
          type="text"
          value={(node.props?._className ?? "") as string}
          onChange={(e) => update(id, "props._className", e.target.value)}
          style={{ width: "100%", padding: 8 }}
        />
      </label>

      <p style={{ fontSize: 12, color: "#6b7280" }}>
        Use these to target the element in your custom CSS/JS at publish time.
      </p>
    </div>
  );
}

export function InspectorPanel() {
  const doc = useEditorStore((s) => s.doc);
  const selectedId = useEditorStore((s) => s.selectedId);
  const node = React.useMemo(() => findNode(doc, selectedId), [doc, selectedId]);

  if (!node) {
    return (
      <aside style={{ width: 320, borderLeft: "1px solid #e5e7eb", background: "#fff" }}>
        <div style={{ padding: 12, color: "#6b7280", fontSize: 12 }}>No selection</div>
      </aside>
    );
  }

  const widget = getWidget(node.type);

  return (
    <aside style={{ width: 320, borderLeft: "1px solid #e5e7eb", background: "#fff" }}>
      <div style={{ padding: 12 }}>
        <div style={{ fontWeight: 600, marginBottom: 8 }}>
          {widget?.title ?? node.type}
        </div>

        <Tabs
          tabs={[
            {
              id: "content",
              label: "Content",
              content: widget?.fields?.length ? (
                <div>
                  {widget.fields.map((f, idx) => (
                    <FieldControl key={idx} nodeId={node.id} field={f} />
                  ))}
                </div>
              ) : (
                <div style={{ color: "#6b7280", fontSize: 12 }}>No content settings</div>
              )
            },
            { id: "style", label: "Style", content: <StyleControls node={node} /> },
            { id: "advanced", label: "Advanced", content: <AdvancedControls node={node} /> }
          ]}
        />
      </div>
    </aside>
  );
}

/** Simple tabs component */
function Tabs({ tabs }: { tabs: Array<{ id: string; label: string; content: React.ReactNode }> }) {
  const [active, setActive] = React.useState(tabs[0]?.id);
  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            style={{
              padding: "6px 10px",
              border: "1px solid #e5e7eb",
              background: active === t.id ? "#111827" : "#fff",
              color: active === t.id ? "#fff" : "#111827",
              borderRadius: 6
            }}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div>{tabs.find((t) => t.id === active)?.content}</div>
    </div>
  );
}
