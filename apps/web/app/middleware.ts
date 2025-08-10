import { NextResponse, NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const host = req.headers.get("host") || "";
  // example: {tenant}.yourapp.com
  const [sub] = host.split(".");
  if (sub && sub !== "www" && sub !== "yourapp") {
    // attach tenant id to request headers for API and pages
    const res = NextResponse.next();
    res.headers.set("x-tenant", sub);
    return res;
  }
  return NextResponse.next();
}
