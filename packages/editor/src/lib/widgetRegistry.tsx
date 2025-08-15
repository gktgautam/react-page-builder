"use client";
import type React from "react";
import HeadingWidget from "../widgets/HeadingWidget";
import TextWidget from "../widgets/TextWidget";
import ButtonWidget from "../widgets/ButtonWidget";
import SectionWidget from "../widgets/SectionWidget";

export type WidgetMeta = {
  component: React.ComponentType<any>;
  name: string;
  defaultProps: Record<string, unknown>;
  isContainer: boolean;
  icon: string;
};

export const widgetRegistry: Record<string, WidgetMeta> = {
  Section: {
    component: SectionWidget,
    name: "Section",
    defaultProps: {},
    isContainer: true,
    icon: "📦"
  },
  Heading: {
    component: HeadingWidget,
    name: "Heading",
    defaultProps: { text: "Heading Text" },
    isContainer: false,
    icon: "🔠"
  },
  Text: {
    component: TextWidget,
    name: "Text",
    defaultProps: { text: "Edit me" },
    isContainer: false,
    icon: "✏️"
  },
  Button: {
    component: ButtonWidget,
    name: "Button",
    defaultProps: { label: "Click Me", href: "#" },
    isContainer: false,
    icon: "🔘"
  }
};
