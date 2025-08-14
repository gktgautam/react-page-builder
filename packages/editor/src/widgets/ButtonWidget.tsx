"use client";
import { useEditorStore } from "../lib/store";

interface ButtonWidgetProps { id: string; label: string; href: string; }
export default function ButtonWidget({ id, label, href }: ButtonWidgetProps) {
  const updateProps = useEditorStore((s) => s.updateProps);
  return (
    <a
      href={href}
      onClick={(e) => e.preventDefault()}
      className="inline-block px-4 py-2 bg-blue-600 text-white rounded"
      onDoubleClick={() => {
        const next = prompt("Button label:", label);
        if (next !== null) updateProps(id, { label: next });
      }}
    >
      {label}
    </a>
  );
}
