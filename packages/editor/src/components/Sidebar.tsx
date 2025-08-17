"use client";
import * as React from "react";
import { Panel, PanelHeader } from "@ui/core";

export function Sidebar({ children }: React.PropsWithChildren) {
  return (
    <Panel style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <PanelHeader>Sidebar</PanelHeader>
      <div style={{ padding: 8 }}>{children}</div>
    </Panel>
  );
}
