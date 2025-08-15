// packages/editor/src/dnd/handlers.ts
// Call onDragEnd from your DnDContext. Wire your addChild/moveNode here.

import type { DragEndEvent } from "@dnd-kit/core";

type MoveFn = (nodeId: string, nextParentId: string, index: number) => void;
type AddChildFn = (parentId: string, nodeJson: any, index?: number) => void;
type CreateFromWidgetFn = (widgetKey: string) => any; // returns a new node
type IsDescendantFn = (targetParentId: string, movingNodeId: string) => boolean; // optional safety

type DragData =
  | { type: "NEW_WIDGET"; widgetKey: string }
  | { type: "TEMPLATE_SECTION"; nodeJson: any }
  | Record<string, unknown>;

export function makeOnDragEnd({
  moveNode,
  addChild,
  createFromWidget,
  isDescendant, // optional: pass if you want to block dropping into self/descendant
}: {
  moveNode: MoveFn;
  addChild: AddChildFn;
  createFromWidget: CreateFromWidgetFn;
  isDescendant?: IsDescendantFn;
}) {
  return function onDragEnd(event: DragEndEvent) {
    const { over, active } = event;
    if (!over) return;

    // Expect DropSlot ids like: "drop:<parentId>:<index>"
    const overId = String(over.id);
    const m = /^drop:(.+):(\d+)$/.exec(overId);
    if (!m) return;

    const parentId = m[1];
    const index = Number(m[2]);

    const data = (active?.data?.current || {}) as DragData;

    // Optional guard: prevent dropping into own descendant
    // (only works if you provide isDescendant from your store)
    if (isDescendant && typeof active.id === "string") {
      const movingId = String(active.id);
      if (isDescendant(parentId, movingId)) return;
    }

    // New widget dragged from sidebar
    if ((data as any).type === "NEW_WIDGET" && (data as any).widgetKey) {
      const widgetKey = (data as any).widgetKey as string;
      addChild(parentId, createFromWidget(widgetKey), index);
      return;
    }

    // Dropping a prebuilt section/template
    if ((data as any).type === "TEMPLATE_SECTION" && (data as any).nodeJson) {
      addChild(parentId, (data as any).nodeJson, index);
      return;
    }

    // Moving an existing node
    moveNode(String(active.id), parentId, index);
  };
}
