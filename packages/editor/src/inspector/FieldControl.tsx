"use client";
import * as React from "react";
import { useEditorStore } from "../store";
import type { Field } from "../widgets/registry";

function get(obj: any, path: string): any {
  return path.split(".").reduce((o, k) => (o ? o[k] : undefined), obj);
}

export function FieldControl({
  nodeId,
  field
}: {
  nodeId: string;
  field: Field;
}) {
  const doc = useEditorStore((s) => s.doc);
  const update = useEditorStore((s) => s.updateByPath);
  const n = React.useMemo(() => {
    // find node by walking; simple search
    const stack = [doc.tree];
    while (stack.length) {
      const cur = stack.pop()!;
      if (cur.id === nodeId) return cur;
      (cur.children ?? []).forEach((c) => stack.push(c));
    }
    return null;
  }, [doc, nodeId]);

  const value = n ? get(n, field.path) : undefined;

  const onChange = (val: any) => update(nodeId, field.path, val);

  switch (field.kind) {
    case "text":
      return (
        <label style={{ display: "block", marginBottom: 8 }}>
          <div style={{ fontSize: 12, marginBottom: 4 }}>{field.label}</div>
          <input
            type="text"
            value={value ?? ""}
            placeholder={field.placeholder}
            onChange={(e) => onChange(e.target.value)}
            style={{ width: "100%", padding: 8 }}
          />
        </label>
      );
    case "textarea":
      return (
        <label style={{ display: "block", marginBottom: 8 }}>
          <div style={{ fontSize: 12, marginBottom: 4 }}>{field.label}</div>
          <textarea
            value={value ?? ""}
            placeholder={field.placeholder}
            rows={field.rows ?? 4}
            onChange={(e) => onChange(e.target.value)}
            style={{ width: "100%", padding: 8 }}
          />
        </label>
      );
    case "number":
      return (
        <label style={{ display: "block", marginBottom: 8 }}>
          <div style={{ fontSize: 12, marginBottom: 4 }}>{field.label}</div>
          <input
            type="number"
            value={value ?? 0}
            min={field.min}
            max={field.max}
            step={field.step ?? 1}
            onChange={(e) => onChange(e.target.value === "" ? "" : Number(e.target.value))}
            style={{ width: "100%", padding: 8 }}
          />
        </label>
      );
    case "select":
      return (
        <label style={{ display: "block", marginBottom: 8 }}>
          <div style={{ fontSize: 12, marginBottom: 4 }}>{field.label}</div>
          <select
            value={value ?? (field.options[0]?.value ?? "")}
            onChange={(e) => onChange(e.target.value)}
            style={{ width: "100%", padding: 8 }}
          >
            {field.options.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </label>
      );
    case "switch":
      return (
        <label style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
          <input
            type="checkbox"
            checked={!!value}
            onChange={(e) => onChange(e.target.checked)}
          />
          <span>{field.label}</span>
        </label>
      );
    case "color":
      return (
        <label style={{ display: "block", marginBottom: 8 }}>
          <div style={{ fontSize: 12, marginBottom: 4 }}>{field.label}</div>
          <input
            type="color"
            value={typeof value === "string" && value ? value : "#000000"}
            onChange={(e) => onChange(e.target.value)}
            style={{ width: "100%", height: 36, padding: 0 }}
          />
        </label>
      );
    case "url":
      return (
        <label style={{ display: "block", marginBottom: 8 }}>
          <div style={{ fontSize: 12, marginBottom: 4 }}>{field.label}</div>
          <input
            type="url"
            value={value ?? ""}
            placeholder={field.placeholder}
            onChange={(e) => onChange(e.target.value)}
            style={{ width: "100%", padding: 8 }}
          />
        </label>
      );
    default:
      return null;
  }
}
