import type { Node, PageDocument } from "@schema/core";
import { nanoid } from "nanoid";

export function deepClone<T>(x: T): T {
  return JSON.parse(JSON.stringify(x));
}

export function setByPath<T extends object>(obj: T, path: string, value: unknown): T {
  const parts = path.split(".");
  const root: any = Array.isArray(obj) ? [...(obj as any)] : { ...(obj as any) };
  let cur = root;
  for (let i = 0; i < parts.length - 1; i++) {
    const k = parts[i]!;
    cur[k] = typeof cur[k] === "object" && cur[k] !== null ? { ...cur[k] } : {};
    cur = cur[k];
  }
  cur[parts[parts.length - 1]!] = value;
  return root;
}

export type VisitFn = (node: Node, parent: Node | null, index: number) => void;

export function walk(node: Node, visit: VisitFn, parent: Node | null = null, index = 0) {
  visit(node, parent, index);
  (node.children ?? []).forEach((c, i) => walk(c, visit, node, i));
}

export function findNode(root: Node, id: string): { node: Node; parent: Node | null; index: number } | null {
  let found: { node: Node; parent: Node | null; index: number } | null = null;
  walk(root, (n, p, i) => {
    if (n.id === id) found = { node: n, parent: p, index: i };
  });
  return found;
}

export function reIdSubtree(node: Node): Node {
  const copy = deepClone(node);
  walk(copy, (n) => {
    n.id = nanoid();
  });
  return copy;
}

export function replaceChild(parent: Node, index: number, newChild: Node): Node {
  const clone = deepClone(parent);
  clone.children = [...(clone.children ?? [])];
  clone.children[index] = newChild;
  return clone;
}

export function removeChild(parent: Node, index: number): Node {
  const clone = deepClone(parent);
  clone.children = [...(clone.children ?? [])];
  clone.children.splice(index, 1);
  return clone;
}

export function insertChild(parent: Node, child: Node, atIndex?: number): Node {
  const clone = deepClone(parent);
  clone.children = [...(clone.children ?? [])];
  if (atIndex === undefined || atIndex < 0 || atIndex > clone.children.length) {
    clone.children.push(child);
  } else {
    clone.children.splice(atIndex, 0, child);
  }
  return clone;
}

export function replaceNodeInTree(root: Node, id: string, newNode: Node): Node {
  if (root.id === id) return deepClone(newNode);
  const recur = (n: Node): Node => {
    if (!n.children || n.children.length === 0) return n;
    const kids = n.children.map((c) => (c.id === id ? deepClone(newNode) : recur(c)));
    return { ...n, children: kids };
  };
  return recur(deepClone(root));
}

export function updatePage(rootDoc: PageDocument, newTree: Node): PageDocument {
  return { ...rootDoc, tree: newTree };
}
