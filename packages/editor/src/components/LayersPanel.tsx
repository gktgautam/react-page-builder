"use client";
import * as React from "react";
import { Panel, PanelHeader, IconButton } from "@ui/core";

export function LayersPanel() {
  return (
    <Panel style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <PanelHeader>
        Layers
        <span style={{ float: "right" }}>
          <IconButton title="Refresh" onClick={() => { /* no-op */ }}>↻</IconButton>
        </span>
      </PanelHeader>
      <div style={{ padding: 8, fontSize: 12, color: "#6b7280" }}>
        (Your layers tree goes here)
      </div>
    </Panel>
  );
}
