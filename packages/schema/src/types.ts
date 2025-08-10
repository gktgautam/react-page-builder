import { z } from "zod";

export const PageNode = z.lazy(() =>
  z.object({
    id: z.string(),
    type: z.string(),
    props: z.record(z.any()).default({}),
    children: z.array(PageNode).optional()
  })
);

export type TPageNode = z.infer<typeof PageNode>;
export const PageSchema = PageNode;
