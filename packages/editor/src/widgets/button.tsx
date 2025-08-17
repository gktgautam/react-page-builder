"use client";
import * as React from "react";
import { nanoid } from "nanoid";
import type { Node } from "@schema/core";
import { Button as UiButton } from "@ui/core";
import { registerWidget } from "./registry";

const TYPE = "button";

export function registerButtonWidget() {
  registerWidget({
    type: TYPE,
    title: "Button",
    category: "Basic",
    fields: [
      { kind: "text", label: "Label", path: "props.label", placeholder: "Click me" },
      { kind: "url",  label: "Link",  path: "props.href",  placeholder: "https://..." },
      { kind: "switch", label: "Open in new tab", path: "props.newTab" }
    ],
    render: (node: Node) => {
      const { label = "Click me", href, newTab } = node.props ?? {};
      const style = {
        display: "inline-block",
        padding: "10px 16px",
        background: "#222",
        color: "#fff",
        textDecoration: "none",
        borderRadius: "6px",
        ...node.style
      } as React.CSSProperties;
      return <UiButton label={label} href={href} newTab={!!newTab} style={style} />;
    },
    defaultNode: () => ({
      id: nanoid(),
      type: TYPE,
      props: { label: "Click me", href: "", newTab: false },
      style: {},
      children: []
    })
  });
}
