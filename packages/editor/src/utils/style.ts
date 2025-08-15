// packages/editor/src/utils/style.ts
// Merge desktop + current breakpoint styles into a single inline style.

import { BaseStyle } from "@schema/styles";

export type Breakpoint = "desktop" | "tablet" | "mobile";

export function styleFrom(props: any, active: Breakpoint): BaseStyle {
  const base = props?.desktop?.style || {};
  const bp = props?.[active]?.style || {};
  return { ...base, ...bp };
}

// Helper to read a prop value with desktop fallback.
export function propFrom<T = any>(props: any, key: string, active: Breakpoint): T | undefined {
  const bpVal = props?.[active]?.[key];
  if (bpVal !== undefined) return bpVal;
  return props?.desktop?.[key];
}

// Tiny util to stringify inline styles for SSR/HTML output.
export function inlineStyle(style: Record<string, string | number | undefined> = {}): string {
  return Object.entries(style)
    .filter(([,v]) => v !== undefined && v !== "")
    .map(([k,v]) => `${k}:${v}`)
    .join(";");
}
