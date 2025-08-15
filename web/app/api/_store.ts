// packages/web/src/app/api/_store.ts
// Minimal in‑memory store keyed by tenant + id. Replace with DB later.

import { randomUUID } from "crypto";

type Page = any;

const tenants = new Map<string, Map<string, Page>>();

function tenantMap(tenant: string) {
  if (!tenants.has(tenant)) tenants.set(tenant, new Map());
  return tenants.get(tenant)!;
}

export function getTenantFromHeaders(headers: Headers) {
  return headers.get("x-tenant") || "default";
}

export function savePage(tenant: string, page: Page): string {
  const id = page?.id || randomUUID();
  page.id = id;
  tenantMap(tenant).set(id, page);
  return id;
}

export function getPage(tenant: string, id: string): Page | undefined {
  return tenantMap(tenant).get(id);
}
