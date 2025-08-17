import type { PageDocument } from "./types";
import type { SchemaVersion } from "./version";
export declare function getVersion(input: unknown): SchemaVersion | null;
export declare function migrateToLatest(input: unknown): PageDocument;
