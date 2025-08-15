"use client";
import React from "react";
import { useEditorStore } from "../lib/store";
import { widgetRegistry } from "../lib/widgetRegistry";
import type { TPageNode } from "@schema/core";
import { BreakpointSwitcher } from "./BreakpointSwitcher";
import { resolveProps } from "../lib/resolveProps";
import { DropSlot } from "../canvas/DropSlot"; // ⬅️ ADD: adjust path if needed

function RenderNode({ node }: { node: TPageNode }) {
  const hoveredId = useEditorStore((s) => s.hoveredId);
  const selectedId = useEditorStore((s) => s.selectedId);
  const selectNode = useEditorStore((s) => s.selectNode);
  const activeBreakpoint = useEditorStore((s) => s.activeBreakpoint);

  // Root Page behaves like a container; render slots between children + one at the end
  if (node.type === "Page") {
    const children = node.children ?? [];
    return (
      <div>
        {children.map((child: TPageNode, i: number) => (
          <React.Fragment key={child.id}>
            {/* ⬇️ Drop target BEFORE each child */}
            <DropSlot parentId={node.id} index={i} />
            <RenderNode node={child} />
          </React.Fragment>
        ))}
        {/* ⬇️ Final drop target at the end */}
        <DropSlot parentId={node.id} index={children.length} />
      </div>
    );
  }

  const meta = widgetRegistry[node.type];
  if (!meta) return null;
  const Comp = meta.component;
  const mergedProps = resolveProps(node as any, activeBreakpoint);

  const border =
    node.id === selectedId
      ? "border-2 border-blue-500"
      : node.id === hoveredId
      ? "border border-orange-400"
      : "border border-transparent";

  const children = node.children ?? [];

  return (
    <div
      className={`${border} relative`}
      onClick={(e) => {
        e.stopPropagation();
        selectNode(node.id);
      }}
    >
      <Comp id={node.id} {...mergedProps}>
        {meta.isContainer ? (
          <>
            {children.map((child: TPageNode, i: number) => (
              <React.Fragment key={child.id}>
                {/* ⬇️ Drop target BEFORE each child within containers */}
                <DropSlot parentId={node.id} index={i} />
                <RenderNode node={child} />
              </React.Fragment>
            ))}
            {/* ⬇️ Final drop target at the end of this container */}
            <DropSlot parentId={node.id} index={children.length} />
          </>
        ) : null}
      </Comp>
    </div>
  );
}

export function EditorCanvas() {
  const page = useEditorStore((s) => s.page);
  const viewport = useEditorStore((s) => s.activeBreakpoint);
  const widthClass =
    viewport === "desktop"
      ? "w-[1024px]"
      : viewport === "tablet"
      ? "w-[768px]"
      : "w-[375px]";

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
