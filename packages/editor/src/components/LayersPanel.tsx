"use client";
import type React from "react";
import { useEditorStore } from "../lib/store";
import type { PageNode } from "../lib/store";
import { widgetRegistry } from "../lib/widgetRegistry";
import {
  DndContext, closestCenter, DragEndEvent, useDroppable
} from "@dnd-kit/core";
import {
  SortableContext, useSortable, verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Panel, PanelHeader, IconButton } from "@ui/core";

import { makeOnDragEnd }  from "../dnd/handlers"; // ✅ already correct

interface TreeNode extends Omit<PageNode, "children"> {
  children?: TreeNode[];
}
 

function TreeItem({ node, depth, parentId }: {
  node: TreeNode;
  depth: number;
  parentId: string;
}) {
  const { isContainer, icon, name } = widgetRegistry[node.type] || {};
  const expandedNodes = useEditorStore((s) => s.expandedNodes);
  const toggleExpand = useEditorStore((s) => s.toggleExpand);
  const selectNode = useEditorStore((s) => s.selectNode);
  const hoveredId = useEditorStore((s) => s.hoveredId);
  const hoverNode = useEditorStore((s) => s.hoverNode);
  const selectedId = useEditorStore((s) => s.selectedId);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: node.id, data: { parentId } });

  const { setNodeRef: setDropRef, isOver } = useDroppable({
    id: `drop-${node.id}`,
    data: { isContainer, parentId: node.id },
    disabled: !isContainer
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    paddingLeft: `${depth * 14}px`,
    background:
      node.id === selectedId ? "#e0f2fe" :
      node.id === hoveredId ? "#fff7ed" : "transparent",
    cursor: "grab",
    display: "flex",
    alignItems: "center",
    borderBottom: "1px solid #eee",
    userSelect: "none" as const
  };

  const isExpanded = expandedNodes.includes(node.id);

  return (
    <div
      ref={setDropRef}
      style={{ background: isContainer && isOver ? "#eef6ff" : undefined }}
    >
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={style}
        onMouseEnter={() => hoverNode(node.id)}
        onMouseLeave={() => hoverNode(null)}
        onClick={(e: React.MouseEvent<HTMLDivElement>) => {
          e.stopPropagation();
          selectNode(node.id);
        }}
      >
        {isContainer && (
          <IconButton
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation();
              toggleExpand(node.id);
            }}
            className="mr-1 text-xs"
            aria-label={isExpanded ? "Collapse" : "Expand"}
            title={isExpanded ? "Collapse" : "Expand"}
          >
            {isExpanded ? "−" : "+"}
          </IconButton>
        )}
        <span className="mr-1">{icon || "📄"}</span>
        {name || node.type}
      </div>

      {isContainer && isExpanded && (
        <SortableContext
          items={(node.children || []).map((c) => c.id)}
          strategy={verticalListSortingStrategy}
        >
          {node.children?.map((child) => (
            <TreeItem
              key={child.id}
              node={child}
              depth={depth + 1}
              parentId={node.id}
            />
          ))}
        </SortableContext>
      )}
    </div>
  );
}

export function LayersPanel() {
  const page = useEditorStore((s) => s.page) as TreeNode;
  const moveNode = useEditorStore((s) => s.moveNode);
  const addChild = useEditorStore((s) => s.addChild); // ✅ NEW: needed for creating nodes

  const { setNodeRef: setRootDropRef, isOver: isRootOver } = useDroppable({
    id: "drop-root",
    data: { isContainer: true, parentId: "root" }
  });

  // ✅ NEW: helper to create a node from the registry (no .create() on WidgetMeta)
  const createFromWidget = (key: string) => {
    const meta: any = widgetRegistry[key];
    if (!meta) throw new Error(`Unknown widget: ${key}`);

    const desktop = { ...(meta.defaultProps?.desktop ?? {}) };
    const tablet  = { ...(meta.defaultProps?.tablet  ?? {}) };
    const mobile  = { ...(meta.defaultProps?.mobile  ?? {}) };

    const id = typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `id_${Math.random().toString(36).slice(2)}`;

    return {
      id,
      type: key,
      props: { desktop, tablet, mobile },
      children: meta.isContainer ? [] : [], // set undefined if your schema prefers
    };
  };

  // ✅ NEW: canvas DropSlot handler
  const onCanvasDragEnd = makeOnDragEnd({
    moveNode,
    addChild,
    createFromWidget,
  });

  // ✅ CHANGED: delegate to canvas handler when dropping on canvas slots
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const overId = String(over.id);

    // Canvas DropSlot ids look like: "drop:<parentId>:<index>"
    if (overId.startsWith("drop:")) {
      onCanvasDragEnd(event as any);
      return;
    }

    // === Existing Layers behavior (panel sorting / panel container drops) ===
    const activeId = String(active.id);

    const dropZone =
      overId.startsWith("drop-") && over.data.current?.isContainer;

    if (dropZone) {
      const newParentId = over.data.current?.parentId as string;
      const insertIndex =
        overId === "drop-root" ? (page.children?.length || 0) : 0;
      moveNode(activeId, newParentId, insertIndex);
      return;
    }

    const newParentId = over.data.current?.parentId as string;
    const overIndex = over?.data?.current?.sortable?.index ?? 0;
    moveNode(activeId, newParentId, overIndex);
  };

  return (
    <Panel side="right" className="overflow-auto">
      <PanelHeader className="p-3 border-b">Navigation</PanelHeader> 
        <div
          ref={setRootDropRef}
          style={{ background: isRootOver ? "#eef6ff" : undefined }}
        >
          <SortableContext
            items={(page.children || []).map((c) => c.id)}
            strategy={verticalListSortingStrategy}
          >
            {page.children?.map((child) => (
              <TreeItem key={child.id} node={child} depth={0} parentId="root" />
            ))}
          </SortableContext>
        </div> 
    </Panel>
  );
}
