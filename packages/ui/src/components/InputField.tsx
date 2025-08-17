"use client";
import * as React from "react";

export function InputField({
  label, value, onChange, placeholder, type = "text", style
}: {
  label?: string;
  value?: string | number | null;
  onChange?: (v: string) => void;
  placeholder?: string;
  type?: string;
  style?: React.CSSProperties;
}) {
  return (
    <label style={{ display: "block", marginBottom: 8, ...(style || {}) }}>
      {label && <div style={{ fontSize: 12, marginBottom: 4 }}>{label}</div>}
      <input
        type={type}
        value={value ?? ""}     
        placeholder={placeholder}
        onChange={(e) => onChange?.(e.target.value)}
        style={{ width: "100%", padding: 8 }}
      />
    </label>
  );
}
