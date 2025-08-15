import * as React from "react";

export interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const InputField: React.FC<InputFieldProps> = ({ className = "", ...props }) => {
  return <input className={`w-full border rounded px-2 py-1 text-sm ${className}`} {...props} />;
};

