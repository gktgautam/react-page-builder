"use client";
import * as React from "react";

interface PageWidgetProps {
  id?: string;
  children?: React.ReactNode;
}

export default function PageWidget({ children }: PageWidgetProps) {
  return <div className="min-h-[48px]">{children}</div>;
}
