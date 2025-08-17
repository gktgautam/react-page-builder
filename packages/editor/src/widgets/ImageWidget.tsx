// packages/editor/src/widgets/ImageWidget.tsx
// NEW widget: Image. Add to your widget registry.

"use client";
import React from "react";
import { styleFrom, propFrom } from "../utils/style";
import { Breakpoint } from "@schema/core";


type Props = {
  id: string;
  props: Record<string, any>;
  _ctx?: { activeBreakpoint: Breakpoint };
};

export default function ImageWidget({ id, props, _ctx }: Props) {
  const active = _ctx?.activeBreakpoint ?? "desktop";
  const style = styleFrom(props, active);
  const src = propFrom<string>(props, "src", active) || "";
  const alt = propFrom<string>(props, "alt", active) || "";

  return (
    <img data-node-id={id} src={src} alt={alt} style={style as React.CSSProperties} />
  );
}

// Suggested registry entry:
//
// Image: {
//   component: ImageWidget,
//   name: "Image",
//   icon: "🖼️",
//   isContainer: false,
//   defaultProps: {
//     desktop: { src: "https://placehold.co/800x450", alt: "Image", style: { width: "100%", height: "auto" } },
//     tablet:  { style: {} },
//     mobile:  { style: {} },
//   },
//   propsSchema: { content: { src: "text", alt: "text" }, style: "style" }
// }
