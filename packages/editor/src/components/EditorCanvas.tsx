"use client";
import { useEditorStore, type Breakpoint } from "../lib/store";
import { widgetRegistry } from "../lib/widgetRegistry";
import type { TPageNode } from "@schema/core";

function RenderNode({ node }: { node: TPageNode }) {
  const hoveredId = useEditorStore((s) => s.hoveredId);
  const selectedId = useEditorStore((s) => s.selectedId);
  const selectNode = useEditorStore((s) => s.selectNode);

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
      <Comp id={node.id} {...node.props}>
        {meta.isContainer && node.children?.map((child: TPageNode) => (
          <RenderNode key={child.id} node={child} />
        ))}
      </Comp>
    </div>
  );
}

export function EditorCanvas() {
  const page = useEditorStore((s) => s.page);
  const activeBreakpoint = useEditorStore((s) => s.activeBreakpoint);
  const setActiveBreakpoint = useEditorStore((s) => s.setActiveBreakpoint);

  const widths: Record<Breakpoint, string> = {
    desktop: "max-w-full",
    tablet: "max-w-3xl",
    mobile: "max-w-sm"
  };

  return (
    <main className="flex-1 overflow-auto bg-gray-50 p-6">
      <div className="mb-4 space-x-2">
        {(["desktop", "tablet", "mobile"] as Breakpoint[]).map((bp) => (
          <button
            key={bp}
            className={`px-2 py-1 border rounded ${
              activeBreakpoint === bp ? "bg-gray-200" : ""
            }`}
            onClick={() => setActiveBreakpoint(bp)}
          >
            {bp}
          </button>
        ))}
      </div>
      <div
        className={`bg-white border rounded p-6 min-h-[70vh] mx-auto ${widths[activeBreakpoint]}`}
      >
        <RenderNode node={page} />
      </div>
    </main>
  );
}
