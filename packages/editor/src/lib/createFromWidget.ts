import { widgetRegistry } from "./widgetRegistry";

export function createFromWidget(key: string) {
  const meta: any = widgetRegistry[key];
  if (!meta) throw new Error(`Unknown widget: ${key}`);
  const id = crypto.randomUUID?.() ?? `id_${Math.random().toString(36).slice(2)}`;
  const defaults = meta.defaultProps ? structuredClone(meta.defaultProps) : {};
  return { id, type: key, props: defaults, children: [] as any[] };
}
