"use client";
import * as React from "react";
import type { CSSProperties } from "react";

export function Spacer({
  height = "24px",
  style
}: {
  height?: string;
  style?: CSSProperties;
}) {
  return <div style={{ height, ...style }} />;
}
