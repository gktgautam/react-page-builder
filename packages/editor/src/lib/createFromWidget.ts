import { getWidget } from "../widgets/registry";
import type { Node } from "@schema/core";
import { nanoid } from "nanoid";

export function createFromWidget(widgetType: string): Node {
  const meta = getWidget(widgetType);
  if (!meta) throw new Error(`Unknown widget: ${widgetType}`);
  const base = meta.defaultNode();
  return { ...base, id: base.id ?? nanoid() };
}
