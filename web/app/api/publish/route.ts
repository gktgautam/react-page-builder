import { NextRequest, NextResponse } from "next/server";
import { renderToHtml } from "@utils/core";

export async function POST(req: NextRequest) {
  const schema = await req.json();
  const html = renderToHtml(schema);
  return new NextResponse(html, { headers: { "Content-Type": "text/html" } });
}
