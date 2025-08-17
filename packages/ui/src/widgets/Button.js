"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Button = Button;
const jsx_runtime_1 = require("react/jsx-runtime");
function Button({ label = "Click me", href, newTab, style }) {
    if (href) {
        return ((0, jsx_runtime_1.jsx)("a", { href: href, target: newTab ? "_blank" : undefined, rel: newTab ? "noreferrer" : undefined, style: style, children: label }));
    }
    return (0, jsx_runtime_1.jsx)("button", { style: style, children: label });
}
