import { twMerge } from "tailwind-merge";

export default function Textbox({
  label,
  value,
  type = "text",
  placeholder,
  styles,
  onChange
}: {
  label?: string;
  value: string;
  type?: "text" | "password" | "email" | "number" | "search" | "tel";
  placeholder?: string;
  styles?: {
    container?: string;
    input?: string;
    label?: string;
  };
  onChange: (val: string) => void;
}) {
  return (
    <div className={twMerge("w-full", styles?.container)}>
      {label && <label className={twMerge("block text-sm font-medium text-gray-700", styles?.label)}>{label}</label>}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={twMerge("block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm", styles?.input)}
      />
    </div>
  );
}