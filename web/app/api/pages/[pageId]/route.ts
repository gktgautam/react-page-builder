import { NextResponse } from "next/server";

const store: Map<string, any> = (global as any).__pages ??= new Map<string, any>();

export async function GET(_: Request, { params }: { params: { pageId: string } }) {
  const page = store.get(params.pageId);
  if (!page) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(page);
}
