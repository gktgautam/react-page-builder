"use client";
import type React from "react";
import { useEditorStore } from "../lib/store";
import type { PageNode } from "../lib/store";
import { widgetRegistry } from "../lib/widgetRegistry";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext, useSortable, verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Panel, PanelHeader, IconButton } from "@ui/core";

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

  const { setNodeRef: setRootDropRef, isOver: isRootOver } = useDroppable({
    id: "drop-root",
    data: { isContainer: true, parentId: "root" }
  });

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
