"use client";
import * as React from "react";

export function Panel({ children, style }: React.PropsWithChildren<{ style?: React.CSSProperties }>) {
  return <div style={{ border: "1px solid #e5e7eb", borderRadius: 8, background: "#fff", ...style }}>{children}</div>;
}

export function PanelHeader({ children, style }: React.PropsWithChildren<{ style?: React.CSSProperties }>) {
  return <div style={{ padding: "8px 10px", borderBottom: "1px solid #e5e7eb", fontWeight: 600, ...style }}>{children}</div>;
}

export function IconButton({
  title, onClick, children, style
}: React.PropsWithChildren<{ title?: string; onClick?: () => void; style?: React.CSSProperties }>) {
  return (
    <button
      title={title}
      onClick={onClick}
      style={{
        border: "1px solid #e5e7eb", borderRadius: 6, padding: "4px 8px",
        background: "#fff", cursor: "pointer", ...style
      }}
    >
      {children}
    </button>
  );
}
