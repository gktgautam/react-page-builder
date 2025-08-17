"use client";
import * as React from "react";

// ✅ import from ../widgets (index.ts exports registerDefaultWidgets)
import {
  registerDefaultWidgets,
  getWidget,
  widgetsByCategory,
  type Widget as NewWidget
} from "../widgets";

// call this once at app boot (editor page) to register everything
export function ensureWidgetsRegistered() {
  // idempotent: calling multiple times is fine
  if (!(globalThis as any).__widgets_registered__) {
    registerDefaultWidgets();
    (globalThis as any).__widgets_registered__ = true;
  }
}

// Legacy compatibility type alias
export type WidgetMeta = NewWidget & { allowedChildren?: string[] };

// Compatibility helper for code that expected "allowedChildren"
export function getAllowedChildren(type: string): string[] | undefined {
  const w = getWidget(type);
  return w?.acceptsChildTypes;
}

export { getWidget, widgetsByCategory };
