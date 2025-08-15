"use client";
import { useEditorStore } from "../lib/store";

interface ButtonWidgetProps {
  id: string;
  label: string;
  href: string;
  padding?: string;
  color?: string;
  fontSize?: string;
  backgroundColor?: string;
  borderRadius?: string;
  fontWeight?: string;
  fontFamily?: string;
}

export default function ButtonWidget({
  id,
  label,
  href,
  padding,
  color,
  fontSize,
  backgroundColor,
  borderRadius,
  fontWeight,
  fontFamily
}: ButtonWidgetProps) {
  const updateProps = useEditorStore((state: any) => state.updateProps);
  return (
    <a
      href={href}
      onClick={(e) => e.preventDefault()}
      className="inline-block"
      style={{
        padding,
        color,
        fontSize,
        backgroundColor,
        borderRadius,
        fontWeight,
        fontFamily
      }}
      onDoubleClick={() => {
        const next = prompt("Button label:", label);
        if (next !== null) updateProps(id, { label: next });
      }}
    >
      {label}
    </a>
  );
}
