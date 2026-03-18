import { twMerge } from "tailwind-merge";

export default function Button({ 
    type="button",
    importance="primary",
    className,
    onClick,
    children
}: {
    importance?: "primary" | "secondary";
    type?: "button" | "submit" | "reset";
    className?: string;
    onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
    children?: React.ReactNode
}) {
    const baseClasses = "cursor-pointer inline-block px-4 py-1 rounded transition-all duration-300";
    const importanceClasses = importance === "secondary"
        ? "bg-black text-white hover:bg-white hover:text-black"
        : "bg-red-500 text-white hover:bg-white hover:text-black";

    return (
        <button 
            type={type}
            className={twMerge(baseClasses, importanceClasses, className)}
            onClick={onClick}
            aria-label={children && typeof children === "string" ? children : undefined}
            role="button"
        >
            {children}
        </button>
    );
}
