// packages/web/src/app/preview/[pageId]/page.tsx
// SSR preview page that renders the last saved JSON as real HTML.
// It intentionally does NOT pull in editor UI; only the page content.

import "server-only";
import { headers } from "next/headers";
import DOMPurify from "isomorphic-dompurify";

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

type BP = "desktop" | "tablet" | "mobile";

function mergeStyles(props: any, bp: BP) {
  const base = props?.desktop?.style || {};
  const override = props?.[bp]?.style || {};
  return { ...base, ...override };
}

function s(style: Record<string, any> = {}) {
  return Object.entries(style)
    .filter(([, v]) => v !== undefined && v !== "")
    .map(([k, v]) => `${k}:${v}`)
    .join(";");
}

function prop(props: any, key: string, bp: BP) {
  const override = props?.[bp]?.[key];
  if (override !== undefined) return override;
  return props?.desktop?.[key];
}

function renderNode(node: any, bp: BP): string {
  const type = node?.type;
  const props = node?.props || {};
  const children = (node?.children || []).map((c: any) => renderNode(c, bp)).join("");
  const style = s(mergeStyles(props, bp));

  switch (type) {
    case "Section":
      return `<section style="${style}">${children}</section>`;
    case "Row":
      return `<div style="${style};display:flex;gap:16px;flex-wrap:wrap">${children}</div>`;
    case "Column":
      return `<div style="${style};flex:1;min-width:280px">${children}</div>`;
    case "Heading":
      return `<h1 style="${style}">${prop(props, "text", bp) ?? ""}</h1>`;
    case "Text":
      return `<p style="${style}">${prop(props, "text", bp) ?? ""}</p>`;
    case "Button":
      return `<a href="${prop(props, "href", bp) ?? "#"}" style="${style};display:inline-block">${prop(props, "label", bp) ?? "Button"}</a>`;
    case "Image":
      return `<img src="${prop(props, "src", bp) ?? ""}" alt="${prop(props, "alt", bp) ?? ""}" style="${style}" />`;
    case "HTML":
      return `<div style="${style}">${DOMPurify.sanitize(prop(props, "code", bp) ?? "")}</div>`;
    default:
      return `<div style="${style}">${children}</div>`;
  }
}

export default async function PreviewPage({ params, searchParams }: { params: { pageId: string }, searchParams?: { bp?: string } }) {
  const bp = (searchParams?.bp ?? "desktop") as BP;
  const page = await getPageJson(params.pageId);
  const body = (page?.children || []).map((n: any) => renderNode(n, bp)).join("");

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
