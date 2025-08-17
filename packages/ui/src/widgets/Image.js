"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Image = Image;
const jsx_runtime_1 = require("react/jsx-runtime");
function Image({ src = "https://via.placeholder.com/800x400?text=Image", alt = "", style }) {
    return (0, jsx_runtime_1.jsx)("img", { src: src, alt: alt, style: style });
}
