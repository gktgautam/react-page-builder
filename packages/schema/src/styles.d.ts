export type Breakpoint = "desktop" | "tablet" | "mobile";
export declare const baseStyleKeys: readonly ["marginTop", "marginRight", "marginBottom", "marginLeft", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "color", "fontFamily", "fontSize", "fontWeight", "lineHeight", "letterSpacing", "textTransform", "textDecoration", "textAlign", "width", "maxWidth", "minWidth", "height", "maxHeight", "minHeight", "backgroundColor", "borderColor", "borderWidth", "borderStyle", "borderRadius", "boxShadow", "opacity", "display", "gap", "justifyContent", "alignItems", "flexDirection", "flex", "flexWrap"];
export type BaseStyle = Partial<Record<(typeof baseStyleKeys)[number], string>>;
/** Mobile-first responsive props envelope. */
export type ResponsiveProps<T = Record<string, any>> = {
    style?: BaseStyle;
    desktop?: T & {
        style?: BaseStyle;
    };
    tablet?: T & {
        style?: BaseStyle;
    };
    mobile?: T & {
        style?: BaseStyle;
    };
} & T;
