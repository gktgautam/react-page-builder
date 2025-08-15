import { z } from "zod";

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
