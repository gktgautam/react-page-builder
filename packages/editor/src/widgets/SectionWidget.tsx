"use client";
import * as React from "react";

interface SectionWidgetProps {
  id: string;
  children?: React.ReactNode;
  padding?: string;
  backgroundColor?: string;
  layoutStyle?: string;
}

export default function SectionWidget({
  id,
  children,
  padding,
  backgroundColor,
  layoutStyle = "contained",
}: SectionWidgetProps) {
  const innerStyle: React.CSSProperties = { padding };
  const sectionStyle: React.CSSProperties = { background: backgroundColor };

  const inner = (
    <div
      className="section__inner"
      style={{ ...innerStyle, maxWidth: layoutStyle === "contained" ? "1200px" : "none", margin: "0 auto" }}
    >
      {children}
    </div>
  );

  return (
    <section
      data-node-id={id}
      data-node-type="Section"
      data-layout={layoutStyle}
      className="min-h-[48px] border"
      style={sectionStyle}
    >
      {inner}
    </section>
  );
}
