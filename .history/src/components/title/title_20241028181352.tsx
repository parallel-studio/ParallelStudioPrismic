import { ElementType, forwardRef } from "react";

import { AngleDown } from "../icons/angle-down";

type TitleProps = {
    as?: ElementType;
    title?: string;
    description?: string;
    color?: string;
    className?: string;
    showMore?: boolean;
    showDescription?: boolean;
    highlight?: "title" | "description";
};

export const Title = forwardRef<ElementType | HTMLHeadingElement, TitleProps>(
    (
        {
            as: Tag = "h2",
            title,
            description,
            color,
            className,
            showMore = false,
            highlight = "title",
            showDescription = true,
        },
        ref
    ) => {
        return (
            <Tag ref={ref} className={className} style={{ color }}>
                {highlight === "description" && (
                    <>
                        <span style={{ color: "var(--font-color)" }}>{title}</span>
                        {showDescription && (
                            <span style={{ color }}>{` ${description}`}</span>
                        )}
                    </>
                )}
                {highlight === "title" && (
                    <>
                        <span style={{ color }}>{title}</span>
                        <span style={{ color: "var(--font-color)" }}>{showDescription && description && ` ${description}`}</span>
                    </>
                )}
                {showMore && (
                    <>
                        {" "}
                        <AngleDown
                            style={{ position: "relative", top: "0.33ch" }}
                        />
                    </>
                )}
            </Tag>
        );
    }
);

Title.displayName = "Title";
