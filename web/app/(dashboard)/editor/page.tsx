"use client";

import * as React from "react";

// ✅ match your tsconfig.base.json alias: "@editor/*": ["packages/editor/src/*"]
import EditorApp from "@editor/components/EditorLayout";
import { registerDefaultWidgets } from "@editor/widgets";

export default function EditorPage() {
  React.useEffect(() => {
    // idempotent guard (prevents double registration during HMR)
    if (!(globalThis as any).__widgets_registered__) {
      registerDefaultWidgets();
      (globalThis as any).__widgets_registered__ = true;
    }
  }, []);

  return <EditorApp />;
}
