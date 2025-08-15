"use client";
import { useEditorStore } from "../lib/store";
import { widgetRegistry } from "../lib/widgetRegistry";
import type { TPageNode } from "@schema/core";
import { ViewportSwitcher } from "./ViewportSwitcher";

function RenderNode({ node }: { node: TPageNode }) {
  const hoveredId = useEditorStore((s) => s.hoveredId);
  const selectedId = useEditorStore((s) => s.selectedId);
  const selectNode = useEditorStore((s) => s.selectNode);
  const viewport = useEditorStore((s) => s.viewport);

  if (node.type === "Page") {
    return (
      <div>
        {node.children?.map((child: TPageNode) => (
          <RenderNode key={child.id} node={child} />
        ))}
      </div>
    );
  }

  const meta = widgetRegistry[node.type];
  if (!meta) return null;
  const Comp = meta.component;
  const mergedProps = {
    ...(node.props?.desktop || {}),
    ...(viewport !== "desktop" ? node.props?.[viewport] || {} : {})
  } as any;

  const border =
    node.id === selectedId
      ? "border-2 border-blue-500"
      : node.id === hoveredId
      ? "border border-orange-400"
      : "border border-transparent";

  return (
    <div
      className={`${border} relative`}
      onClick={(e) => { e.stopPropagation(); selectNode(node.id); }}
    >
      <Comp id={node.id} {...mergedProps}>
        {meta.isContainer && node.children?.map((child: TPageNode) => (
          <RenderNode key={child.id} node={child} />
        ))}
      </Comp>
    </div>
  );
}

export function EditorCanvas() {
  const page = useEditorStore((s) => s.page);
  const viewport = useEditorStore((s) => s.viewport);
  const widthClass =
    viewport === "desktop"
      ? "w-[1024px]"
      : viewport === "tablet"
      ? "w-[768px]"
      : "w-[375px]";
  return (
    <main className="flex-1 overflow-auto bg-gray-50 p-6">
      <ViewportSwitcher />
      <div className={`mx-auto ${widthClass}`}>
        <div className="bg-white border rounded p-6 min-h-[70vh]">
          <RenderNode node={page} />
        </div>
      </div>
    </main>
  );
}
