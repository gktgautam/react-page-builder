// packages/web/src/app/preview/[pageId]/page.tsx
// SSR preview page that renders the last saved JSON as real HTML.
// It intentionally does NOT pull in editor UI; only the page content.

import "server-only";
import { headers } from "next/headers";

// If your app runs behind a proxy, set NEXT_PUBLIC_BASE_URL, else relative fetch works in dev.
async function getPageJson(pageId: string) {
  // Use internal fetch to your API route
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/pages/${pageId}`, {
    cache: "no-store",
    headers: { "x-tenant": headers().get("x-tenant") ?? "default" },
  });
  if (!res.ok) throw new Error("Page not found");
  return res.json();
}

function mergeStyles(props: any) {
  const base = props?.desktop?.style || {};
  const bp = (props?.desktop?.style || {}); // default to desktop for preview; expand to query param later
  return { ...base, ...bp };
}

function s(style: Record<string, any> = {}) {
  return Object.entries(style)
    .filter(([,v]) => v !== undefined && v !== "")
    .map(([k,v]) => `${k}:${v}`)
    .join(";");
}

function prop(props: any, key: string) {
  if (props?.desktop?.[key] !== undefined) return props.desktop[key];
  return undefined;
}

function renderNode(node: any): string {
  const type = node?.type;
  const props = node?.props || {};
  const children = (node?.children || []).map(renderNode).join("");
  const style = s(mergeStyles(props));

  switch (type) {
    case "Section":
      return `<section style="${style}">${children}</section>`;
    case "Row":
      return `<div style="${style};display:flex;gap:16px;flex-wrap:wrap">${children}</div>`;
    case "Column":
      return `<div style="${style};flex:1;min-width:280px">${children}</div>`;
    case "Heading":
      return `<h1 style="${style}">${prop(props, "text") ?? ""}</h1>`;
    case "Text":
      return `<p style="${style}">${prop(props, "text") ?? ""}</p>`;
    case "Button":
      return `<a href="${prop(props,"href") ?? "#"}" style="${style};display:inline-block">${prop(props,"label") ?? "Button"}</a>`;
    case "Image":
      return `<img src="${prop(props,"src") ?? ""}" alt="${prop(props,"alt") ?? ""}" style="${style}" />`;
    case "HTML":
      return `<div style="${style}">${prop(props,"code") ?? ""}</div>`;
    default:
      return `<div style="${style}">${children}</div>`;
  }
}

export default async function PreviewPage({ params }: { params: { pageId: string } }) {
  const page = await getPageJson(params.pageId);
  const body = (page?.children || []).map(renderNode).join("");

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{page?.name ?? "Preview"}</title>
        <style>{`
          html,body { margin:0; padding:0; }
          section { width:100%; }
          img { max-width:100%; height:auto; }
        `}</style>
      </head>
      <body dangerouslySetInnerHTML={{ __html: body }} />
    </html>
  );
}
