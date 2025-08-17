"use client";
import * as React from "react";
import { nanoid } from "nanoid";
import type { Node } from "@schema/core";
import { Spacer as UiSpacer } from "@ui/core";
import { registerWidget } from "./registry";

const TYPE = "spacer";

export function registerSpacerWidget() {
  registerWidget({
    type: TYPE,
    title: "Spacer",
    category: "Basic",
    fields: [
      { kind: "text", label: "Height", path: "props.height", placeholder: "e.g. 24px" }
    ],
    render: (node: Node) => {
      const height = String(node.props?.height ?? "24px");
      return <UiSpacer height={height} style={node.style as React.CSSProperties} />;
    },
    defaultNode: () => ({
      id: nanoid(),
      type: TYPE,
      props: { height: "24px" },
      style: {},
      children: []
    })
  });
}
