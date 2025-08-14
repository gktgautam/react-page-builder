"use client";
import { useEditorStore } from "../lib/store";
import { widgetRegistry } from "../lib/widgetRegistry";

function RenderNode({ node }: { node: any }) {
  const hoveredId = useEditorStore((s) => s.hoveredId);
  const selectedId = useEditorStore((s) => s.selectedId);
  const selectNode = useEditorStore((s) => s.selectNode);

  const meta = widgetRegistry[node.type];
  if (!meta) return null;
  const Comp = meta.component;

  const border =
    node.id === selectedId
      ? "border-2 border-blue-500"
      : node.id === hoveredId
      ? "border border-orange-400"
      : "border border-transparent";

  return (
    <div
      className={`${border} relative`}
      onClick={(e) => { e.stopPropagation(); selectNode(node.id); }}
    >
      <Comp id={node.id} {...node.props}>
        {meta.isContainer && node.children?.map((child: any) => (
          <RenderNode key={child.id} node={child} />
        ))}
      </Comp>
    </div>
  );
}

export function EditorCanvas() {
  const page = useEditorStore((s) => s.page);
  return (
    <main className="flex-1 overflow-auto bg-gray-50 p-6">
      <div className="bg-white border rounded p-6 min-h-[70vh]">
        <RenderNode node={page} />
      </div>
    </main>
  );
}
