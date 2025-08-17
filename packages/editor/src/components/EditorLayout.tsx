"use client";

import * as React from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { makeOnDragEnd } from "../dnd/handlers";
import { Sidebar } from "./Sidebar";
import { EditorCanvas } from "./EditorCanvas";
import { LayersPanel } from "./LayersPanel";
import { PropertyPanel } from "./PropertyPanel";

/**
 * Editor shell. We use a no-op `makeOnDragEnd()` by default (compat shim).
 * When you’re ready, wire your real @dnd-kit logic inside handlers.ts.
 */
export default function EditorApp() {
  const onDragEnd = makeOnDragEnd();

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
