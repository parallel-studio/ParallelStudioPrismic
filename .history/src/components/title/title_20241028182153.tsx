"use client"

import { ElementType, forwardRef } from "react";

import clsx from "clsx";
import css from "styled-jsx/css";

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

const ShowMore = () => {
    return (
        <>
        {" "}
        <AngleDown
            style={{ position: "relative", top: "0.33ch" }}
        />
    </>
    );
}

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

        const { className: classStyledx, styles: styleds } = css.resolve`
        ${Tag} {
            color: var(--font-color);
        }
    `;

        return (
            <Tag ref={ref} className={ clsx( className, classStyledx)}>
                {styleds}
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
                        <span>{showDescription && description && ` ${description}`}</span>
                    </>
                )}
                {showMore && (
                   <ShowMore />
                )}
            </Tag>
        );
    }
);

Title.displayName = "Title";
