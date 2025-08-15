import { z } from "zod";

const ResponsiveProps = z
  .object({
    mobile: z.record(z.any()).optional(),
    tablet: z.record(z.any()).optional(),
    desktop: z.record(z.any()).optional(),
  })
  .partial();

export const PageNode: z.ZodTypeAny = z.lazy(() =>
  z.object({
    id: z.string(),
    type: z.string(),
    props: z.record(z.any()).default({}),
    responsive: ResponsiveProps.optional(),
    children: z.array(PageNode).optional(),
  })
);

export type TPageNode = z.infer<typeof PageNode>;
export const PageSchema = PageNode;
