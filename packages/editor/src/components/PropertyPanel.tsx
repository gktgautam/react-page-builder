"use client";
import * as React from "react";
import { Panel, PanelHeader, InputField } from "@ui/core";
import { useEditorStore } from "../store/createEditorStore";

export function PropertyPanel() {
  const doc = useEditorStore((s) => s.doc);
  const selectedId = useEditorStore((s) => s.selectedId);
  const update = useEditorStore((s) => s.updateByPath);

  // find selected node
  const node = React.useMemo(() => {
    if (!selectedId) return null;
    const stack = [doc.tree];
    while (stack.length) {
      const cur = stack.pop()!;
      if (cur.id === selectedId) return cur;
      (cur.children ?? []).forEach((c) => stack.push(c));
    }
    return null;
  }, [doc, selectedId]);

  return (
    <Panel style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <PanelHeader>Properties</PanelHeader>
      <div style={{ padding: 10 }}>
        {!node && <div style={{ color: "#6b7280", fontSize: 12 }}>No selection</div>}
        {node && (
          <>
            <InputField
              label="Title"
              value={(doc.title ?? "") as string}
              onChange={(v) => update(doc.tree.id, "props._docTitle", v)}  // example doc-level prop
            />
            <InputField
              label="CSS class"
              value={(node.props?._className ?? "") as string}
              onChange={(v) => update(node.id, "props._className", v)}
            />
            <InputField
              label="HTML id"
              value={(node.props?._id ?? "") as string}
              onChange={(v) => update(node.id, "props._id", v)}
            />
          </>
        )}
      </div>
    </Panel>
  );
}
