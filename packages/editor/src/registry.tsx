// packages/editor/src/registry.tsx
import type { Node } from "@schema/core";

export type Field =
  | { type: "text"; label: string; path: string }
  | { type: "richtext"; label: string; path: string }
  | { type: "image"; label: string; path: string }
  | { type: "select"; label: string; path: string; options: string[] }
  | { type: "switch"; label: string; path: string };

export type Widget = {
  title: string;
  icon?: React.ReactNode;
  fields: Field[];
  render: (node: Node) => React.ReactNode;
  defaultNode: () => Node;
};

const registry = new Map<string, Widget>();
export const registerWidget = (type: string, widget: Widget) => registry.set(type, widget);
export const getWidget = (type: string) => registry.get(type);
export const allWidgets = () => Array.from(registry.entries());
