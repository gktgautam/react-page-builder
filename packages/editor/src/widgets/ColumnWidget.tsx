"use client";
import * as React from "react";

interface ColumnWidgetProps {
  id?: string;
  children?: React.ReactNode;
  width?: string;
}

export default function ColumnWidget({ children, width }: ColumnWidgetProps) {
  return (
    <div className="min-h-[24px]" style={{ width }}>
      {children}
    </div>
  );
}

