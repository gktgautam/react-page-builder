"use client";
import { useEditorStore, type Breakpoint } from "../lib/store";

interface ButtonWidgetProps {
  id: string;
  label: string;
  href: string;
  padding?: string | Partial<Record<Breakpoint, string>>;
  color?: string | Partial<Record<Breakpoint, string>>;
  fontSize?: string | Partial<Record<Breakpoint, string>>;
  backgroundColor?: string | Partial<Record<Breakpoint, string>>;
  borderRadius?: string | Partial<Record<Breakpoint, string>>;
  fontWeight?: string | Partial<Record<Breakpoint, string>>;
  fontFamily?: string | Partial<Record<Breakpoint, string>>;
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
  const activeBreakpoint = useEditorStore((s) => s.activeBreakpoint);

  const resolve = (
    prop?: string | Partial<Record<Breakpoint, string>>
  ): string | undefined =>
    prop && typeof prop === "object" ? prop[activeBreakpoint] : prop;
  return (
    <a
      href={href}
      onClick={(e) => e.preventDefault()}
      className="inline-block"
      style={{
        padding: resolve(padding),
        color: resolve(color),
        fontSize: resolve(fontSize),
        backgroundColor: resolve(backgroundColor),
        borderRadius: resolve(borderRadius),
        fontWeight: resolve(fontWeight),
        fontFamily: resolve(fontFamily)
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
