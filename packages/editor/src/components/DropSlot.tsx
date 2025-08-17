"use client";
import * as React from "react";
import { useDroppable } from "@dnd-kit/core";

export function DropSlot({ parentId, index }: { parentId: string; index: number }) {
  const { isOver, setNodeRef } = useDroppable({
    id: `drop:${parentId}:${index}`,
    data: { parentId, index },
  });

  return (
    <div
      ref={setNodeRef}
      className={`my-2 rounded border-2 border-dashed ${
        isOver ? "border-blue-500 bg-blue-50" : "border-gray-200"
      }`}
      style={{ minHeight: 20 }}
      aria-label="Drop here"
    />
  );
}
