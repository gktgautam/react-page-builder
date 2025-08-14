"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Sidebar } from "../components/Sidebar";
import { EditorCanvas } from "../components/EditorCanvas";
import { LayersPanel } from "../components/LayersPanel";
export function Editor() {
    return (_jsxs("div", { className: "grid grid-cols-[16rem_1fr_16rem] h-screen", children: [_jsx(Sidebar, {}), _jsx(EditorCanvas, {}), _jsx(LayersPanel, {})] }));
}
