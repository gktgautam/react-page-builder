export { migrateToLatest } from "./migrate";
export * from "./types";
export * from "./version";
export * from "./styles";   // <-- add this line

// compat alias for older code
export type TPageNode = import("./types").Node;
