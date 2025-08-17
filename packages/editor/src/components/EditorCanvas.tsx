"use client";
import React from "react";
import { useEditorStore } from "../lib/store";
import { widgetRegistry } from "../lib/widgetRegistry";
import type { PageNode } from "../lib/store";
import { DropSlot } from "./DropSlot";
import { BreakpointSwitcher } from "./core/BreakpointSwitcher";

function resolveProps(node: PageNode, bp: "desktop"|"tablet"|"mobile") {
  // mobile-first cascade for props (non-style)
  const base = { ...(node.props || {}) };
  const tb   = { ...(node.props?.tablet || {}) };
  const ds   = { ...(node.props?.desktop || {}) };
  delete (base as any).style; delete (tb as any).style; delete (ds as any).style;
  if (bp === "desktop") return { ...base, ...tb, ...ds };
  if (bp === "tablet")  return { ...base, ...tb };
  return { ...base };
}

function RenderNode({ node }: { node: PageNode }) {
  const hoveredId = useEditorStore((s) => s.hoveredId);
  const selectedId = useEditorStore((s) => s.selectedId);
  const selectNode = useEditorStore((s) => s.selectNode);
  const activeBreakpoint = useEditorStore((s) => s.activeBreakpoint);

  if (node.type === "Page") {
    const children = node.children || [];
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

  const meta = widgetRegistry[node.type];
  if (!meta) return null;
  const Comp: any = meta.component;
  const mergedProps = resolveProps(node, activeBreakpoint);

  const border =
    node.id === selectedId
      ? "border-2 border-blue-500"
      : node.id === hoveredId
      ? "border border-orange-400"
      : "border border-transparent";

  const children = node.children || [];

  return (
    <div
      className={`${border} relative`}
      onMouseEnter={() => useEditorStore.getState().hoverNode(node.id)}
      onMouseLeave={() => useEditorStore.getState().hoverNode(null)}
      onClick={(e) => { e.stopPropagation(); selectNode(node.id); }}
    >
      <Comp id={node.id} {...mergedProps}>
        {meta.isContainer && (
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
      </Comp>
    </div>
  );
}

export function EditorCanvas() {
  const page = useEditorStore((s) => s.page);
  const viewport = useEditorStore((s) => s.activeBreakpoint);
  const widthClass =
    viewport === "desktop" ? "w-[1024px]" :
    viewport === "tablet"  ? "w-[768px]"  :
                             "w-[375px]";
  return (
    <main className="flex-1 overflow-auto bg-gray-50 p-6">
      <BreakpointSwitcher />
      <div className={`mx-auto ${widthClass}`}>
        <div className="bg-white border rounded p-6 min-h-[70vh]">
          <RenderNode node={page} />
        </div>
      </div>
    </main>
  );
}
