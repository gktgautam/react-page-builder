"use client";
import * as React from "react";
import type { CSSProperties } from "react";

export function Image({
  src = "https://via.placeholder.com/800x400?text=Image",
  alt = "",
  style
}: {
  src?: string;
  alt?: string;
  style?: CSSProperties;
}) {
  return <img src={src} alt={alt} style={style} />;
}
