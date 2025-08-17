import { NextResponse } from "next/server";

const store: Map<string, any> = (global as any).__pages ??= new Map<string, any>();
let lastId: string | null = null;

export async function POST(req: Request) {
  const body = await req.json();
  const id = body?.id || crypto.randomUUID();
  body.id = id;
  store.set(id, body);
  lastId = id;
  return NextResponse.json({ ok: true, pageId: id });
}

export async function GET() {
  if (!lastId) return NextResponse.json({ error: "No page" }, { status: 404 });
  return NextResponse.json(store.get(lastId));
}
