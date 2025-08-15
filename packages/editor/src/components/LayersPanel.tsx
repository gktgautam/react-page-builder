"use client";
import type React from "react";
import { useEditorStore } from "../lib/store";
import { widgetRegistry } from "../lib/widgetRegistry";
import {
  DndContext, closestCenter, DragEndEvent, useDroppable
} from "@dnd-kit/core";
import {
  SortableContext, useSortable, verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Panel, PanelHeader, IconButton } from "@ui/core";

function TreeItem({ node, depth, parentId }:{
  node: any; depth: number; parentId: string;
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
          items={(node.children || []).map((c: any) => c.id)}
          strategy={verticalListSortingStrategy}
        >
          {node.children?.map((child: any) => (
            <TreeItem key={child.id} node={child} depth={depth + 1} parentId={node.id} />
          ))}
        </SortableContext>
      )}
    </div>
  );
}

export function LayersPanel() {
  const page = useEditorStore((s) => s.page);
  const moveNode = useEditorStore((s) => s.moveNode);

  const { setNodeRef: setRootDropRef, isOver: isRootOver } = useDroppable({
    id: "drop-root",
    data: { isContainer: true, parentId: "root" }
  });

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = String(active.id);
    const overId = String(over.id);

    const dropZone = overId.startsWith("drop-") && over.data.current?.isContainer;

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
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div
          ref={setRootDropRef}
          style={{ background: isRootOver ? "#eef6ff" : undefined }}
        >
          <SortableContext
            items={(page.children || []).map((c: any) => c.id)}
            strategy={verticalListSortingStrategy}
          >
            {page.children?.map((child: any) => (
              <TreeItem key={child.id} node={child} depth={0} parentId="root" />
            ))}
          </SortableContext>
        </div>
      </DndContext>
    </Panel>
  );
}
