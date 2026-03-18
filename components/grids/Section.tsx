import { twMerge } from "tailwind-merge";

type SectionProps = {
  title?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
};

export default function Section({ title, className, children, style }: SectionProps) {
    return (
        <section className={twMerge("w-full mb-10", className)} style={style}>
            {title && <h2 className="text-xl font-bold mb-4">
                {title}
            </h2>}
            {children}
        </section>
    );
}
