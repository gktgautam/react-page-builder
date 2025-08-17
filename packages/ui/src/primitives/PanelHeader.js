"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PanelHeader = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const PanelHeader = ({ className = "", ...props }) => {
    return (0, jsx_runtime_1.jsx)("h3", { className: `font-bold ${className}`, ...props });
};
exports.PanelHeader = PanelHeader;
