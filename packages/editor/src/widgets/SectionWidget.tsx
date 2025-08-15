"use client";
import * as React from "react";

interface SectionWidgetProps {
  id?: string;
  children?: React.ReactNode;
  padding?: string;
  backgroundColor?: string;
}

export default function SectionWidget({
  children,
  padding,
  backgroundColor
}: SectionWidgetProps) {
  return (
    <section className="border min-h-[48px]" style={{ padding, backgroundColor }}>
      {children}
    </section>
  );
}
