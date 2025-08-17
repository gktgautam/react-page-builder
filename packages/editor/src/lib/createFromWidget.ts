"use client";

/**
 * packages/editor/src/lib/createFromWidget.ts
 *
 * Utilities to create editor Nodes from a widget type (using the registry)
 * and to clone/re-id existing nodes before insertion.
 */

import { nanoid } from "nanoid";
import type { Node } from "@schema/core";
import { widgetRegistry } from "./widgetRegistry";

/**
 * Create a fresh Node from a widget `type` using the widget registry.
 * Falls back to a generic empty node if the widget isn't found.
 */
export function createFromWidget(type: string): Node {
  const meta = widgetRegistry.get(type);

  if (meta?.defaultNode) {
    const n = meta.defaultNode();
    // Ensure a valid id (some custom defaults might omit it)
    if (!n.id) {
      n.id = nanoid();
    }
    return n;
  }

  // Fallback for unknown widget types
  return {
    id: nanoid(),
    type,
    props: {},
    style: {},
    children: []
  };
}

/**
 * Create a node from widget type and attach (optional) children.
 * Children are re-id'd to avoid collisions inside the tree.
 */
export function createFromWidgetWithChildren(type: string, children?: Node[]): Node {
  const base = createFromWidget(type);
  if (!children || children.length === 0) return base;
  return {
    ...base,
    children: children.map(reIdSubtree)
  };
}

/**
 * Deep clone a node and assign new ids to the subtree.
 * Useful when duplicating or inserting from a template.
 */
export function cloneForInsert<T extends Node>(node: T): T {
  return reIdSubtree(node) as T;
}

/**
 * Re-id a node and its entire subtree, returning a deep clone.
 */
function reIdSubtree(n: Node): Node {
  const clone: Node = {
    id: nanoid(),
    type: n.type,
    props: n.props ? structuredCloneSafe(n.props) : {},
    style: n.style ? structuredCloneSafe(n.style) : {},
    children: []
  };

  if (n.children && n.children.length) {
    clone.children = n.children.map(reIdSubtree);
  }

  return clone;
}

/**
 * Safe deep clone without relying on global structuredClone in older runtimes.
 */
function structuredCloneSafe<T>(value: T): T {
  // Use native structuredClone if available
  // @ts-ignore
  if (typeof structuredClone === "function") {
    // @ts-ignore
    return structuredClone(value);
  }
  return JSON.parse(JSON.stringify(value));
}

// Re-export for legacy imports that expect this symbol from here.
export { widgetRegistry } from "./widgetRegistry";

// Default export for convenience
export default createFromWidget;
