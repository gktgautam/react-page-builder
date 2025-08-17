"use client"; 
import { useEditorStore } from "../lib/store";
import { Breakpoint } from "@schema/core";


export function ViewportSwitcher() {
const viewport = useEditorStore((s) => s.activeBreakpoint);
  const setViewport = useEditorStore((s) => s.setActiveBreakpoint);
  const options: Breakpoint[] = [
    "desktop",
    "tablet",
    "mobile"
  ];
  return (
    <div className="flex space-x-2 mb-4">
      {options.map((v) => (
        <button
          key={v}
          className={`px-2 py-1 border rounded ${
            viewport === v ? "bg-gray-200" : ""
          }`}
          onClick={() => setViewport(v)}
        >
          {v.charAt(0).toUpperCase() + v.slice(1)}
        </button>
      ))}
    </div>
  );
}

