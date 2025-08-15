"use client";
import * as React from "react";

interface SectionWidgetProps {
  id?: string;
  children?: React.ReactNode;
  padding?: string;
  backgroundColor?: string;
  layout?: string;
}

export default function SectionWidget({
  children,
  padding,
  backgroundColor,
  layout
}: SectionWidgetProps) {
  const content =
    layout === "contained" ? (
      <div className="max-w-[1200px] mx-auto">{children}</div>
    ) : (
      children
    );
  return (
    <section className="border min-h-[48px]" style={{ padding, backgroundColor }}>
      {content}
    </section>
  );
}
