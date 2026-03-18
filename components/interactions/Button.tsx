import { twMerge } from "tailwind-merge";

export default function Button({ 
    importance="primary",
    type="button",
    disabled=false,
    className,
    onClick,
    children
}: {
    importance?: "primary" | "secondary" | "tertiary";
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    className?: string;
    onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
    children?: React.ReactNode
}) {
    const baseClasses = "cursor-pointer inline-block px-4 py-1 rounded transition-all duration-300";
    const importanceClasses = importance === "secondary"
        ? "bg-black text-white hover:bg-white hover:text-black"
        : importance === "tertiary"
        ? "bg-transparent text-white hover:text-red-500"
        : "bg-red-500 text-white hover:bg-white hover:text-black";
    const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";

    return (
        <button 
            disabled={disabled}
            type={type}
            className={twMerge(baseClasses, importanceClasses, disabledClasses, className)}
            onClick={onClick}
            aria-label={children && typeof children === "string" ? children : undefined}
            role="button"
        >
            {children}
        </button>
    );
}
