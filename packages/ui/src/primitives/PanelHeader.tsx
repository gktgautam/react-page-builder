import * as React from "react";

export interface PanelHeaderProps extends React.HTMLAttributes<HTMLHeadingElement> {}

export const PanelHeader: React.FC<PanelHeaderProps> = ({ className = "", ...props }) => {
  return <h3 className={`font-bold ${className}`} {...props} />;
};

