import { BaseStyle, Breakpoint, ResponsiveProps } from "@schema/core";

/** Mobile-first style merge: base → tablet → desktop depending on target bp. */
export function styleFrom(props: ResponsiveProps<any> | undefined, bp: Breakpoint): BaseStyle {
  const base = props?.style || {};
  const tb   = props?.tablet?.style || {};
  const ds   = props?.desktop?.style || {};
  if (bp === "desktop") return { ...base, ...tb, ...ds };
  if (bp === "tablet")  return { ...base, ...tb };
  return { ...base }; // mobile
}

/** Get a logical prop (text, href, src, etc.) mobile-first cascading. */
export function propFrom<T = any>(props: ResponsiveProps<any> | undefined, key: string, bp: Breakpoint): T | undefined {
  const base = (props as any)?.[key];
  const tb   = (props as any)?.tablet?.[key];
  const ds   = (props as any)?.desktop?.[key];
  if (bp === "desktop") return (ds ?? tb ?? base) as T | undefined;
  if (bp === "tablet")  return (tb ?? base) as T | undefined;
  return base as T | undefined;
}

export function inlineStyle(style: Record<string, string | number | undefined> = {}) {
  return Object.entries(style)
    .filter(([,v]) => v !== undefined && v !== "")
    .map(([k,v]) => `${k}:${v}`)
    .join(";");
}
