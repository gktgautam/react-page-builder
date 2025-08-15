"use client";
import { useEditorStore } from "../lib/store";
import { widgetRegistry } from "../lib/widgetRegistry";
import type { TPageNode } from "@schema/core";
import { BreakpointSwitcher } from "./BreakpointSwitcher";
import { resolveProps } from "../lib/resolveProps";
import { DndContext, useDroppable, DragEndEvent } from "@dnd-kit/core";
import { nanoid } from "nanoid";

function RenderNode({ node }: { node: TPageNode }) {
  const hoveredId = useEditorStore((s) => s.hoveredId);
  const selectedId = useEditorStore((s) => s.selectedId);
  const selectNode = useEditorStore((s) => s.selectNode);
  const activeBreakpoint = useEditorStore((s) => s.activeBreakpoint);

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
  const mergedProps = resolveProps(node as any, activeBreakpoint);

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
  const viewport = useEditorStore((s) => s.activeBreakpoint);
  const addChild = useEditorStore((s) => s.addChild);
  const { setNodeRef, isOver } = useDroppable({ id: "canvas-root" });

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over?.id === "canvas-root" && active.data.current?.widgetType) {
      const type = active.data.current.widgetType as string;
      const meta = widgetRegistry[type];
      addChild(
        page.id,
        {
          id: nanoid(),
          type,
          props: JSON.parse(JSON.stringify(meta.defaultProps)),
          children: meta.isContainer ? [] : undefined
        } as any,
        page.children?.length || 0
      );
    }
  };
  const widthClass =
    viewport === "desktop"
      ? "w-[1024px]"
      : viewport === "tablet"
      ? "w-[768px]"
      : "w-[375px]";
  return (
    <DndContext onDragEnd={handleDragEnd}>
      <main className="flex-1 overflow-auto bg-gray-50 p-6">
        <BreakpointSwitcher />
        <div className={`mx-auto ${widthClass}`}>
          <div
            ref={setNodeRef}
            className={`bg-white border rounded p-6 min-h-[70vh] ${
              isOver ? "ring-2 ring-blue-400" : ""
            }`}
          >
            <RenderNode node={page} />
          </div>
        </div>
      </main>
    </DndContext>
  );
}
