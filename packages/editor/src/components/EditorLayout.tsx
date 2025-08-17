"use client";
import * as React from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { useEditorStore } from "../store/createEditorStore";
import { createFromWidget } from "../lib/createFromWidget";
import { Sidebar } from "./Sidebar";
import { EditorCanvas } from "./EditorCanvas";
import { LayersPanel } from "./LayersPanel";
import { PropertyPanel } from "./PropertyPanel";
import { registerDefaultWidgets } from "../widgets";
import { makeOnDragEnd } from "../dnd/handlers";

export default function EditorLayout() {
  // register widgets exactly once
  React.useEffect(() => {
    if (!(globalThis as any).__widgets_registered__) {
      registerDefaultWidgets();
      (globalThis as any).__widgets_registered__ = true;
    }
  }, []);

  // store fns
  const moveNode = useEditorStore((s) => s.moveNode); // (srcParentId, srcIndex, dstParentId, dstIndex)
  const addChild = useEditorStore((s) => s.addChild);
  const getPage  = () => useEditorStore.getState().doc.tree; // <-- FIX: was s.page

  const onDragEnd = makeOnDragEnd({
    moveNode,
    addChild,
    createFromWidget,
    getPage,
  });

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
      <div className="flex h-screen">
        <Sidebar />
        <EditorCanvas />
        <LayersPanel />
        <PropertyPanel />
      </div>
    </DndContext>
  );
}
