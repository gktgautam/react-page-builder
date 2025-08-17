"use client";
import * as React from "react";
import type { CSSProperties } from "react";

export function Divider({ style }: { style?: CSSProperties }) {
  return <hr style={style} />;
}
