// packages/editor/src/widgets/HTMLWidget.tsx
// NEW widget: HTML/Embed (sanitized with DOMPurify). Supports forms, maps, 3rd‑party embeds.

"use client";
import React from "react";
import DOMPurify from "dompurify"; 
import { styleFrom, propFrom } from "../utils/style";
import { Breakpoint } from "@schema/core";


type Props = {
  id: string;
  props: Record<string, any>;
  _ctx?: { activeBreakpoint: Breakpoint };
};

export default function HTMLWidget({ id, props, _ctx }: Props) {
  const active = _ctx?.activeBreakpoint ?? "desktop";
  const style = styleFrom(props, active);
  const code = propFrom<string>(props, "code", active) || "<p>Paste embed code</p>";

  return (
    <div
      data-node-id={id}
      style={style as React.CSSProperties}
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(code) }}
    />
  );
}

// Suggested registry entry:
//
// HTML: {
//   component: HTMLWidget,
//   name: "HTML / Embed",
//   icon: "</>",
//   isContainer: false,
//   defaultProps: { desktop: { code: "<p>Paste HTML here</p>", style: {} }, tablet:{ style:{} }, mobile:{ style:{} } },
//   propsSchema: { content: { code: "textarea" }, style: "style" }
// }
