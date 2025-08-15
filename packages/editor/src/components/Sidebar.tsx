"use client";
import { nanoid } from "nanoid";
import { widgetRegistry } from "../lib/widgetRegistry";
import { useEditorStore } from "../lib/store";
import { TemplateGallery } from "./TemplateGallery";
import { Panel, PanelHeader } from "@ui/core";
import { findNode } from "../lib/findNode";

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
                    props: JSON.parse(JSON.stringify(meta.defaultProps)),
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
          try {
            const res = await fetch("/api/pages", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(page)
            });
            if (!res.ok) throw new Error("Failed to save");
            alert("Saved!");
          } catch (err) {
            alert(
              "Error saving: " +
                (err instanceof Error ? err.message : String(err))
            );
          }
        }}
      >
        Save
      </button>
      <button
        className="px-3 py-1 border rounded"
        onClick={async () => {
          try {
            const res = await fetch("/api/pages");
            if (!res.ok) throw new Error("Failed to load");
            const json = await res.json();
            setPage(json);
          } catch (err) {
            alert(
              "Error loading: " +
                (err instanceof Error ? err.message : String(err))
            );
          }
        }}
      >
        Load
      </button>
      <button
        className="px-3 py-1 border rounded"
        onClick={async () => {
          try {
            const res = await fetch("/api/publish", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(page)
            });
            if (!res.ok) throw new Error("Failed to publish");
            const html = await res.text();
            const w = window.open("", "_blank");
            if (w) {
              w.document.write(html);
              w.document.close();
            }
          } catch (err) {
            alert(
              "Error publishing: " +
                (err instanceof Error ? err.message : String(err))
            );
          }
        }}
      >
        Publish
      </button>
    </div>
  );
}
