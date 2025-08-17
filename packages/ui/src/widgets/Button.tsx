"use client";
import * as React from "react";
import type { CSSProperties } from "react";

export function Button({
  label = "Click me",
  href,
  newTab,
  style
}: {
  label?: string;
  href?: string;
  newTab?: boolean;
  style?: CSSProperties;
}) {
  if (href) {
    return (
      <a href={href} target={newTab ? "_blank" : undefined} rel={newTab ? "noreferrer" : undefined} style={style}>
        {label}
      </a>
    );
  }
  return <button style={style}>{label}</button>;
}
