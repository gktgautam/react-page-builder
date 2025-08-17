"use client";
import * as React from "react";
import { nanoid } from "nanoid";
import type { Node } from "@schema/core";
import { Divider as UiDivider } from "@ui/core";
import { registerWidget } from "./registry";

const TYPE = "divider";

export function registerDividerWidget() {
  registerWidget({
    type: TYPE,
    title: "Divider",
    category: "Basic",
    fields: [
      { kind: "text", label: "Margin", path: "style.margin", placeholder: "e.g. 16px 0" },
      { kind: "text", label: "Border", path: "style.border", placeholder: "e.g. 1px solid #ddd" }
    ],
    render: (node: Node) => {
      const style = {
        margin: node.style?.margin ?? "16px 0",
        border: node.style?.border ?? "none",
        borderTop: node.style?.border ?? "1px solid #e5e7eb",
        ...node.style
      } as React.CSSProperties;
      return <UiDivider style={style} />;
    },
    defaultNode: () => ({
      id: nanoid(),
      type: TYPE,
      props: {},
      style: { margin: "16px 0", borderTop: "1px solid #e5e7eb" },
      children: []
    })
  });
}
