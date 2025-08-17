"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IconButton = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const IconButton = ({ className = "", ...props }) => {
    return ((0, jsx_runtime_1.jsx)("button", { className: `w-4 h-4 border rounded bg-gray-50 inline-flex items-center justify-center text-xs ${className}`, ...props }));
};
exports.IconButton = IconButton;
