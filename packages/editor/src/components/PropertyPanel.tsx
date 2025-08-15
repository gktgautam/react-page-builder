"use client";
import { useMemo, type ChangeEvent } from "react";
import { useEditorStore } from "../lib/store";
import { Panel, PanelHeader, InputField } from "@ui/core";
import { findNode } from "../lib/findNode";
import { widgetRegistry } from "../lib/widgetRegistry";

export function PropertyPanel() {
  const page = useEditorStore((s) => s.page);
  const selectedId = useEditorStore((s) => s.selectedId);
  const updateProps = useEditorStore((s) => s.updateProps);

  const selectedNode = useMemo(() => findNode(page, selectedId), [page, selectedId]);

  if (!selectedNode) {
    return (
      <Panel side="right" className="p-3 overflow-auto">
        <PanelHeader className="mb-2">Properties</PanelHeader>
        <p className="text-sm text-gray-500">Select a node to edit its props.</p>
      </Panel>
    );
  }

  const props = selectedNode.props || {};
  const schema = widgetRegistry[selectedNode.type]?.propsSchema || {};
  const keys = Object.keys(schema);

  return (
    <Panel side="right" className="p-3 overflow-auto">
      <PanelHeader className="mb-2">Properties</PanelHeader>
      {keys.length === 0 && (
        <p className="text-sm text-gray-500">No props available.</p>
      )}
      {keys.map((key) => (
        <div key={key} className="mb-2">
          <label className="block text-sm font-medium mb-1" htmlFor={`prop-${key}`}>
            {key}
          </label>
          <InputField
            id={`prop-${key}`}
            type={schema[key]}
            value={(props as any)[key] ?? ""}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              updateProps(selectedNode.id, { [key]: e.target.value })
            }
          />
        </div>
      ))}
    </Panel>
  );
}
