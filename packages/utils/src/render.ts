import type { TPageNode } from "@schema/core";
import { escapeHtml } from "./escape";

export function renderToHtml(node: TPageNode): string {
  const map: Record<string, string> = {
    Page: "div", Section: "section", Row: "div", Column: "div",
    Heading: "h1", Text: "p", Button: "a"
  };
  const tag = map[node.type] ?? "div";
  const attrs = Object.entries(node.props || {})
    .filter(([k]) => !["text", "label", "children"].includes(k))
    .map(([k, v]) => `${k}="${escapeHtml(String(v))}"`).join(" ");
  const children = (node.children?.map(renderToHtml).join("") ?? "");
  const text = node.props?.text ?? node.props?.label ?? "";
  return `<${tag}${attrs ? " " + attrs : ""}>${children || escapeHtml(text)}</${tag}>`;
}
