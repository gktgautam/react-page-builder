"use client";
import React from "react";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import { useEditorStore } from "../lib/store";
import { widgetRegistry } from "../lib/widgetRegistry";
import { makeOnDragEnd } from "../dnd/handlers";

import { Sidebar } from "./Sidebar";
import { EditorCanvas } from "./EditorCanvas";
import { LayersPanel } from "./LayersPanel";
import { PropertyPanel } from "./PropertyPanel";

function createFromWidget(key: string) {
  const meta: any = widgetRegistry[key];
  if (!meta) throw new Error(`Unknown widget: ${key}`);
  const id = crypto.randomUUID?.() ?? `id_${Math.random().toString(36).slice(2)}`;
  return {
    id,
    type: key,
    props: {
      desktop: { ...(meta.defaultProps?.desktop ?? {}) },
      tablet:  { ...(meta.defaultProps?.tablet  ?? {}) },
      mobile:  { ...(meta.defaultProps?.mobile  ?? {}) },
    },
    children: [], // ✅ always an array
  };
}

export default function EditorLayout() {
  const moveNode = useEditorStore((s) => s.moveNode);
  const addChild = useEditorStore((s) => s.addChild);
  const page = useEditorStore((s) => s.page);

  const canvasDragEnd = makeOnDragEnd({ moveNode, addChild, createFromWidget });

  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event;
    if (!over) return;
    const overId = String(over.id);

    // Canvas drop slots use ids like "drop:<parentId>:<index>"
    if (overId.startsWith("drop:")) {
      canvasDragEnd(event);
      return;
    }

    // Layers panel drop zones use ids like "drop-<id>"
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
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="flex h-screen">
        <Sidebar />
        <EditorCanvas />
        <LayersPanel />
        <PropertyPanel />
      </div>
    </DndContext>
  );
}
