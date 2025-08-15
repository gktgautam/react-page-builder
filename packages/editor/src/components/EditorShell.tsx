// packages/editor/src/components/EditorShell.tsx
"use client";
import React from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { useEditorStore } from "../lib/store";
import { widgetRegistry } from "../lib/widgetRegistry";
import { makeOnDragEnd } from "../dnd/handlers";
import { Sidebar } from "./Sidebar";
import { EditorCanvas } from "./EditorCanvas";
import { LayersPanel } from "./LayersPanel";

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
    children: meta.isContainer ? [] : [],
  };
}

export default function EditorShell() {
  const moveNode = useEditorStore((s) => s.moveNode);
  const addChild = useEditorStore((s) => s.addChild);

  const onDragEnd = makeOnDragEnd({
    moveNode,
    addChild,
    createFromWidget,
  });

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
      <div className="flex h-full">
        <Sidebar />
        <EditorCanvas />
        <LayersPanel />
      </div>
    </DndContext>
  );
}
