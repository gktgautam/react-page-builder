"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Button = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const Button = ({ variant = "primary", className = "", ...props }) => {
    const base = "px-3 py-2 rounded border";
    const styles = variant === "primary"
        ? "bg-blue-600 text-white border-blue-700"
        : "bg-white text-gray-900 border-gray-300";
    return (0, jsx_runtime_1.jsx)("button", { className: `${base} ${styles} ${className}`, ...props });
};
exports.Button = Button;
