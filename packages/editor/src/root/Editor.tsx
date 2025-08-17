"use client";
import * as React from "react";
import { registerDefaultWidgets } from "../widgets";
import { InspectorPanel } from "../inspector/InspectorPanel";

import { useEditorStore } from "../store";
import { WidgetPalette } from "../palette/WidgetPalette";


 

export default function EditorScreen() {
  // register once
  React.useEffect(() => {
    registerDefaultWidgets();
  }, []);

  const doc = useEditorStore((s) => s.doc);
  const rootId = doc.tree.id;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "260px 1fr 320px", height: "100vh" }}>
      <WidgetPalette parentId={rootId} />
      {/* Your Canvas goes here */}
      <div style={{ padding: 16, overflow: "auto" }}>
        {/* Render for now to visualize; replace with your draggable canvas later */}
        {/* <Render doc={doc} /> */}
      </div>
      <InspectorPanel />
    </div>
  );
}
