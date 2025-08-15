"use client";
import { useEffect, useState } from "react";
import { widgetRegistry } from "@editor/lib/widgetRegistry";
import { resolveProps } from "@editor/lib/resolveProps";
import type { TPageNode } from "@schema/core";

function RenderNode({ node }: { node: TPageNode }) {
  if (node.type === "Page") {
    return (
      <div>
        {node.children?.map((child) => (
          <RenderNode key={child.id} node={child} />
        ))}
      </div>
    );
  }
  const meta = widgetRegistry[node.type];
  if (!meta) return null;
  const Comp = meta.component as any;
  const mergedProps = resolveProps(node as any, "desktop");
  return (
    <Comp id={node.id} {...mergedProps}>
      {meta.isContainer &&
        node.children?.map((child) => (
          <RenderNode key={child.id} node={child} />
        ))}
    </Comp>
  );
}

export default function PreviewPage() {
  const [page, setPage] = useState<TPageNode | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("saved-page");
    if (saved) {
      try {
        setPage(JSON.parse(saved));
      } catch {
        // ignore
      }
    }
  }, []);

  if (!page) {
    return <main className="p-6">No saved page</main>;
  }

  return (
    <main className="p-6">
      <RenderNode node={page} />
    </main>
  );
}
