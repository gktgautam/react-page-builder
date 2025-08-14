"use client";
import { Sidebar } from "../components/Sidebar";
import { EditorCanvas } from "../components/EditorCanvas";
import { LayersPanel } from "../components/LayersPanel";

export function Editor() {
  return (
    <div className="grid grid-cols-[16rem_1fr_16rem] h-screen">
      <Sidebar />
      <EditorCanvas />
      <LayersPanel />
    </div>
  );
}
