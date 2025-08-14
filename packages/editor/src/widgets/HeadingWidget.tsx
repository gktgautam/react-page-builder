"use client";
import ContentEditable from "react-contenteditable";
import { useEditorStore } from "../lib/store";

interface HeadingWidgetProps { id: string; text: string; }
export default function HeadingWidget({ id, text }: HeadingWidgetProps) {
  const updateProps = useEditorStore((s) => s.updateProps);
  return (
    <ContentEditable
      html={text}
      onChange={(e) => updateProps(id, { text: e.currentTarget.innerHTML })}
      tagName="h1"
      className="text-3xl font-bold"
    />
  );
}
