import clsx from "clsx";

type HeadingProps = {
    as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    size?: "xl" | "lg" | "md" | "sm";
    children: React.ReactNode;
    className?: string;
};

export function Heading({ as: Comp = "h1", size = "lg", children, className }) {
    return (
        <Comp
            className={clsx(
                "font-semibold leading-tight tracking-tight md:leading-tight",
                size === "xl" && "text-5xl md:text-7xl",
                size === "lg" && "text-4xl md:text-5xl",
                size === "md" && "text-3xl md:text-4xl",
                size === "sm" && "text-xl md:text-2xl",
                className
            )}
        >
            {children}
        </Comp>
    );
}
