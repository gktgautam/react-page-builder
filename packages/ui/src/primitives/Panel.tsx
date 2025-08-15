import * as React from "react";

export interface PanelProps extends React.HTMLAttributes<HTMLElement> {
  side?: "left" | "right";
}

export const Panel: React.FC<PanelProps> = ({ side, className = "", ...props }) => {
  const border = side === "left" ? "border-r" : side === "right" ? "border-l" : "border";
  return <aside className={`w-64 bg-white ${border} ${className}`} {...props} />;
};

