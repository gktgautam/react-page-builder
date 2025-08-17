"use client";
import * as React from "react";
import type { CSSProperties } from "react";

export function Section({
  style,
  children
}: {
  style?: CSSProperties;
  children?: React.ReactNode;
}) {
  return <section style={style}>{children}</section>;
}
