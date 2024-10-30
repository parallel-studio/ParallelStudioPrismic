"use client";
import { FC, ReactNode } from "react";

import { LinkField } from "@prismicio/client";
import clsx from "clsx";
import css from "styled-jsx/css";

import { ArrowLeft } from "../icons/arrow-left";
import { ArrowRight } from "../icons/arrow-right";
import styles from "./link.module.scss";
import { LinkComponent } from "./link-component";

type LinkArrowProps = {
    link: LinkField;
    children: ReactNode;
    variant?: "back_to" | "go_to";
    size?: "small" | "medium" | "large";
    className?: string;
};

export const LinkArrow: FC<LinkArrowProps> = ({
    children,
    link,
    variant = "go_to",
    size = "large",
    className: classNameProps,
}) => {
    const { className: classNameSjsx, styles: styleds } = css.resolve`
        @use "@/styles/_media.scss" as media;
        .large {
            font-size: clamp(2rem, 2.625rem, 3.5vw);
        }
        @include media.small {
            .large {
                font-size: clamp(2rem, 2.625rem, 2.5vw);
            }
        }
    `;
    return (
        <LinkComponent
            className={clsx(
                styles.wrapper,
                styles[variant],
                styles[size],
                size,
                classNameSjsx,
                classNameProps
            )}
            field={link}
            type="web"
        >
            {styleds}
            {variant === "back_to" && <ArrowLeft />}
            {children}
            {variant === "go_to" && <ArrowRight />}
        </LinkComponent>
    );
};
