"use client";
import { Sidebar } from "./Sidebar";
import { EditorCanvas } from "../components/EditorCanvas";
import { LayersPanel } from "../components/LayersPanel";
import { PropertyPanel } from "../components/PropertyPanel";

export function Editor() {
  return (
    <div className="grid grid-cols-[16rem_1fr_16rem_16rem] h-screen">
      <Sidebar />
      <EditorCanvas />
      <LayersPanel />
      <PropertyPanel />
    </div>
  );
}
