// packages/web/src/app/api/pages/route.ts
// POST = save page; returns { pageId }. (You can extend with GET later.)

import { NextResponse } from "next/server";
import { getTenantFromHeaders, savePage, listPages } from "../_store";

export async function POST(req: Request) {
  try {
    const tenant = getTenantFromHeaders(req.headers);
    const body = await req.json();
    // TODO: Optionally validate against your PageSchema here.
    const pageId = savePage(tenant, body);
    return NextResponse.json({ ok: true, pageId });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Failed to save" }, { status: 400 });
  }
}

export async function GET(req: Request) {
  try {
    const tenant = getTenantFromHeaders(req.headers);
    const pages = listPages(tenant);
    if (pages.length === 0) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(pages[pages.length - 1]);
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Failed to load" }, { status: 400 });
  }
}
