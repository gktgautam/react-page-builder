import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
export function Editor() {
    return (_jsxs("div", { style: { display: "grid", gridTemplateColumns: "240px 1fr 260px", height: "100vh" }, children: [_jsx("aside", { style: { borderRight: "1px solid #eee", padding: 12 }, children: "Sidebar (widgets)" }), _jsx("main", { style: { padding: 16, background: "#f7f7f7" }, children: _jsx("div", { style: { background: "white", minHeight: 400, border: "1px dashed #ccc", padding: 20 }, children: "Canvas \u2014 hook up your real editor here" }) }), _jsx("aside", { style: { borderLeft: "1px solid #eee", padding: 12 }, children: "Layers Panel" })] }));
}
