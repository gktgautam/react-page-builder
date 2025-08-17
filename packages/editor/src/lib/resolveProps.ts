import type { TPageNode, Breakpoint } from "@schema/core";

 

export function resolveProps(node: TPageNode, bp: Breakpoint) {
  const base = node.props || {};
  const responsive = (node as any).responsive || {};
  if (bp === 'mobile') return { ...base };
  if (bp === 'tablet') return { ...base, ...(responsive.tablet || {}) };
  // desktop
  return { ...base, ...(responsive.tablet || {}), ...(responsive.desktop || {}) };
}
