import Link from "next/link";

export default function CustomLink({ 
    href,
    target="_self",
    type="link",
    className,
    children
}: { 
    href: string;
    target?: string;
    type?: "link" | "button";
    className?: string;
    children: React.ReactNode
}) {
    const baseClasses = type === "button"
        ? "inline-block bg-red-500 text-white px-4 py-2 rounded hover:bg-white hover:text-black transition-all duration-300"
        : "hover:text-red-500 transition-all duration-300";
    return (
        <Link target={target} href={href} className={`${baseClasses} ${className}`}>
            {children}
        </Link>
    );
}
