"use client";
import { useEditorStore } from "../lib/store";
import { nanoid } from "nanoid";

export function TemplateGallery() {
  const setPage = useEditorStore((s) => s.setPage);

  const templates = [
    {
      name: "Hero + CTA",
      json: {
        id: "page-root",
        type: "Page",
        props: {},
        children: [
          {
            id: nanoid(),
            type: "Section",
            props: {},
            children: [
              { id: nanoid(), type: "Heading", props: { text: "Welcome to My Site" } },
              { id: nanoid(), type: "Text", props: { text: "Build pages visually." } },
              { id: nanoid(), type: "Button", props: { label: "Get Started", href: "#" } }
            ]
          }
        ]
      }
    },
    {
      name: "Simple Text",
      json: {
        id: "page-root",
        type: "Page",
        props: {},
        children: [
          { id: nanoid(), type: "Section", props: {}, children: [
            { id: nanoid(), type: "Text", props: { text: "Hello world" } }
          ]}
        ]
      }
    }
  ];

  return (
    <div className="space-y-1">
      <h4 className="font-semibold mb-1">Templates</h4>
      {templates.map((t) => (
        <button
          key={t.name}
          className="w-full text-left px-2 py-1 border rounded hover:bg-gray-100"
          onClick={() => setPage(t.json as any)}
        >
          {t.name}
        </button>
      ))}
    </div>
  );
}
