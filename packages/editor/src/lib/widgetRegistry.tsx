"use client";
import * as React from "react";

import {
  // from widgets/index.ts (which re-exports registry helpers)
  registerDefaultWidgets,
  registerWidget,
  getWidget,
  allWidgets,
  widgetsByCategory,
  type Widget as NewWidget
} from "../widgets";

/**
 * Ensure widgets are registered exactly once (idempotent).
 * Call this in your editor page/component useEffect.
 */
export function ensureWidgetsRegistered() {
  if (!(globalThis as any).__widgets_registered__) {
    registerDefaultWidgets();
    (globalThis as any).__widgets_registered__ = true;
  }
}

/**
 * Legacy/compat “widgetRegistry” object because your existing code imports it.
 * We expose a tiny facade with .get/.register/.all/.has methods.
 */
export const widgetRegistry = {
  get(type: string) {
    return getWidget(type);
  },
  register(w: NewWidget) {
    registerWidget(w);
  },
  all() {
    return allWidgets();
  },
  has(type: string) {
    return !!getWidget(type);
  }
};

// Legacy compatibility type alias
export type WidgetMeta = NewWidget & { allowedChildren?: string[] };

// Compatibility helper for code that expected "allowedChildren"
export function getAllowedChildren(type: string): string[] | undefined {
  const w = getWidget(type);
  return w?.acceptsChildTypes;
}

export { getWidget, widgetsByCategory };
