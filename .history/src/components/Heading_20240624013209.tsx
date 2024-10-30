import clsx from "clsx";

type HeadingProps = {
    as?: keyof JSX.IntrinsicElements;
    size?: "xl" | "lg" | "md" | "sm";
    children: React.ReactNode;
    className?: string;
};

export function Heading({
    as: Comp = "h1",
    size = "lg",
    children,
    className,
}: HeadingProps) {
    return <>Heading</>;
}
