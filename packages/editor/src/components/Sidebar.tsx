"use client";
import { nanoid } from "nanoid";
import { widgetRegistry } from "../lib/widgetRegistry";
import { useEditorStore } from "../lib/store";
import { TemplateGallery } from "./TemplateGallery";
import { Panel, PanelHeader } from "@ui/core";

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

export function Sidebar() {
  const addChild = useEditorStore((s) => s.addChild);
  const selectedId = useEditorStore((s) => s.selectedId);
  const page = useEditorStore((s) => s.page);

  return (
    <Panel side="left" className="p-3 space-y-3">
      <div>
        <PanelHeader className="mb-2">Widgets</PanelHeader>
        <div className="space-y-2">
          {Object.entries(widgetRegistry).map(([type, meta]) => (
            <button
              key={type}
              className="w-full text-left px-2 py-1 border rounded hover:bg-gray-100"
              onClick={() => {
                const selectedNode = findNode(page, selectedId);
                const container =
                  selectedNode && widgetRegistry[selectedNode.type]?.isContainer
                    ? selectedNode
                    : page; // root
                addChild(
                  container.id,
                  {
                    id: nanoid(),
                    type,
                    props: meta.defaultProps,
                    children: meta.isContainer ? [] : undefined
                  } as any,
                  (container.children?.length || 0)
                );
              }}
            >
              {meta.icon} {meta.name}
            </button>
          ))}
        </div>
      </div>
      <TemplateGallery />
      <div className="pt-2 border-t">
        <SaveLoadButtons />
      </div>
    </Panel>
  );
}

function SaveLoadButtons() {
  const page = useEditorStore((s) => s.page);
  const setPage = useEditorStore((s) => s.setPage);
  return (
    <div className="space-x-2">
      <button
        className="px-3 py-1 border rounded"
        onClick={async () => {
          await fetch("/api/pages", { method: "POST", body: JSON.stringify(page) });
          alert("Saved!");
        }}
      >
        Save
      </button>
      <button
        className="px-3 py-1 border rounded"
        onClick={async () => {
          const res = await fetch("/api/pages");
          const json = await res.json();
          setPage(json);
        }}
      >
        Load
      </button>
      <button
        className="px-3 py-1 border rounded"
        onClick={async () => {
          const res = await fetch("/api/publish", { method: "POST", body: JSON.stringify(page) });
          const html = await res.text();
          const w = window.open("", "_blank");
          if (w) { w.document.write(html); w.document.close(); }
        }}
      >
        Publish
      </button>
    </div>
  );
}
