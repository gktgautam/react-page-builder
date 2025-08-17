"use client";
import { useEditorStore } from "../../lib/store";
import type { Breakpoint } from "@schema/core";

export function BreakpointSwitcher() {
  const bp = useEditorStore((s) => s.activeBreakpoint);
  const set = useEditorStore((s) => s.setActiveBreakpoint);
  const Button = ({ v }: { v: Breakpoint }) => (
    <button
      className={`px-2 py-1 border rounded mr-2 ${bp === v ? "bg-blue-600 text-white" : ""}`}
      onClick={() => set(v)}
    >
      {v}
    </button>
  );
  return (
    <div className="mb-3">
      <Button v="desktop" />
      <Button v="tablet" />
      <Button v="mobile" />
    </div>
  );
}
