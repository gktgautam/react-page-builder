"use client";
import * as React from "react";

interface ColumnWidgetProps {
  id?: string;
  children?: React.ReactNode;
}

export default function ColumnWidget({ children }: ColumnWidgetProps) {
  return <div className="border min-h-[48px] p-2">{children}</div>;
}

