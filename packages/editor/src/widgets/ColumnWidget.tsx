"use client";
import * as React from "react";

interface ColumnWidgetProps {
  id: string;
  children?: React.ReactNode;
  span?: number;
}

export default function ColumnWidget({ id, children, span = 12 }: ColumnWidgetProps) {
  return (
    <div
      data-node-id={id}
      data-node-type="Column"
      style={{ minHeight: "24px", gridColumn: `span ${span} / span ${span}` }}
    >
      {children}
    </div>
  );
}

