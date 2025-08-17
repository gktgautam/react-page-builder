import type { PageNode } from "./store";

export function findNode(root: PageNode, id: string): PageNode | null {
  if (!root) return null;
  if (root.id === id) return root;
  for (const c of root.children || []) {
    const f = findNode(c, id);
    if (f) return f;
  }
  return null;
}

export function findNodeWithParent(root: PageNode, id: string, parent: PageNode | null = null): { node: PageNode | null; parent: PageNode | null } {
  if (!root) return { node: null, parent: null };
  if (root.id === id) return { node: root, parent };
  for (const c of root.children || []) {
    const f = findNodeWithParent(c, id, root);
    if (f.node) return f;
  }
  return { node: null, parent: null };
}
