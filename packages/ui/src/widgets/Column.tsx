"use client";
import * as React from "react";
import type { CSSProperties } from "react";

export function Column({
  style,
  children
}: {
  style?: CSSProperties;
  children?: React.ReactNode;
}) {
  return <div style={style}>{children}</div>;
}
