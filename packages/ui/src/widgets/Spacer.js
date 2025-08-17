"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Spacer = Spacer;
const jsx_runtime_1 = require("react/jsx-runtime");
function Spacer({ height = "24px", style }) {
    return (0, jsx_runtime_1.jsx)("div", { style: { height, ...style } });
}
