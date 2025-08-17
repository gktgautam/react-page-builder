"use client";
import * as React from "react";
import { nanoid } from "nanoid";
import type { Node } from "@schema/core";
import { Image as UiImage } from "@ui/core";
import { registerWidget } from "./registry";

const TYPE = "image";

export function registerImageWidget() {
  registerWidget({
    type: TYPE,
    title: "Image",
    category: "Media",
    fields: [
      { kind: "url",   label: "Source URL", path: "props.src", placeholder: "https://..." },
      { kind: "text",  label: "Alt Text",   path: "props.alt", placeholder: "Describe the image" },
      { kind: "text",  label: "Width",      path: "style.width",  placeholder: "e.g. 100% or 320px" },
      { kind: "text",  label: "Height",     path: "style.height", placeholder: "e.g. auto or 200px" }
    ],
    render: (node: Node) => {
      const { src = "https://via.placeholder.com/800x400?text=Image", alt = "" } = node.props ?? {};
      return <UiImage src={src} alt={alt} style={node.style as React.CSSProperties} />;
    },
    defaultNode: () => ({
      id: nanoid(),
      type: TYPE,
      props: { src: "https://via.placeholder.com/800x400?text=Image", alt: "" },
      style: { display: "block", maxWidth: "100%", height: "auto" },
      children: []
    })
  });
}
