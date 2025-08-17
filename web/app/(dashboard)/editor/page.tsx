"use client";

import dynamic from "next/dynamic";

// lazy load the editor to avoid SSR
const EditorLayout = dynamic(() => import("@editor/core").then(m => m.EditorLayout), { ssr:false });


export default function Page() {
  return <EditorLayout />;
}
