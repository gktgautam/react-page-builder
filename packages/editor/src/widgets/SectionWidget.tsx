"use client";
import * as React from "react";
import type { SectionStyle } from "@schema/core";

interface SectionWidgetProps {
  id?: string;
  children?: React.ReactNode;
  padding?: string;
  backgroundColor?: string;
  layout?: SectionStyle;
}

export default function SectionWidget({
  children,
  padding,
  backgroundColor,
  layout = "fullWidth"
}: SectionWidgetProps) {
  const layoutClass = layout === "grid" ? "grid grid-cols-2 gap-4" : "";
  return (
    <section
      className={`border min-h-[48px] ${layoutClass}`}
      style={{ padding, backgroundColor }}
    >
      {children}
    </section>
  );
}
