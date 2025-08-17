"use client";
import { create } from "zustand";
import type { Breakpoint, ResponsiveProps } from "@schema/core";
import { deepMerge } from "./deepMerge";
import { findNode, findNodeWithParent } from "./findNode";

export type PageNode = {
  id: string;
  type: string;
  props: ResponsiveProps<any>; // mobile-first envelope
  children: PageNode[];        // always array
};

export interface EditorState {
  page: PageNode;
  hoveredId: string | null;
  selectedId: string | null;
  activeBreakpoint: Breakpoint;
  expandedNodes: string[];

  setPage: (page: PageNode) => void;
  hoverNode: (id: string | null) => void;
  selectNode: (id: string | null) => void;
  toggleExpand: (id: string) => void;
  setActiveBreakpoint: (bp: Breakpoint) => void;

  addChild: (parentId: string, nodeJson: PageNode, index?: number) => void;
  moveNode: (nodeId: string, nextParentId: string, index: number) => void;
  updateProps: (nodeId: string, patch: Partial<ResponsiveProps<any>>) => void;
}

function samplePage(): PageNode {
  return {
    id: "root",
    type: "Page",
    props: {},
    children: [
      {
        id: "sec1",
        type: "Section",
        props: { style: { paddingTop: "40px", paddingBottom: "40px", backgroundColor: "#ffffff" } },
        children: [
          {
            id: "row1",
            type: "Row",
            props: { style: { gap: "16px" } },
            children: [
              {
                id: "col1",
                type: "Column",
                props: { style: { minWidth: "280px", flex: "1" } },
                children: [
                  {
                    id: "h1",
                    type: "Heading",
                    props: {
                      text: "Your Heading",
                      style: { fontSize: "32px", fontWeight: "700", marginBottom: "8px" },
                    },
                    children: [],
                  },
                  {
                    id: "p1",
                    type: "Text",
                    props: {
                      text: "Start building your page…",
                      style: { fontSize: "16px", lineHeight: "24px", color: "#444" },
                    },
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  };
}

export const useEditorStore = create<EditorState>()((set, get) => ({
  page: samplePage(),
  hoveredId: null,
  selectedId: null,
  activeBreakpoint: "desktop",
  expandedNodes: [],

  setPage: (page) => set({ page }),
  hoverNode: (id) => set({ hoveredId: id }),
  selectNode: (id) => set((s) => ({
    selectedId: id,
    expandedNodes: id ? expandAncestors(s.page, id) : s.expandedNodes,
  })),
  toggleExpand: (id) => set((s) => ({
    expandedNodes: s.expandedNodes.includes(id)
      ? s.expandedNodes.filter(x => x !== id)
      : [...s.expandedNodes, id],
  })),
  setActiveBreakpoint: (bp) => set({ activeBreakpoint: bp }),

  addChild: (parentId, nodeJson, index) => set((s) => {
    const copy = structuredClone(s.page);
    const parent = findNode(copy, parentId);
    if (!parent) return {};
    parent.children = parent.children ?? [];
    const i = Math.min(Math.max(0, index ?? parent.children.length), parent.children.length);
    const node = { ...nodeJson, children: nodeJson.children ?? [] };
    parent.children.splice(i, 0, node);
    return { page: copy };
  }),

  moveNode: (nodeId, nextParentId, index) => set((s) => {
    if (nodeId === nextParentId) return {};
    const copy = structuredClone(s.page);
    const { node, parent } = findNodeWithParent(copy, nodeId);
    if (!node || !parent) return {};
    parent.children = parent.children ?? [];
    const oldIdx = parent.children.findIndex((c) => c.id === nodeId);
    if (oldIdx >= 0) parent.children.splice(oldIdx, 1);

    const newParent = findNode(copy, nextParentId);
    if (!newParent) return {};
    newParent.children = newParent.children ?? [];
    const i = Math.min(Math.max(0, index), newParent.children.length);
    newParent.children.splice(i, 0, node);
    return { page: copy };
  }),

  updateProps: (nodeId, patch) => set((s) => {
    const copy = structuredClone(s.page);
    const node = findNode(copy, nodeId);
    if (!node) return {};
    node.props = deepMerge(node.props ?? {}, patch);
    return { page: copy };
  }),
}));

function expandAncestors(root: PageNode, id: string): string[] {
  const path: string[] = [];
  function dfs(n: PageNode, trail: string[]) {
    if (n.id === id) { path.push(...trail); return true; }
    for (const c of n.children || []) {
      if (dfs(c, [...trail, n.id])) return true;
    }
    return false;
  }
  dfs(root, []);
  return Array.from(new Set(path));
}
