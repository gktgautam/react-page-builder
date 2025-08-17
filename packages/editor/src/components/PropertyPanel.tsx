"use client";
import { useMemo, type ChangeEvent } from "react";
import { useEditorStore } from "../lib/store";
import { Panel, PanelHeader, InputField } from "@ui/core";
import { findNode } from "../lib/findNode";
import { widgetRegistry } from "../lib/widgetRegistry";
import { resolveProps } from "../lib/resolveProps";

// ✅ already correct
import StyleEditor from "./core/StyleEditor";

export function PropertyPanel() {
  const page = useEditorStore((s) => s.page);
  const selectedId = useEditorStore((s) => s.selectedId);
  const updateProps = useEditorStore((s) => s.updateProps);
  const viewport = useEditorStore((s) => s.activeBreakpoint); // "desktop" | "tablet" | "mobile"

  const selectedNode = useMemo(() => findNode(page, selectedId), [page, selectedId]);

  if (!selectedNode) {
    return (
      <Panel side="right" className="p-3 overflow-auto">
        <PanelHeader className="mb-2">Properties</PanelHeader>
        <p className="text-sm text-gray-500">Select a node to edit its props.</p>
      </Panel>
    );
  }

  const props = resolveProps(selectedNode as any, viewport);
  const baseProps = (selectedNode.props as any).desktop || {};
  const schema = widgetRegistry[selectedNode.type]?.propsSchema || {};
  const keys = Object.keys(schema);

  // Adapter so StyleEditor can write the whole responsive props object.
  // Most stores deep-merge; if yours is shallow, adjust to deep-merge.
  const onStyleChange = (next: any) => {
    // next is the full responsive props object (desktop/tablet/mobile)
    // We pass it as-is to be merged into the node's props.
    updateProps(selectedNode.id, next);
  };

  return (
    <Panel side="right" className="p-3 overflow-auto">
      <PanelHeader className="mb-2">Properties</PanelHeader>

      {keys.length === 0 && (
        <p className="text-sm text-gray-500">No props available.</p>
      )}

      {/* Content fields (from your widget schema) */}
      {keys.map((key) => (
        <div key={key} className="mb-2">
          <label className="block text-sm font-medium mb-1" htmlFor={`prop-${key}`}>
            {key}
          </label>
          <InputField
            id={`prop-${key}`}
            type={schema[key]}
            value={(props as any)[key] ?? (baseProps as any)[key] ?? ""}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              updateProps(selectedNode.id, { [key]: e.target.value })
            }
          />
        </div>
      ))}

      {/* ---- Style section ---- */}
      <div className="my-3 border-t border-gray-200" />
      <PanelHeader className="mb-2">Style</PanelHeader>
      <StyleEditor
        value={selectedNode.props}
        onChange={(next) => updateProps(selectedNode.id, next)}
        activeBreakpoint={viewport}
      />
    </Panel>
  );
}
