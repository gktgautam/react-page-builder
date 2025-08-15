// packages/web/src/app/api/pages/[pageId]/route.ts
// GET a saved page by id

import { NextResponse } from "next/server";
import { getPage, getTenantFromHeaders } from "../../_store";

export async function GET(req: Request, context: { params: { pageId: string } }) {
  try {
    const tenant = getTenantFromHeaders(req.headers);
    const page = getPage(tenant, context.params.pageId);
    if (!page) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(page);
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Error" }, { status: 400 });
  }
}
