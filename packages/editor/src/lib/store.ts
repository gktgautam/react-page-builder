"use client";
import { create } from "zustand";
export interface PageNode {
  id: string;
  type: string;
  props: Record<string, unknown>;
  children?: PageNode[];
}

export type Breakpoint = "desktop" | "tablet" | "mobile";

interface EditorState {
  page: PageNode;
  selectedId: string | null;
  hoveredId: string | null;
  expandedNodes: string[];
  activeBreakpoint: Breakpoint;
  selectNode: (id: string | null) => void;
  hoverNode: (id: string | null) => void;
  toggleExpand: (id: string) => void;
  setPage: (page: PageNode) => void;
  setActiveBreakpoint: (bp: Breakpoint) => void;
  addChild: (parentId: string, node: PageNode, index?: number) => void;
  moveNode: (id: string, newParentId: string, index: number) => void;
  updateProps: (id: string, newProps: Record<string, unknown>) => void;
}

function deepMap(node: PageNode, fn: (n: PageNode) => PageNode): PageNode {
  return fn({ ...node, children: node.children?.map((c:any) => deepMap(c as PageNode, fn)) });
}

function findAncestorIds(node: PageNode, targetId: string): string[] | null {
  if (node.id === targetId) return [];
  for (const child of node.children || []) {
    const result = findAncestorIds(child as PageNode, targetId);
    if (result) {
      return [node.id, ...result];
    }
  }
  return null;
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
  activeBreakpoint: "desktop",
  selectNode: (id: string | null) =>
    set((state: EditorState) => {
      if (!id) return { selectedId: null };
      const ancestors =
        findAncestorIds(state.page, id)?.filter((n) => n !== state.page.id) || [];
      const expanded = Array.from(
        new Set([...state.expandedNodes, ...ancestors])
      );
      return { selectedId: id, expandedNodes: expanded };
    }),
  hoverNode: (id: string | null) => set({ hoveredId: id }),
  toggleExpand: (id: string) =>
    set((state: EditorState) => ({
      expandedNodes: state.expandedNodes.includes(id)
        ? state.expandedNodes.filter((n) => n !== id)
        : [...state.expandedNodes, id]
    })),
  setPage: (page: PageNode) => set({ page }),
  setActiveBreakpoint: (bp: Breakpoint) => set({ activeBreakpoint: bp }),

  addChild: (parentId: string, node: PageNode, index = 0) =>
    set((state: EditorState) => {
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

  moveNode: (id: string, newParentId: string, index: number) =>
    set((state: EditorState) => {
      let moving: PageNode | null = null;

      const removed = deepMap(state.page, (n) => {
        if (!n.children) return n;
        const filtered = n.children.filter((c: any) => {
          if (c.id === id) {
            moving = c as PageNode;
            return false;
          }
          return true;
        });
        return { ...n, children: filtered.map((c: any) => c as PageNode) };
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

  updateProps: (id: string, newProps: Record<string, unknown>) =>
    set((state: EditorState) => {
      const updated = deepMap(state.page, (n) => {
        if (n.id === id) return { ...n, props: { ...n.props, ...newProps } };
        return n;
      });
      return { page: updated };
    })
}));
