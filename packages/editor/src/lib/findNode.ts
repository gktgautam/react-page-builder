import type { PageNode } from "./store";

export function findNode(node: PageNode, id: string | null): PageNode | null {
  if (!id) return null;
  if (node.id === id) return node;
  for (const child of node.children || []) {
    const found = findNode(child as PageNode, id);
    if (found) return found;
  }
  return null;
}
