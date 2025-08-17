import type { PageDocument } from "@schema/core";

export type Breakpoint = "base" | "md" | "lg";

export interface EditorState {
  doc: PageDocument;
  selectedId?: string;

  breakpoint: Breakpoint;

  past: PageDocument[];
  future: PageDocument[];

  setDoc: (doc: PageDocument, pushHistory?: boolean) => void;
  loadFromUnknown: (input: unknown) => void;

  select: (id?: string) => void;

  updateByPath: (nodeId: string, path: string, value: unknown) => void;

  insertNode: (parentId: string, node: import("@schema/core").Node, atIndex?: number) => void;
  deleteNode: (nodeId: string) => void;
  moveNode: (nodeId: string, targetParentId: string, atIndex?: number) => void;

  reIdSubtree: (nodeId: string) => void;

  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;

  setBreakpoint: (bp: Breakpoint) => void;
  resetHistory: () => void;
}
