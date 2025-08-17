// v0: no "style" field on nodes yet
export type NodeV0 = {
  id: string;
  type: string;
  props?: Record<string, any>;
  children?: NodeV0[];
};

export type PageDocumentV0 = {
  version: 0;
  title?: string;
  tree: NodeV0;
};
