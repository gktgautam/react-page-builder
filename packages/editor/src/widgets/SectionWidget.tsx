"use client";
import * as React from "react";

interface SectionWidgetProps {
  id?: string;
  children?: React.ReactNode;
}
export default function SectionWidget({ children }: SectionWidgetProps) {
  return <section className="p-4 bg-gray-100 border min-h-[48px]">{children}</section>;
}
