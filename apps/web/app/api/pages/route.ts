import { NextRequest, NextResponse } from "next/server";
import { PageSchema } from "@schema/types";
import { z } from "zod";

const DB = new Map<string, unknown>();

export async function GET(req: NextRequest) {
  const tenant = req.headers.get("x-tenant") ?? "default";
  return NextResponse.json(DB.get(tenant) ?? { id: "root", type: "Page", props: {}, children: [] });
}

export async function POST(req: NextRequest) {
  const tenant = req.headers.get("x-tenant") ?? "default";
  const body = await req.json();
  PageSchema.parse(body); // validate
  DB.set(tenant, body);
  return NextResponse.json({ ok: true });
}
