import { NextRequest, NextResponse } from "next/server";
import { renderToHtml } from "@utils/render";

export async function POST(req: NextRequest) {
  const schema = await req.json();
  const html = renderToHtml(schema);
  // TODO: push to S3/Cloudflare R2 and/or trigger ISR revalidate
  return new NextResponse(html, { headers: { "Content-Type": "text/html" } });
}
