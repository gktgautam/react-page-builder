// packages/schema/src/migrations/v0_to_v1.ts
import type { PageDocumentV0, NodeV0 } from "../types.v0";
import type { PageDocument, Node } from "../types";

function upgradeNode(n: NodeV0): Node {
  return {
    id: n.id,
    type: n.type,
    props: n.props ?? {},
    style: {},                    // new in v1
    children: (n.children ?? []).map(upgradeNode),
  };
}

export function migrateV0ToV1(doc: PageDocumentV0): PageDocument {
  return {
    version: 1,
    title: doc.title ?? "Untitled",
    tree: upgradeNode(doc.tree),
  };
}
