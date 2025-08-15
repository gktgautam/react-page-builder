import type { TPageNode, Breakpoint } from "@schema/core";
import { escapeHtml } from "./escape";

export function renderToHtml(node: TPageNode, breakpoint: Breakpoint = "desktop"): string {
  const map: Record<string, string> = {
    Page: "div", Section: "section", Row: "div", Column: "div",
    Heading: "h1", Text: "p", Button: "a"
  };
  const tag = map[node.type] ?? "div";
  const attrs = Object.entries(node.props || {})
    .filter(([k]) => !["text", "label", "children"].includes(k))
    .map(([k, v]) => `${k}="${escapeHtml(String(v))}"`).join(" ");
  const children = (
    node.children?.map((child: TPageNode) => renderToHtml(child, breakpoint)).join("") ?? ""
  );
  const text = node.props?.text ?? node.props?.label ?? "";
  return `<${tag}${attrs ? " " + attrs : ""}>${children || escapeHtml(text)}</${tag}>`;
}
