"use client";
import * as React from "react";
import { nanoid } from "nanoid";
import type { Node } from "@schema/core";
import { Column as UiColumn } from "@ui/core";
import { registerWidget } from "./registry";

const TYPE = "column";

export function registerColumnWidget() {
  registerWidget({
    type: TYPE,
    title: "Column",
    category: "Layout",
    fields: [],
    allowedParentTypes: ["section", "column"],
    acceptsChildTypes: ["heading", "text", "button", "image", "divider", "spacer", "section", "column"],
    render: (node: Node) => {
      const style: React.CSSProperties = {
        display: node.style?.display ?? "block",
        ...node.style
      };
      return <UiColumn style={style}>{node.children?.map((c) => <div key={c.id} data-node-id={c.id} />)}</UiColumn>;
    },
    defaultNode: () => ({
      id: nanoid(),
      type: TYPE,
      props: {},
      style: { display: "block" },
      children: []
    })
  });
}
