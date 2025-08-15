// packages/editor/src/components/StyleEditor.tsx
// Drop this into your Property Panel "Style" section.
// USAGE: <StyleEditor value={node.props} onChange={(next)=>updateProps(node.id, next)} activeBreakpoint={activeBreakpoint} />

"use client";
import React from "react";
import { baseStyleKeys, BaseStyle } from "@schema/styles";
import { Breakpoint } from "../utils/style";

type Props = {
  value: any; // full responsive props object for the node
  onChange: (next: any) => void;
  activeBreakpoint: Breakpoint;
};

export default function StyleEditor({ value, onChange, activeBreakpoint }: Props) {
  const style: BaseStyle = {
    ...(value?.desktop?.style || {}),
    ...(value?.[activeBreakpoint]?.style || {}),
  };

  function update(key: keyof BaseStyle, val: string) {
    const next = structuredClone(value || {});
    next[activeBreakpoint] = next[activeBreakpoint] || {};
    next[activeBreakpoint].style = { ...(next[activeBreakpoint].style || {}), [key]: val };
    onChange(next);
  }

  return (
    <div className="flex flex-col gap-2">
      {baseStyleKeys.map((k) => (
        <label key={k} className="flex items-center justify-between gap-2">
          <span className="text-sm text-neutral-600" style={{minWidth:180}}>{k}</span>
          <input
            className="border rounded px-2 py-1 w-full"
            value={(style[k] as string) || ""}
            onChange={(e) => update(k, e.target.value)}
            placeholder="e.g. 16px / #222 / 1 / flex / center"
          />
        </label>
      ))}
    </div>
  );
}
