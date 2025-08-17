"use client";
import * as React from "react";
import { nanoid } from "nanoid";
import type { Node } from "@schema/core";
import { Text as UiText } from "@ui/core";
import { registerWidget } from "./registry";

const TYPE = "text";

export function registerTextWidget() {
  registerWidget({
    type: TYPE,
    title: "Text",
    category: "Basic",
    fields: [
      { kind: "textarea", label: "Text", path: "props.text", placeholder: "Type your content...", rows: 4 }
    ],
    render: (node: Node) => {
      const text = String(node.props?.text ?? "Lorem ipsum dolor sit amet");
      return <UiText text={text} style={node.style as React.CSSProperties} />;
    },
    defaultNode: () => ({
      id: nanoid(),
      type: TYPE,
      props: { text: "Lorem ipsum dolor sit amet" },
      style: { margin: "0 0 8px", lineHeight: "1.6" },
      children: []
    })
  });
}
