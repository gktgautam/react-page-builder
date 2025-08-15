import * as React from "react";

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const IconButton: React.FC<IconButtonProps> = ({ className = "", ...props }) => {
  return (
    <button
      className={`w-4 h-4 border rounded bg-gray-50 inline-flex items-center justify-center text-xs ${className}`}
      {...props}
    />
  );
};

