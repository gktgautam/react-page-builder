"use client";
import { create } from "zustand";
import type { TPageNode } from "@schema/core";

export interface PageNode extends TPageNode {}

interface EditorState {
  page: PageNode;
  selectedId: string | null;
  hoveredId: string | null;
  expandedNodes: string[];
  selectNode: (id: string | null) => void;
  hoverNode: (id: string | null) => void;
  toggleExpand: (id: string) => void;
  setPage: (page: PageNode) => void;
  addChild: (parentId: string, node: PageNode, index?: number) => void;
  moveNode: (id: string, newParentId: string, index: number) => void;
  updateProps: (id: string, newProps: Record<string, unknown>) => void;
}

function deepMap(node: PageNode, fn: (n: PageNode) => PageNode): PageNode {
  return fn({ ...node, children: node.children?.map((c:any) => deepMap(c as PageNode, fn)) });
}

export const useEditorStore = create<EditorState>((set) => ({
  page: {
    id: "root",
    type: "Page",
    props: {},
    children: [{ id: "section-1", type: "Section", props: {}, children: [] }]
  },
  selectedId: null,
  hoveredId: null,
  expandedNodes: [],
  selectNode: (id) => set({ selectedId: id }),
  hoverNode: (id) => set({ hoveredId: id }),
  toggleExpand: (id) =>
    set((state) => ({
      expandedNodes: state.expandedNodes.includes(id)
        ? state.expandedNodes.filter((n) => n !== id)
        : [...state.expandedNodes, id]
    })),
  setPage: (page) => set({ page }),

  addChild: (parentId, node, index = 0) =>
    set((state) => {
      const insert = (n: PageNode): PageNode => {
        if (n.id === parentId) {
          const copy = [...(n.children || [])];
          copy.splice(index, 0, node);
          return { ...n, children: copy };
        }
        return { ...n, children: n.children?.map(insert) || [] };
      };
      return { page: insert(state.page) };
    }),

  moveNode: (id, newParentId, index) =>
    set((state) => {
      let moving: PageNode | null = null;

      const removed = deepMap(state.page, (n) => {
        if (!n.children) return n;
        const filtered = n.children.filter((c:any) => {
          if (c.id === id) {
            moving = c as PageNode;
            return false;
          }
          return true;
        });
        return { ...n, children: filtered.map((c:any) => c as PageNode) };
      });

      const inserted = deepMap(removed, (n) => {
        if (n.id === newParentId && moving) {
          const copy = [...(n.children || [])];
          copy.splice(index, 0, moving);
          return { ...n, children: copy };
        }
        return n;
      });

      return { page: inserted };
    }),

  updateProps: (id, newProps) =>
    set((state) => {
      const updated = deepMap(state.page, (n) => {
        if (n.id === id) return { ...n, props: { ...n.props, ...newProps } };
        return n;
      });
      return { page: updated };
    })
}));
