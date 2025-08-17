// packages/editor/src/utils/style.ts
import { 
BaseStyle, 
Breakpoint, 
ResponsiveProps, 
} from "@schema/core";

export function styleFrom(props: ResponsiveProps<any> | undefined, active: Breakpoint): BaseStyle {
  const desk = props?.desktop?.style || {};
  const cur  = props?.[active as keyof ResponsiveProps<any> as "desktop"]?.style || {};
  return { ...desk, ...cur };
}

// read a logical prop (text, href, src, etc) with desktop fallback
export function propFrom<T = any>(props: ResponsiveProps<any> | undefined, key: string, active: Breakpoint): T | undefined {
  const cur = props?.[active]?.[key];
  if (cur !== undefined) return cur as T;
  return props?.desktop?.[key] as T | undefined;
}

// convert inline style object to style string (for SSR/preview)
export function inlineStyle(style: Record<string, string | number | undefined> = {}) {
  return Object.entries(style)
    .filter(([,v]) => v !== undefined && v !== "")
    .map(([k,v]) => `${k}:${v}`)
    .join(";");
}
