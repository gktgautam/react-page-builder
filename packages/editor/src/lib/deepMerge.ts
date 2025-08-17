export function deepMerge<T>(a: T, b: Partial<T>): T {
  if (b === undefined || b === null) return a;
  if (Array.isArray(a) || Array.isArray(b)) return (b as any) ?? (a as any);
  if (typeof a !== "object" || typeof b !== "object") return (b as any) ?? (a as any);
  const out: any = { ...(a as any) };
  for (const k of Object.keys(b as any)) {
    const av = (a as any)[k];
    const bv = (b as any)[k];
    out[k] = k in (a as any) ? deepMerge(av, bv) : bv;
  }
  return out;
}
