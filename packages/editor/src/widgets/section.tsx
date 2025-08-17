"use client";
import * as React from "react";
import { nanoid } from "nanoid";
import type { Node } from "@schema/core";
import { Section as UiSection } from "@ui/core";
import { registerWidget } from "./registry";

const TYPE = "section";

export function registerSectionWidget() {
  registerWidget({
    type: TYPE,
    title: "Section",
    category: "Layout",
    fields: [], // contentless container
    acceptsChildTypes: ["column", "heading", "text", "button", "image", "divider", "spacer", "section"],
    render: (node: Node) => {
      return <UiSection style={node.style as React.CSSProperties}>{node.children?.map((c) => (
        <div key={c.id} data-node-id={c.id} />
      ))}</UiSection>;
    },
    defaultNode: () => ({
      id: nanoid(),
      type: TYPE,
      props: {},
      style: { display: "block", padding: "24px 16px" },
      children: []
    })
  });
}
