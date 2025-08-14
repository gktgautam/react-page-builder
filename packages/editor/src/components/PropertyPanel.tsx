"use client";
import { useMemo } from "react";
import { useEditorStore } from "../lib/store";

// Helper to find node by id in page tree
function findNode(node: any, id: string | null): any {
  if (!id) return null;
  if (node.id === id) return node;
  for (const child of node.children || []) {
    const found = findNode(child, id);
    if (found) return found;
  }
  return null;
}

export function PropertyPanel() {
  const page = useEditorStore((s) => s.page);
  const selectedId = useEditorStore((s) => s.selectedId);
  const updateProps = useEditorStore((s) => s.updateProps);

  const selectedNode = useMemo(() => findNode(page, selectedId), [page, selectedId]);

  if (!selectedNode) {
    return (
      <aside className="w-64 bg-white border-l p-3 overflow-auto">
        <h3 className="font-bold mb-2">Properties</h3>
        <p className="text-sm text-gray-500">Select a node to edit its props.</p>
      </aside>
    );
  }

  const props = selectedNode.props || {};
  const keys = Object.keys(props);

  return (
    <aside className="w-64 bg-white border-l p-3 overflow-auto">
      <h3 className="font-bold mb-2">Properties</h3>
      {keys.length === 0 && (
        <p className="text-sm text-gray-500">No props available.</p>
      )}
      {keys.map((key) => (
        <div key={key} className="mb-2">
          <label className="block text-sm font-medium mb-1" htmlFor={`prop-${key}`}>
            {key}
          </label>
          <input
            id={`prop-${key}`}
            className="w-full border rounded px-2 py-1 text-sm"
            value={(props as any)[key] ?? ""}
            onChange={(e) => updateProps(selectedNode.id, { [key]: e.target.value })}
          />
        </div>
      ))}
    </aside>
  );
}
