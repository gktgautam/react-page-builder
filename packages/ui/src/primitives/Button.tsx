import * as React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export const Button: React.FC<ButtonProps> = ({ variant = "primary", className = "", ...props }) => {
  const base = "px-3 py-2 rounded border";
  const styles =
    variant === "primary"
      ? "bg-blue-600 text-white border-blue-700"
      : "bg-white text-gray-900 border-gray-300";
  return <button className={`${base} ${styles} ${className}`} {...props} />;
};
