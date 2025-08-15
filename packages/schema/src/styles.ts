// packages/schema/src/styles.ts
// Reusable, simple style schema for all widgets.

export const baseStyleKeys = [
  "marginTop","marginRight","marginBottom","marginLeft",
  "paddingTop","paddingRight","paddingBottom","paddingLeft",
  "color","backgroundColor","borderColor","borderWidth","borderStyle","borderRadius",
  "fontFamily","fontSize","fontWeight","lineHeight","letterSpacing","textTransform","textDecoration",
  "textAlign","width","maxWidth","minWidth","height","maxHeight","minHeight",
  "boxShadow","opacity","display","gap","justifyContent","alignItems","flexDirection","flex","flexWrap"
] as const;

export type BaseStyle = Partial<Record<(typeof baseStyleKeys)[number], string>>;

// Typical per‑breakpoint props structure you can reuse:
export type ResponsiveProps<T = Record<string, any>> = {
  desktop?: T & { style?: BaseStyle };
  tablet?: T & { style?: BaseStyle };
  mobile?: T & { style?: BaseStyle };
};
