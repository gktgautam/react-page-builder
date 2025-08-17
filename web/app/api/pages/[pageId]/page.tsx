import { notFound } from "next/navigation";
import createDOMPurify from "dompurify";
import { JSDOM } from "jsdom";

// Create a DOMPurify instance for server-side (Node) rendering
const window = new JSDOM("").window as any;
const DOMPurify = createDOMPurify(window);

// --- helpers (inlined here to avoid import path issues) ---
function inlineStyle(style: Record<string, string | number | undefined> = {}) {
  return Object.entries(style)
    .filter(([, v]) => v !== undefined && v !== "")
    .map(([k, v]) => `${k}:${v}`)
    .join(";");
}

function mergeStyle(
  props: any,
  bp: "mobile" | "tablet" | "desktop" = "desktop"
) {
  const base = props?.style || {};
  const tb = props?.tablet?.style || {};
  const ds = props?.desktop?.style || {};
  return bp === "desktop" ? { ...base, ...tb, ...ds } : bp === "tablet" ? { ...base, ...tb } : { ...base };
}

function prop(
  props: any,
  key: string,
  bp: "mobile" | "tablet" | "desktop" = "desktop"
) {
  const base = props?.[key];
  const tb = props?.tablet?.[key];
  const ds = props?.desktop?.[key];
  return bp === "desktop" ? (ds ?? tb ?? base) : bp === "tablet" ? (tb ?? base) : base;
}

function renderNode(
  node: any,
  bp: "mobile" | "tablet" | "desktop" = "desktop"
): string {
  const p = node.props || {};
  const kids = (node.children || []).map((c: any) => renderNode(c, bp)).join("");
  const style = inlineStyle(mergeStyle(p, bp));

  switch (node.type) {
    case "Section":
      return `<section style="${style}">${kids}</section>`;
    case "Row":
      return `<div style="${style};display:flex;gap:16px;flex-wrap:wrap">${kids}</div>`;
    case "Column":
      return `<div style="${style};flex:1;min-width:280px">${kids}</div>`;
    case "Heading":
      return `<h1 style="${style}">${prop(p, "text", bp) || ""}</h1>`;
    case "Text":
      return `<p style="${style}">${prop(p, "text", bp) || ""}</p>`;
    case "Button":
      return `<a href="${prop(p, "href", bp) || "#"}" style="${style};display:inline-block">${prop(p, "label", bp) || "Button"}</a>`;
    case "Image":
      return `<img src="${prop(p, "src", bp) || ""}" alt="${prop(p, "alt", bp) || ""}" style="${style}" />`;
    case "HTML": {
      const safe = DOMPurify.sanitize(prop(p, "code", bp) || "");
      return `<div style="${style}">${safe}</div>`;
    }
    default:
      return `<div style="${style}">${kids}</div>`;
  }
}

export default async function Page({
  params,
}: {
  params: { pageId: string };
}) {
  const base = process.env.NEXT_PUBLIC_BASE_URL ?? "";
  const res = await fetch(`${base}/api/pages/${params.pageId}`, { cache: "no-store" });
  if (!res.ok) return notFound();

  const page = await res.json();
  const body = (page.children || [])
    .map((n: any) => renderNode(n, "desktop"))
    .join("");

  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>Preview</title>
        <style>{`html,body{margin:0;padding:0}img{max-width:100%;height:auto}section{width:100%}`}</style>
      </head>
      <body>
        <div dangerouslySetInnerHTML={{ __html: body }} />
      </body>
    </html>
  );
}
