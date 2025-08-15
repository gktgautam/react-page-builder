"use client";
import ContentEditable from "react-contenteditable";
import { useEditorStore, type Breakpoint } from "../lib/store";

interface HeadingWidgetProps {
  id: string;
  text: string;
  padding?: string | Partial<Record<Breakpoint, string>>;
  color?: string | Partial<Record<Breakpoint, string>>;
  fontSize?: string | Partial<Record<Breakpoint, string>>;
  backgroundColor?: string | Partial<Record<Breakpoint, string>>;
  textAlign?: string | Partial<Record<Breakpoint, string>>;
  fontWeight?: string | Partial<Record<Breakpoint, string>>;
  fontFamily?: string | Partial<Record<Breakpoint, string>>;
  lineHeight?: string | Partial<Record<Breakpoint, string>>;
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
  const activeBreakpoint = useEditorStore((s) => s.activeBreakpoint);

  const resolve = (
    prop?: string | Partial<Record<Breakpoint, string>>
  ): string | undefined =>
    prop && typeof prop === "object" ? prop[activeBreakpoint] : prop;
  return (
    <ContentEditable
      html={text}
      onChange={(e: any) => updateProps(id, { text: e.currentTarget.innerHTML })}
      tagName="h1"
      className="outline-none"
      style={{
        padding: resolve(padding),
        color: resolve(color),
        fontSize: resolve(fontSize),
        backgroundColor: resolve(backgroundColor),
        textAlign: resolve(textAlign),
        fontWeight: resolve(fontWeight),
        fontFamily: resolve(fontFamily),
        lineHeight: resolve(lineHeight)
      }}
    />
  );
}
