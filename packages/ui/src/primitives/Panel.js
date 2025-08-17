"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Panel = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const Panel = ({ side, className = "", ...props }) => {
    const border = side === "left" ? "border-r" : side === "right" ? "border-l" : "border";
    return (0, jsx_runtime_1.jsx)("aside", { className: `w-64 bg-white ${border} ${className}`, ...props });
};
exports.Panel = Panel;
