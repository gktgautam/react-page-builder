"use client";
import * as React from "react";
import { nanoid } from "nanoid";
import type { Node } from "@schema/core";
import { Heading as UiHeading } from "@ui/core";
import { registerWidget } from "./registry";

const TYPE = "heading";

export function registerHeadingWidget() {
  registerWidget({
    type: TYPE,
    title: "Heading",
    category: "Basic",
    fields: [
      { kind: "select", label: "Level", path: "props.level", options: [
        { label: "H1", value: "1" },
        { label: "H2", value: "2" },
        { label: "H3", value: "3" },
        { label: "H4", value: "4" },
        { label: "H5", value: "5" },
        { label: "H6", value: "6" }
      ]},
      { kind: "text", label: "Text", path: "props.text", placeholder: "Your headline..." }
    ],
    render: (node: Node) => {
      const level = Number(node.props?.level ?? 2);
      const text = String(node.props?.text ?? "Heading");
      return <UiHeading level={level} text={text} style={node.style as React.CSSProperties} />;
    },
    defaultNode: () => ({
      id: nanoid(),
      type: TYPE,
      props: { level: 2, text: "Heading" },
      style: { margin: "0 0 8px" },
      children: []
    })
  });
}
