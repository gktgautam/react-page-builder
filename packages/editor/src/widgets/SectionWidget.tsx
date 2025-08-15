"use client";
import * as React from "react";
import { useEditorStore, type Breakpoint } from "../lib/store";

interface SectionWidgetProps {
  id?: string;
  children?: React.ReactNode;
  padding?: string | Partial<Record<Breakpoint, string>>;
  backgroundColor?: string | Partial<Record<Breakpoint, string>>;
}

export default function SectionWidget({
  children,
  padding,
  backgroundColor
}: SectionWidgetProps) {
  const activeBreakpoint = useEditorStore((s) => s.activeBreakpoint);

  const resolve = (
    prop?: string | Partial<Record<Breakpoint, string>>
  ): string | undefined =>
    prop && typeof prop === "object" ? prop[activeBreakpoint] : prop;

  return (
    <section
      className="border min-h-[48px]"
      style={{ padding: resolve(padding), backgroundColor: resolve(backgroundColor) }}
    >
      {children}
    </section>
  );
}
