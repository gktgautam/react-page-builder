"use client";
import { useEditorStore } from "../lib/store";

export function ViewportSwitcher() {
  const viewport = useEditorStore((s) => s.viewport);
  const setViewport = useEditorStore((s) => s.setViewport);
  const options: ("desktop" | "tablet" | "mobile")[] = [
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

