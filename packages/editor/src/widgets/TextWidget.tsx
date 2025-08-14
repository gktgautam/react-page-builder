"use client";
import ContentEditable from "react-contenteditable";
import { useEditorStore } from "../lib/store";

interface TextWidgetProps { id: string; text: string; }
export default function TextWidget({ id, text }: TextWidgetProps) {
  const updateProps = useEditorStore((s) => s.updateProps);
  return (
    <ContentEditable
      html={text}
      onChange={(e) => updateProps(id, { text: e.currentTarget.innerHTML })}
      tagName="p"
      className="text-base"
    />
  );
}
