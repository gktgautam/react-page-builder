"use client";

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { produce } from "immer";

import { migrateToLatest, PageDocumentZ, type Node, type PageDocument } from "@schema/core";
import { findNode, insertChild, removeChild, replaceChild, replaceNodeInTree, reIdSubtree, deepClone, setByPath, updatePage } from "./utils";
import type { EditorState } from "./types";

function pushHistory(state: EditorState, next: PageDocument) {
  state.past.push(deepClone(state.doc));
  state.doc = deepClone(next);
  state.future = [];
}
 

function ensureValidDoc(doc: PageDocument): PageDocument {
  const parsed = PageDocumentZ.safeParse(doc);
  if (!parsed.success) throw new Error(`Invalid PageDocument: ${parsed.error.message}`);
  return parsed.data;
}

export const useEditorStore = create<EditorState>()(
  devtools(
    (set, get) => ({
      // INITIAL STATE — provide a tiny empty doc to start with
      doc: {
        version: 1,
        title: "Untitled",
        tree: {
          id: "root",
          type: "section",
          props: {},
          style: {},
          children: [],
        },
      },
      selectedId: undefined,
      breakpoint: "base",
      past: [],
      future: [],

      setDoc: (doc, push) =>
        set(
          produce<EditorState>((state) => {
            const valid = ensureValidDoc(doc);
            if (push) {
              pushHistory(state, valid);
            } else {
              state.doc = deepClone(valid);
            }
          })
        ),

      loadFromUnknown: (input) =>
        set(
          produce<EditorState>((state) => {
            const migrated = migrateToLatest(input);
            state.past = [];
            state.future = [];
            state.doc = deepClone(migrated);
            state.selectedId = migrated.tree.id;
          })
        ),

      select: (id) =>
        set(
          produce<EditorState>((s) => {
            s.selectedId = id;
          })
        ),

      updateByPath: (nodeId, path, value) =>
        set(
          produce<EditorState>((s) => {
            const { node, parent, index } = findNode(s.doc.tree, nodeId) ?? {};
            if (!node) return;
            const updatedNode = setByPath(node, path, value) as Node;
            const newTree = parent
              ? replaceChild(parent, index!, updatedNode)
              : updatedNode;
            if (parent) {
              // replace via walking from root
              const nextRoot = replaceNodeInTree(s.doc.tree, parent.id, newTree);
              pushHistory(s, updatePage(s.doc, nextRoot));
            } else {
              // node is root
              pushHistory(s, updatePage(s.doc, updatedNode));
            }
          })
        ),

      insertNode: (parentId, newNode, atIndex) =>
        set(
          produce<EditorState>((s) => {
            const located = findNode(s.doc.tree, parentId);
            if (!located) return;
            const newParent = insertChild(located.node, newNode, atIndex);
            const nextRoot = replaceNodeInTree(s.doc.tree, parentId, newParent);
            pushHistory(s, updatePage(s.doc, nextRoot));
            s.selectedId = newNode.id;
          })
        ),

      deleteNode: (nodeId) =>
        set(
          produce<EditorState>((s) => {
            const located = findNode(s.doc.tree, nodeId);
            if (!located) return;
            const { parent, index } = located;
            if (!parent) {
              // avoid deleting root; clear children instead
              const newRoot = deepClone(s.doc.tree);
              newRoot.children = [];
              pushHistory(s, updatePage(s.doc, newRoot));
              s.selectedId = newRoot.id;
              return;
            }
            const newParent = removeChild(parent, index);
            const nextRoot = replaceNodeInTree(s.doc.tree, parent.id, newParent);
            pushHistory(s, updatePage(s.doc, nextRoot));
            s.selectedId = parent.id; // move selection to parent
          })
        ),

      moveNode: (nodeId, targetParentId, atIndex) =>
        set(
          produce<EditorState>((s) => {
            if (nodeId === targetParentId) return;
            const src = findNode(s.doc.tree, nodeId);
            const dst = findNode(s.doc.tree, targetParentId);
            if (!src || !dst) return;

            // 1) remove from old parent (or if root, forbid)
            const { parent: srcParent, index: srcIndex, node } = src;
            if (!srcParent) return; // don't move root
            const afterRemoval = removeChild(srcParent, srcIndex);

            const rootAfterRemove = replaceNodeInTree(s.doc.tree, srcParent.id, afterRemoval);

            // 2) insert into new parent
            const dstInUpdatedTree = findNode(rootAfterRemove, targetParentId);
            if (!dstInUpdatedTree) return;
            const newParent = insertChild(dstInUpdatedTree.node, node, atIndex);
            const nextRoot = replaceNodeInTree(rootAfterRemove, targetParentId, newParent);

            pushHistory(s, updatePage(s.doc, nextRoot));
            s.selectedId = node.id;
          })
        ),

      reIdSubtree: (nodeId) =>
        set(
          produce<EditorState>((s) => {
            const located = findNode(s.doc.tree, nodeId);
            if (!located) return;
            const reIded = reIdSubtree(located.node);
            const nextRoot = replaceNodeInTree(s.doc.tree, nodeId, reIded);
            pushHistory(s, updatePage(s.doc, nextRoot));
            s.selectedId = reIded.id;
          })
        ),

      undo: () =>
        set(
          produce<EditorState>((s) => {
            if (s.past.length === 0) return;
            const prev = s.past.pop()!;
            s.future.unshift(deepClone(s.doc));
            s.doc = deepClone(prev);
            // keep selection safe
            const found = findNode(s.doc.tree, s.selectedId ?? "");
            if (!found || !found.node) {
              s.selectedId = s.doc.tree.id;
            }
          })
        ),

      redo: () =>
        set(
          produce<EditorState>((s) => {
            if (s.future.length === 0) return;
            const next = s.future.shift()!;
            s.past.push(deepClone(s.doc));
            s.doc = deepClone(next);
            const foundNode = findNode(s.doc.tree, s.selectedId ?? "");
            if (!foundNode || !foundNode.node) {
              s.selectedId = s.doc.tree.id;
            }
          })
        ),

      canUndo: () => get().past.length > 0,
      canRedo: () => get().future.length > 0,

      setBreakpoint: (bp) =>
        set(
          produce<EditorState>((s) => {
            s.breakpoint = bp;
          })
        ),

      resetHistory: () =>
        set(
          produce<EditorState>((s) => {
            s.past = [];
            s.future = [];
          })
        ),
    }),
    { name: "editor-store" }
  )
);
