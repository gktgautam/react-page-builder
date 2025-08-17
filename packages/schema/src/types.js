"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageDocumentZ = exports.NodeZ = exports.StyleZ = void 0;
// packages/schema/src/types.ts
const zod_1 = require("zod");
exports.StyleZ = zod_1.z.object({
    // Elementor-style essentials
    width: zod_1.z.string().optional(), // "auto" | "100%" | "320px"
    maxWidth: zod_1.z.string().optional(),
    margin: zod_1.z.string().optional(), // "12px 0 0"
    padding: zod_1.z.string().optional(),
    display: zod_1.z.enum(["block", "flex", "grid"]).optional(),
    flex: zod_1.z.string().optional(), // "0 0 auto" | "1"
    justifyContent: zod_1.z.string().optional(),
    alignItems: zod_1.z.string().optional(),
    gap: zod_1.z.string().optional(),
    background: zod_1.z.string().optional(), // color/gradient
    border: zod_1.z.string().optional(),
    borderRadius: zod_1.z.string().optional(),
    boxShadow: zod_1.z.string().optional(),
    color: zod_1.z.string().optional(),
    fontSize: zod_1.z.string().optional(),
    fontWeight: zod_1.z.string().optional(),
    lineHeight: zod_1.z.string().optional(),
    textAlign: zod_1.z.enum(["left", "center", "right", "justify"]).optional(),
    // responsive overrides per breakpoint
    _md: zod_1.z.any().optional(),
    _lg: zod_1.z.any().optional()
});
const _NodeZ = zod_1.z.object({
    id: zod_1.z.string(),
    type: zod_1.z.string(), // "section" | "column" | "heading" | ...
    props: zod_1.z.record(zod_1.z.any()).default({}),
    style: exports.StyleZ.default({}),
    children: zod_1.z.array(zod_1.z.lazy(() => exports.NodeZ)).default([])
});
exports.NodeZ = _NodeZ;
exports.PageDocumentZ = zod_1.z.object({
    version: zod_1.z.literal(1),
    title: zod_1.z.string().default("Untitled"),
    tree: exports.NodeZ
});
