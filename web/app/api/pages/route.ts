import { NextRequest, NextResponse } from "next/server";
import { PageSchema } from "@schema/core";

const DB = new Map<string, unknown>(); // in-memory for demo

export async function GET(req: NextRequest) {
  const tenant = req.headers.get("x-tenant") ?? "default";
  return NextResponse.json(
    DB.get(tenant) ?? { id: "root", type: "Page", props: {}, children: [] }
  );
}

export async function POST(req: NextRequest) {
  const tenant = req.headers.get("x-tenant") ?? "default";
  const body = await req.json();
  PageSchema.parse(body); // validate schema
  DB.set(tenant, body);
  return NextResponse.json({ ok: true });
}
