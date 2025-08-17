import * as React from "react";

export function Panel({ children, className, ...rest }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`border border-gray-200 rounded-md bg-white ${className ?? ""}`} {...rest}>
      {children}
    </div>
  );
}
export function PanelHeader({ children }: { children: React.ReactNode }) {
  return <div className="px-3 py-2 border-b font-medium">{children}</div>;
}
export function IconButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...props} className={"p-1 rounded hover:bg-gray-100 " + (props.className ?? "")} />;
}
export function InputField({ label, ...input }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block space-y-1">
      <span className="text-xs text-gray-600">{label}</span>
      <input {...input} className={"w-full border rounded px-2 py-1 " + (input.className ?? "")}/>
    </label>
  );
}
