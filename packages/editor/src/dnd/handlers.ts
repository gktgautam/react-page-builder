import type { Node } from "@schema/core";

type MoveNode = (srcParentId: string, srcIndex: number, dstParentId: string, dstIndex: number) => void;
type AddChild = (parentId: string, node: Node, index?: number) => void;
type CreateFromWidget = (widgetType: string) => Node;
type GetPage = () => Node;

export function makeOnDragEnd(opts: {
  moveNode: MoveNode;
  addChild: AddChild;
  createFromWidget: CreateFromWidget;
  getPage: GetPage;
}) {
  const { moveNode, addChild, createFromWidget } = opts;

  return (event: any) => {
    const { active, over } = event;
    if (!over) return;

    const payload = active?.data?.current;      // what we dragged
    const overPayload = over?.data?.current;    // drop slot info
    if (!payload || !overPayload) return;

    // Drag existing node
    if (payload.kind === "node") {
      // we expect the active payload to carry its source parent + index
      // (set this when you build the draggable for nodes)
      const { parentId: srcParentId, index: srcIndex } = payload;
      const { parentId: dstParentId, index: dstIndex } = overPayload;
      if (srcParentId == null || srcIndex == null) return;
      moveNode(srcParentId, srcIndex, dstParentId, dstIndex);
      return;
    }

    // Drag new widget from palette
    if (payload.kind === "widget") {
      const node = createFromWidget(payload.widgetType);
      const { parentId, index } = overPayload;
      addChild(parentId, node, index);
      return;
    }
  };
}
