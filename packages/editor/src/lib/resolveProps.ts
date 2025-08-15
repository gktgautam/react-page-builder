import type { TPageNode } from "@schema/core";

export type Breakpoint = 'desktop' | 'tablet' | 'mobile';

export function resolveProps(node: TPageNode, bp: Breakpoint) {
  const base = node.props || {};
  const responsive = (node as any).responsive || {};
  if (bp === 'mobile') return { ...base };
  if (bp === 'tablet') return { ...base, ...(responsive.tablet || {}) };
  // desktop
  return { ...base, ...(responsive.tablet || {}), ...(responsive.desktop || {}) };
}
