// Call from your top-level <DndContext onDragEnd={...}>
import { widgetRegistry } from "../lib/widgetRegistry";
import type { PageNode } from "../lib/store";
import { findNode } from "../lib/findNode";

type MoveFn = (nodeId: string, nextParentId: string, index: number) => void;
type AddChildFn = (parentId: string, nodeJson: any, index?: number) => void;
type CreateFromWidgetFn = (widgetKey: string) => any;

function canDrop(parentType: string, childType: string) {
  const allowed = widgetRegistry[parentType]?.allowedChildren as string[] | undefined;
  return !allowed || allowed.includes(childType);
}

export function makeOnDragEnd({
  moveNode, addChild, createFromWidget, getPage,
}: {
  moveNode: MoveFn;
  addChild: AddChildFn;
  createFromWidget: CreateFromWidgetFn;
  getPage: () => PageNode;
}) {
  return function onDragEnd(event: any) {
    const { over, active } = event;
    if (!over) return;
    const m = /^drop:(.+):(\d+)$/.exec(String(over.id));
    if (!m) return;

    const parentId = m[1];
    const index = parseInt(m[2], 10);
    const page = getPage();
    const parentNode = findNode(page, parentId);
    if (!parentNode) return;

    const data = active?.data?.current || {};
    if (data.type === "NEW_WIDGET") {
      const newNode = createFromWidget(data.widgetKey);
      if (canDrop(parentNode.type, newNode.type)) addChild(parentId, newNode, index);
      return;
    }
    if (data.type === "TEMPLATE_SECTION" && data.nodeJson) {
      if (canDrop(parentNode.type, data.nodeJson.type)) addChild(parentId, data.nodeJson, index);
      return;
    }
    // Move existing
    if (active?.id) {
      const movingId = String(active.id);
      // Optional: prevent dropping into its own descendant
      const moving = findNode(page, movingId);
      if (!moving) return;
      if (canDrop(parentNode.type, moving.type)) moveNode(movingId, parentId, index);
    }
  };
}
