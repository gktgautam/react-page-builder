"use client";

import * as React from "react";
import { useEditorStore } from "../store/createEditorStore";
import { getWidget } from "../widgets";
import type { Node } from "@schema/core";
import { DropSlot } from "./DropSlot";
import { BreakpointSwitcher } from "./core/BreakpointSwitcher";

/**
 * If you already model responsive props, you can expand this.
 * For now we simply return node.props as-is.
 */
function resolveProps(node: Node) {
  return node.props ?? {};
}

/**
 * Convert a React.CSSProperties object into a style shape compatible with your Node.style,
 * which expects strings (e.g., "16px") rather than numbers.
 */
function normalizeStyle(style: React.CSSProperties | undefined): Record<string, any> {
  if (!style) return {};
  const out: Record<string, any> = {};
  for (const [k, v] of Object.entries(style)) {
    // if number, stringify as px (common for width/height/margins, etc.)
    out[k] = typeof v === "number" ? `${v}px` : (v as any);
  }
  return out;
}

function RenderNode({ node }: { node: Node }) {
  const hoveredId = useEditorStore((s) => s.hoveredId);
  const selectedId = useEditorStore((s) => s.selectedId);
  const selectNode = useEditorStore((s) => s.selectNode);

  // Page root: render its children with drop slots
  if (node.type === "page" || node.type === "Page") {
    const children = node.children ?? [];
    return (
      <div onClick={() => selectNode(node.id)}>
        {children.map((child, i) => (
          <React.Fragment key={child.id}>
            <DropSlot parentId={node.id} index={i} />
            <RenderNode node={child} />
          </React.Fragment>
        ))}
        <DropSlot parentId={node.id} index={children.length} />
      </div>
    );
  }

  const meta = getWidget(node.type);
  if (!meta) return null;

  const mergedProps = resolveProps(node);

  const selectionOutline: React.CSSProperties =
    node.id === selectedId
      ? { outline: "2px solid #3b82f6" } // blue-500
      : node.id === hoveredId
      ? { outline: "1px dashed #fb923c" } // orange-400
      : {};

  const children = node.children ?? [];

  // Normalize Node.style + selection outline into schema-style strings
  const mergedStyleStrings = normalizeStyle({ ...(node.style as React.CSSProperties), ...selectionOutline });

  // meta.render(node) expects a Node — give it one with normalized style
  const self = meta.render({ ...node, style: mergedStyleStrings });

  // Treat as container if widget accepts children or already has children
  const isContainer = (children?.length ?? 0) > 0 || (meta.acceptsChildTypes?.length ?? 0) > 0;

  return (
    <div
      data-node-id={node.id}
      onMouseEnter={() => useEditorStore.getState().hoverNode(node.id)}
      onMouseLeave={() => useEditorStore.getState().hoverNode(null)}
      onClick={(e) => {
        e.stopPropagation();
        selectNode(node.id);
      }}
      style={{ position: "relative" }}
    >
      {self}
      {isContainer && (
        <>
          {children.map((child, i) => (
            <React.Fragment key={child.id}>
              <DropSlot parentId={node.id} index={i} />
              <RenderNode node={child} />
            </React.Fragment>
          ))}
          <DropSlot parentId={node.id} index={children.length} />
        </>
      )}
    </div>
  );
}

export function EditorCanvas() {
  const doc = useEditorStore((s) => s.doc);
  const viewport = useEditorStore((s) => s.activeBreakpoint);

  const widthPx =
    viewport === "desktop" ? 1024 :
    viewport === "tablet"  ? 768  :
                             375;

  return (
    <main className="flex-1 overflow-auto bg-gray-50 p-6">
      <BreakpointSwitcher />
      <div style={{ marginInline: "auto", width: widthPx }}>
        <div className="bg-white border rounded p-6 min-h-[70vh]">
          <RenderNode node={doc.tree} />
        </div>
      </div>
    </main>
  );
}
