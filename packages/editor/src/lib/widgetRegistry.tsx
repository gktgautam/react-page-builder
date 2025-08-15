"use client";
import type React from "react";
import HeadingWidget from "../widgets/HeadingWidget";
import TextWidget from "../widgets/TextWidget";
import ButtonWidget from "../widgets/ButtonWidget";
import SectionWidget from "../widgets/SectionWidget";
import RowWidget from "../widgets/RowWidget";
import ColumnWidget from "../widgets/ColumnWidget";

export type WidgetPropInputType = "text" | "color";

export type WidgetMeta = {
  component: React.ComponentType<any>;
  name: string;
  defaultProps: Record<string, unknown>;
  propsSchema: Record<string, WidgetPropInputType>;
  isContainer: boolean;
  icon: string;
};

export const widgetRegistry: Record<string, WidgetMeta> = {
  Section: {
    component: SectionWidget,
    name: "Section",
    defaultProps: {
      desktop: {
        padding: "16px",
        backgroundColor: "#f3f4f6",
        layout: "contained",
      },
    },
    propsSchema: {
      padding: "text",
      backgroundColor: "color",
      layout: "text",
    },
    isContainer: true,
    icon: "📦",
  },
  Row: {
    component: RowWidget,
    name: "Row",
    defaultProps: {
      desktop: {
        gap: "0px",
      },
    },
    propsSchema: {
      gap: "text",
    },
    isContainer: true,
    icon: "📏",
  },
  Column: {
    component: ColumnWidget,
    name: "Column",
    defaultProps: {
      desktop: {
        width: "100%",
      },
    },
    propsSchema: {
      width: "text",
    },
    isContainer: true,
    icon: "⬜",
  },
  Heading: {
    component: HeadingWidget,
    name: "Heading",
    defaultProps: {
      desktop: {
        text: "Heading Text",
        padding: "8px 0",
        color: "#333333",
        fontSize: "32px",
        backgroundColor: "transparent",
        textAlign: "left",
        fontWeight: "700",
        fontFamily: "Inter, sans-serif",
        lineHeight: "1.2em",
      },
    },
    propsSchema: {
      text: "text",
      padding: "text",
      color: "color",
      fontSize: "text",
      backgroundColor: "color",
      textAlign: "text",
      fontWeight: "text",
      fontFamily: "text",
      lineHeight: "text",
    },
    isContainer: false,
    icon: "🔠",
  },
  Text: {
    component: TextWidget,
    name: "Text",
    defaultProps: {
      desktop: {
        text: "Edit me",
        padding: "8px",
        color: "#333333",
        fontSize: "16px",
        backgroundColor: "transparent",
        textAlign: "left",
        fontWeight: "400",
        fontFamily: "Inter, sans-serif",
        lineHeight: "1.5em",
      },
    },
    propsSchema: {
      text: "text",
      padding: "text",
      color: "color",
      fontSize: "text",
      backgroundColor: "color",
      textAlign: "text",
      fontWeight: "text",
      fontFamily: "text",
      lineHeight: "text",
    },
    isContainer: false,
    icon: "✏️",
  },
  Button: {
    component: ButtonWidget,
    name: "Button",
    defaultProps: {
      desktop: {
        label: "Click Me",
        href: "#",
        padding: "12px 24px",
        color: "#ffffff",
        fontSize: "16px",
        backgroundColor: "#3b82f6",
        borderRadius: "8px",
        fontWeight: "700",
        fontFamily: "Inter, sans-serif",
      },
    },
    propsSchema: {
      label: "text",
      href: "text",
      padding: "text",
      color: "color",
      fontSize: "text",
      backgroundColor: "color",
      borderRadius: "text",
      fontWeight: "text",
      fontFamily: "text",
    },
    isContainer: false,
    icon: "🔘",
  },
};
