"use client";
import * as React from "react";

interface RowWidgetProps {
  id?: string;
  children?: React.ReactNode;
  gap?: string;
}

export default function RowWidget({ children, gap }: RowWidgetProps) {
  return (
    <div className="flex" style={{ gap }}>
      {children}
    </div>
  );
}

