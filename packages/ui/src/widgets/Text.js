"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Text = Text;
const jsx_runtime_1 = require("react/jsx-runtime");
function Text({ text = "Lorem ipsum", style }) {
    return (0, jsx_runtime_1.jsx)("p", { style: style, children: text });
}
