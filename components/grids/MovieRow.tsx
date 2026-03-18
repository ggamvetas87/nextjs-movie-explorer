type MovieRowProps = {
  title?: string;
  children?: React.ReactNode;
};

export default function MovieRow({ title, children }: MovieRowProps) {
    return (
        <section className="mb-10">
            {title && <h2 className="text-xl font-bold mb-4">
                {title}
            </h2>}
            {children}
        </section>
    );
}
