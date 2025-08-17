// Minimal DnD handler shims to satisfy existing imports.
// You can wire real @dnd-kit logic later; this keeps types happy and avoids runtime errors.

import type { DragEndEvent } from "@dnd-kit/core";
import { getAllowedChildren } from "../lib/widgetRegistry";
import { useEditorStore } from "../store";

/**
 * Check if a child type can be dropped into a parent type based on widget constraints.
 * If a parent has no explicit acceptsChildTypes, we allow it by default.
 */
export function canDrop(parentType: string, childType: string): boolean {
  const allowed = getAllowedChildren(parentType);
  if (!allowed || allowed.length === 0) return true;
  return allowed.includes(childType);
}

/**
 * Factory returning a drag-end handler. Your older code imports `makeOnDragEnd`
 * from here, so we provide a safe default.
 *
 * If you already have @dnd-kit sensors and active/over data, replace the internals
 * to read `event.active.data.current` and `event.over.data.current` to perform insert/move.
 */
export function makeOnDragEnd() {
  const store = useEditorStore.getState();

  return function onDragEnd(_event: DragEndEvent) {
    // No-op default: keep this silent until you wire real DnD.
    // Example (pseudo):
    // const { active, over } = event;
    // if (!over) return;
    // const childType = active?.data?.current?.type as string | undefined;
    // const parentType = over?.data?.current?.type as string | undefined;
    // if (childType && parentType && canDrop(parentType, childType)) {
    //   store.insertNode(over.data.current.nodeId, createNodeFromType(childType));
    // }
  };
}
