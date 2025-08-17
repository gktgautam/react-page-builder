"use client";
import * as React from "react";
import type { Node, PageDocument } from "@schema/core";
import { getWidget } from "../widgets/registry";

function renderNode(node: Node): React.ReactNode {
  const w = getWidget(node.type);
  if (!w) return null;

  // Render self
  const self = w.render(node);

  // Render children placeholders (they will be replaced by editor canvas)
  const children = node.children?.map((c) => <React.Fragment key={c.id}>{renderNode(c)}</React.Fragment>);

  // If widget render already places children via placeholders, avoid double-wrapping
  // For simple widgets, just append children after self if needed
  return (
    <>
      {self}
      {children}
    </>
  );
}

export function Render({ doc }: { doc: PageDocument }) {
  return <>{renderNode(doc.tree)}</>;
}
