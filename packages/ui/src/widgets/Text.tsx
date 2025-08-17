"use client";
import * as React from "react";
import type { CSSProperties } from "react";

export function Text({
  text = "Lorem ipsum",
  style
}: {
  text?: string;
  style?: CSSProperties;
}) {
  return <p style={style}>{text}</p>;
}
