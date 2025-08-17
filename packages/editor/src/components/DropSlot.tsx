"use client";
import { useDroppable } from "@dnd-kit/core";

export function DropSlot({ parentId, index }: { parentId: string; index: number }) {
  const id = `drop:${parentId}:${index}`;
  const { isOver, setNodeRef } = useDroppable({ id });
  return (
    <div
      ref={setNodeRef}
      className="my-1"
      style={{
        height: 10,
        border: "1px dashed #cbd5e1",
        opacity: 0.4,
        background: isOver ? "#bfdbfe" : "transparent",
      }}
    />
  );
}
