// packages/schema/src/styles.ts
// Reusable style schema + responsive types shared by editor, widgets, and preview.

export type Breakpoint = "desktop" | "tablet" | "mobile";

export const baseStyleKeys = [
  // Spacing
  "marginTop","marginRight","marginBottom","marginLeft",
  "paddingTop","paddingRight","paddingBottom","paddingLeft",

  // Typography
  "color","fontFamily","fontSize","fontWeight","lineHeight",
  "letterSpacing","textTransform","textDecoration","textAlign",

  // Size
  "width","maxWidth","minWidth","height","maxHeight","minHeight",

  // Background / Border
  "backgroundColor","borderColor","borderWidth","borderStyle","borderRadius",

  // Effects
  "boxShadow","opacity",

  // Layout helpers
  "display","gap","justifyContent","alignItems","flexDirection","flex","flexWrap",
] as const;

export type BaseStyle = Partial<Record<(typeof baseStyleKeys)[number], string>>;

/** Mobile-first responsive props envelope. */
export type ResponsiveProps<T = Record<string, any>> = {
  // base = mobile
  style?: BaseStyle;
  desktop?: T & { style?: BaseStyle };
  tablet?: T & { style?: BaseStyle };
  mobile?: T & { style?: BaseStyle }; // optional explicit mobile override (rare)
} & T;
