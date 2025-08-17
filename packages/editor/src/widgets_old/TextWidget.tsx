"use client";
import ContentEditable from "react-contenteditable";
import { useEditorStore } from "../lib/store";
import DOMPurify from "dompurify";

interface TextWidgetProps {
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

export default function TextWidget({
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
}: TextWidgetProps) {
  const updateProps = useEditorStore((state: any) => state.updateProps);
  return (
    <ContentEditable
      html={text}
      onChange={(e: any) =>
        updateProps(id, { text: DOMPurify.sanitize(e.currentTarget.innerHTML) })
      }
      tagName="p"
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
      data-node-type="Text"
    />
  );
}
