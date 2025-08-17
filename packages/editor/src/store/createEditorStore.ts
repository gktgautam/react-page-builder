// packages/editor/src/store/createEditorStore.ts
"use client";

/**
 * Zustand editor store – minimal but complete for:
 * - doc (PageDocument)
 * - selecting / hovering nodes
 * - inserting / moving / removing nodes
 * - updating nested props/styles via dot-paths (updateByPath)
 * - breakpoint switching
 *
 * Works with the Elementor-style registry/render we set up.
 */

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { produce } from "immer";
import type { Node, PageDocument } from "@schema/core";

// ---------- helpers ----------

function deepClone<T>(v: T): T {
  // Use native structuredClone if present:
  // @ts-ignore
  if (typeof structuredClone === "function") {
    // @ts-ignore
    return structuredClone(v);
  }
  return JSON.parse(JSON.stringify(v));
}

function findNode(root: Node, id: string): Node | null {
  const stack: Node[] = [root];
  while (stack.length) {
    const cur = stack.pop()!;
    if (cur.id === id) return cur;
    if (cur.children) stack.push(...cur.children);
  }
  return null;
}

function replaceNodeInTree(root: Node, replace: Node): Node {
  if (root.id === replace.id) return replace;
  const out = { ...root, children: root.children ? [...root.children] : [] };
  out.children = out.children?.map((c) => replaceNodeInTree(c, replace)) ?? [];
  return out;
}

function removeNodeFromTree(root: Node, id: string): Node {
  const clone = deepClone(root);
  function walk(n: Node): boolean {
    if (!n.children || n.children.length === 0) return false;
    const idx = n.children.findIndex((c) => c.id === id);
    if (idx >= 0) {
      n.children.splice(idx, 1);
      return true;
    }
    for (const c of n.children) {
      if (walk(c)) return true;
    }
    return false;
  }
  walk(clone);
  return clone;
}

function insertChild(root: Node, parentId: string, child: Node, index?: number): Node {
  const clone = deepClone(root);
  const parent = findNode(clone, parentId);
  if (!parent) return clone;
  parent.children = parent.children ? [...parent.children] : [];
  const i = typeof index === "number" ? Math.max(0, Math.min(index, parent.children.length)) : parent.children.length;
  parent.children.splice(i, 0, child);
  return clone;
}

function moveChild(root: Node, srcParentId: string, srcIndex: number, dstParentId: string, dstIndex: number): Node {
  const clone = deepClone(root);
  const srcParent = findNode(clone, srcParentId);
  const dstParent = findNode(clone, dstParentId);
  if (!srcParent || !dstParent || !srcParent.children) return clone;

  const [moved] = srcParent.children.splice(srcIndex, 1);
  if (!moved) return clone;

  dstParent.children = dstParent.children ? [...dstParent.children] : [];
  const i = Math.max(0, Math.min(dstIndex, dstParent.children.length));
  dstParent.children.splice(i, 0, moved);
  return clone;
}

function setByPath(obj: any, path: string, value: any) {
  const segs = path.split(".");
  let cur = obj;
  for (let i = 0; i < segs.length - 1; i++) {
    const k = segs[i]!;
    if (cur[k] == null || typeof cur[k] !== "object") cur[k] = {};
    cur = cur[k];
  }
  cur[segs[segs.length - 1]!] = value;
}

// ---------- initial doc ----------

const initialDoc: PageDocument = {
  version: 1,
  title: "Untitled page",
  tree: {
    id: "root",
    type: "page",
    props: {},
    style: { display: "block" },
    children: []
  }
};

// ---------- types ----------

export type Breakpoint = "desktop" | "tablet" | "mobile";

export interface EditorState {
  doc: PageDocument;

  selectedId: string | null;
  hoveredId: string | null;
  activeBreakpoint: Breakpoint;

  // selectors / actions
  selectNode: (id: string | null) => void;
  hoverNode: (id: string | null) => void;
  setBreakpoint: (bp: Breakpoint) => void;

  updateByPath: (nodeId: string, path: string, value: any) => void;

  insertNode: (parentId: string, node: Node, index?: number) => void;
  removeNode: (nodeId: string) => void;

  moveNode: (srcParentId: string, srcIndex: number, dstParentId: string, dstIndex: number) => void;
  addChild: (parentId: string, child: Node, index?: number) => void;
}

// ---------- store ----------

export const useEditorStore = create<EditorState>()(
  devtools((set, get) => ({
    doc: initialDoc,

    selectedId: null,
    hoveredId: null,
    activeBreakpoint: "desktop",

    selectNode: (id) =>
      set(
        produce<EditorState>((s) => {
          s.selectedId = id;
        }),
        false,
        "selectNode"
      ),

    hoverNode: (id) =>
      set(
        produce<EditorState>((s) => {
          s.hoveredId = id;
        }),
        false,
        "hoverNode"
      ),

    setBreakpoint: (bp) =>
      set(
        produce<EditorState>((s) => {
          s.activeBreakpoint = bp;
        }),
        false,
        "setBreakpoint"
      ),

    updateByPath: (nodeId, path, value) =>
      set(
        produce<EditorState>((s) => {
          const n = findNode(s.doc.tree, nodeId);
          if (!n) return;
          // mutate in place via immer
          setByPath(n, path, value);
        }),
        false,
        `updateByPath:${path}`
      ),

    insertNode: (parentId, node, index) =>
      set(
        produce<EditorState>((s) => {
          s.doc.tree = insertChild(s.doc.tree, parentId, node, index);
        }),
        false,
        "insertNode"
      ),

    removeNode: (nodeId) =>
      set(
        produce<EditorState>((s) => {
          // prevent removing root
          if (s.doc.tree.id === nodeId) return;
          s.doc.tree = removeNodeFromTree(s.doc.tree, nodeId);
          if (s.selectedId === nodeId) s.selectedId = null;
          if (s.hoveredId === nodeId) s.hoveredId = null;
        }),
        false,
        "removeNode"
      ),

    moveNode: (srcParentId, srcIndex, dstParentId, dstIndex) =>
      set(
        produce<EditorState>((s) => {
          s.doc.tree = moveChild(s.doc.tree, srcParentId, srcIndex, dstParentId, dstIndex);
        }),
        false,
        "moveNode"
      ),

    addChild: (parentId, child, index) =>
      set(
        produce<EditorState>((s) => {
          s.doc.tree = insertChild(s.doc.tree, parentId, child, index);
        }),
        false,
        "addChild"
      )
  }))
);

// ---------- optional barrel re-exports for older imports ----------

// Some older files may import from "../store" directly.
// Create `packages/editor/src/store/index.ts` with:
// export * from "./createEditorStore";
