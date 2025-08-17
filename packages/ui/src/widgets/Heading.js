"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Heading = Heading;
const jsx_runtime_1 = require("react/jsx-runtime");
function Heading({ level = 2, text = "Heading", style }) {
    const Tag = `h${Math.min(Math.max(level ?? 2, 1), 6)}`;
    return (0, jsx_runtime_1.jsx)(Tag, { style: style, children: text });
}
