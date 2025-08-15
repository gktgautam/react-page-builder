import type { TPageNode } from "@schema/core";
import { escapeHtml } from "./escape";

type Breakpoint = "desktop" | "tablet" | "mobile";

function resolveProps(raw: any, bp: Breakpoint) {
  const base = raw?.desktop || {};
  const override = raw?.[bp] || {};
  const merged = { ...base, ...override } as any;
  if (base.style || override.style) {
    merged.style = { ...(base.style || {}), ...(override.style || {}) };
  }
  return merged;
}

export function renderToHtml(node: TPageNode, bp: Breakpoint = "desktop"): string {
  const map: Record<string, string> = {
    Page: "div",
    Section: "section",
    Row: "div",
    Column: "div",
    Heading: "h1",
    Text: "p",
    Button: "a",
  };
  const tag = map[node.type] ?? "div";
  const props = resolveProps((node.props as any) || {}, bp);
  const attrs = Object.entries(props)
    .filter(([k]) => !["text", "label", "children"].includes(k))
    .map(([k, v]) => {
      if (k === "style" && typeof v === "object") {
        const styleStr = Object.entries(v)
          .map(([sk, sv]) => `${sk}:${escapeHtml(String(sv))}`)
          .join(";");
        return `style="${styleStr}"`;
      }
      return `${k}="${escapeHtml(String(v))}"`;
    })
    .join(" ");
  const children = (node.children?.map((c) => renderToHtml(c, bp)).join("") ?? "");
  const text = (props as any)?.text ?? (props as any)?.label ?? "";
  return `<${tag}${attrs ? " " + attrs : ""}>${children || escapeHtml(String(text))}</${tag}>`;
}
