import type { TPageNode } from "@schema/core";

export function renderToHtml(node: TPageNode): string {
  const map: Record<string, string> = {
    Page: "div", Section: "section", Row: "div", Column: "div",
    Heading: "h1", Text: "p", Button: "a"
  };
  const tag = map[node.type] ?? "div";
  const attrs = Object.entries(node.props || {})
    .filter(([k]) => !["text", "children"].includes(k))
    .map(([k, v]) => `${k}="${String(v)}"`).join(" ");
  const inner =
    (node.children?.map(renderToHtml).join("") ?? "") ||
    (node.props?.text ?? "");
  return `<${tag}${attrs ? " " + attrs : ""}>${inner}</${tag}>`;
}
