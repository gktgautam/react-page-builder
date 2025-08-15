import { z } from "zod";

/** Supported responsive breakpoints */
export type Breakpoint = "desktop" | "tablet" | "mobile";

/** Visual layout styles for a section */
export type SectionStyle = "grid" | "fullWidth";

export const PageNode = z.lazy((): z.ZodTypeAny =>
  z.object({
    id: z.string(),
    type: z.string(),
    props: z.record(z.any()).default({}),
    children: z.array(PageNode).optional()
  })
);

export const PageSchema = PageNode;
export type TPageNode = z.infer<typeof PageNode>;
