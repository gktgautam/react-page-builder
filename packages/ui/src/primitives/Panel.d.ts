import * as React from "react";
export interface PanelProps extends React.HTMLAttributes<HTMLElement> {
    side?: "left" | "right";
}
export declare const Panel: React.FC<PanelProps>;
