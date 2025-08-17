"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrateV0ToV1 = migrateV0ToV1;
function upgradeNode(n) {
    return {
        id: n.id,
        type: n.type,
        props: n.props ?? {},
        style: {}, // new in v1
        children: (n.children ?? []).map(upgradeNode),
    };
}
function migrateV0ToV1(doc) {
    return {
        version: 1,
        title: doc.title ?? "Untitled",
        tree: upgradeNode(doc.tree),
    };
}
