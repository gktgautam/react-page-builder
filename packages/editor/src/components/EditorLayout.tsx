"use client";
import React from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
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

  const onDragEnd = makeOnDragEnd({ moveNode, addChild, createFromWidget });

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
