"use client";
import * as React from "react";
import type { CSSProperties } from "react";

export function Heading({
  level = 2,
  text = "Heading",
  style
}: {
  level?: number;
  text?: string;
  style?: CSSProperties;
}) {
  const Tag = (`h${Math.min(Math.max(level ?? 2, 1), 6)}` as unknown) as keyof JSX.IntrinsicElements;
  return <Tag style={style}>{text}</Tag>;
}
