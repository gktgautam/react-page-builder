"use client";
import ContentEditable from "react-contenteditable";
import { useEditorStore } from "../lib/store";
import DOMPurify from "dompurify";

interface HeadingWidgetProps {
  id: string;
  text: string;
  padding?: string;
  color?: string;
  fontSize?: string;
  backgroundColor?: string;
  textAlign?: string;
  fontWeight?: string;
  fontFamily?: string;
  lineHeight?: string;
}

export default function HeadingWidget({
  id,
  text,
  padding,
  color,
  fontSize,
  backgroundColor,
  textAlign,
  fontWeight,
  fontFamily,
  lineHeight
}: HeadingWidgetProps) {
  const updateProps = useEditorStore((state: any) => state.updateProps);
  return (
    <ContentEditable
      html={text}
      onChange={(e: any) =>
        updateProps(id, {
          text: DOMPurify.sanitize(e.currentTarget.innerHTML),
        })
      }
      tagName="h1"
      className="outline-none"
      style={{
        padding,
        color,
        fontSize,
        backgroundColor,
        textAlign,
        fontWeight,
        fontFamily,
        lineHeight
      }}
      data-node-id={id}
      data-node-type="Heading"
    />
  );
}
