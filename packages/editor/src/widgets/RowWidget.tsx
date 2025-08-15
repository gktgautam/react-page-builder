"use client";
import * as React from "react";

interface RowWidgetProps {
  id: string;
  children?: React.ReactNode;
  gap?: string;
}

export default function RowWidget({ id, children, gap }: RowWidgetProps) {
  return (
    <div
      data-node-id={id}
      data-node-type="Row"
      style={{ display: "grid", gridTemplateColumns: "repeat(12,minmax(0,1fr))", gap }}
    >
      {children}
    </div>
  );
}

