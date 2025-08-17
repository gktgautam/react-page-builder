"use client";
import React from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { useEditorStore } from "../lib/store";
import { makeOnDragEnd } from "../dnd/handlers";
import { createFromWidget } from "../lib/createFromWidget";
import { Sidebar } from "./Sidebar";
import { EditorCanvas } from "./EditorCanvas";
import { LayersPanel } from "./LayersPanel";
import { PropertyPanel } from "./PropertyPanel";

export default function EditorApp() {
  const moveNode = useEditorStore((s) => s.moveNode);
  const addChild = useEditorStore((s) => s.addChild);
  const getPage  = () => useEditorStore.getState().page;

  const onDragEnd = makeOnDragEnd({ moveNode, addChild, createFromWidget, getPage });

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
