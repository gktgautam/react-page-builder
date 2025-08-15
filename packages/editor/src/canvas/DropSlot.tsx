// packages/editor/src/canvas/DropSlot.tsx
// Visual drop targets for drag‑onto‑canvas between/inside blocks.
// IMPORT into your canvas renderer and place between siblings + one at end.

"use client";
import React from "react";
import { useDroppable } from "@dnd-kit/core";

export function DropSlot({ parentId, index }: { parentId: string; index: number }) {
  const { setNodeRef, isOver } = useDroppable({ id: `drop:${parentId}:${index}` });

  return (
    <div
      ref={setNodeRef}
      style={{
        height: 10,
        margin: "6px 0",
        outline: isOver ? "2px solid #5b9dff" : "2px dashed #d0d7de",
        opacity: isOver ? 1 : 0.5,
        borderRadius: 6,
      }}
    />
  );
}
