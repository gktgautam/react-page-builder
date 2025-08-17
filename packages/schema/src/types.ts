// packages/schema/src/types.ts
import { z } from "zod";

export const StyleZ = z.object({
  // Elementor-style essentials
  width: z.string().optional(),          // "auto" | "100%" | "320px"
  maxWidth: z.string().optional(),
  margin: z.string().optional(),         // "12px 0 0"
  padding: z.string().optional(),
  display: z.enum(["block","flex","grid"]).optional(),
  flex: z.string().optional(),           // "0 0 auto" | "1"
  justifyContent: z.string().optional(),
  alignItems: z.string().optional(),
  gap: z.string().optional(),
  background: z.string().optional(),     // color/gradient
  border: z.string().optional(),
  borderRadius: z.string().optional(),
  boxShadow: z.string().optional(),
  color: z.string().optional(),
  fontSize: z.string().optional(),
  fontWeight: z.string().optional(),
  lineHeight: z.string().optional(),
  textAlign: z.enum(["left","center","right","justify"]).optional(),
  // responsive overrides per breakpoint
  _md: z.any().optional(),
  _lg: z.any().optional()
});

export type Style = z.infer<typeof StyleZ>;

const _NodeZ: z.ZodType<any> = z.object({
  id: z.string(),
  type: z.string(),     // "section" | "column" | "heading" | ...
  props: z.record(z.any()).default({}),
  style: StyleZ.default({}),
  children: z.array(z.lazy(() => NodeZ)).default([])
});
export const NodeZ = _NodeZ as z.ZodType<{
  id: string;
  type: string;
  props: Record<string, any>;
  style: Style;
  children: Node[];
}>;

export type Node = z.infer<typeof NodeZ>;

export const PageDocumentZ = z.object({
  version: z.literal(1),
  title: z.string().default("Untitled"),
  tree: NodeZ
});

export type PageDocument = z.infer<typeof PageDocumentZ>;
