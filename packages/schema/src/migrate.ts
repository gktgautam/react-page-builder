import { PageDocumentZ } from "./types";
import type { PageDocument } from "./types";
import type { SchemaVersion } from "./version";
import type { PageDocumentV0 } from "./types.v0";
import { migrateV0ToV1 } from "./migrations/v0_to_v1";

type AnyDoc = { version?: SchemaVersion } & Record<string, any>;

export function getVersion(input: unknown): SchemaVersion | null {
  if (!input || typeof input !== "object") return null;
  const v = (input as AnyDoc).version;
  return v === 0 || v === 1 ? v : null;
}

export function migrateToLatest(input: unknown): PageDocument {
  const v = getVersion(input);

  if (v === 1) {
    const parsed = PageDocumentZ.safeParse(input);
    if (!parsed.success) throw new Error(`Invalid v1 PageDocument: ${parsed.error.message}`);
    return parsed.data;
  }

  if (v === 0) {
    const upgraded = migrateV0ToV1(input as PageDocumentV0);
    const parsed = PageDocumentZ.safeParse(upgraded);
    if (!parsed.success) throw new Error(`Migration v0→v1 invalid: ${parsed.error.message}`);
    return parsed.data;
  }

  // Unknown/missing version: best-effort assume v0
  const upgraded = migrateV0ToV1(input as PageDocumentV0);
  const parsed = PageDocumentZ.safeParse(upgraded);
  if (!parsed.success) throw new Error(`Cannot migrate: ${parsed.error.message}`);
  return parsed.data;
}
