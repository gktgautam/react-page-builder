"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputField = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const InputField = ({ className = "", ...props }) => {
    return (0, jsx_runtime_1.jsx)("input", { className: `w-full border rounded px-2 py-1 text-sm ${className}`, ...props });
};
exports.InputField = InputField;
