import Link from "next/link";
import { twMerge } from "tailwind-merge";

export default function CustomLink({ 
    href,
    target="_self",
    type="link",
    className,
    onClick,
    children
}: { 
    href?: string;
    target?: string;
    type?: "link" | "button";
    className?: string;
    onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
    children: React.ReactNode
}) {
    const baseClasses = "cursor-pointer transition-all duration-300";
    const cssClasses = type === "button"
        ? `inline-block bg-red-500 text-white 
            text-sm md:text-base lg:text-base
            px-2 py-1 md:px-4 md:py-2 lg:px-4 lg:py-2 lg:px-4 lg:py-2 
            rounded hover:bg-white hover:text-black`
        : "text-red-500 hover:text-white";
    
    return (
        <Link 
            target={target}
            href={href ?? "#"} 
            rel={target === "_blank" ? "noopener noreferrer" : undefined}
            className={twMerge(baseClasses, cssClasses, className)}
            onClick={onClick}
            aria-label={typeof children === "string" ? children : undefined}
            role={type === "button" ? "button" : undefined}
        >
            {children}
        </Link>
    );
}
