import { Children, ElementType, FC, ReactNode } from "react";

import { Content, isFilled } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import clsx from "clsx";

import { PageContext } from "@/app/[lang]/[uid]/page";
import { Container } from "@/components/container/container";
import { LinkArrow } from "@/components/link/link";
import { PrismicRichText } from "@/components/PrismicRichText";
import { Section } from "@/components/section/section";
import { SocialLinks } from "@/components/social-links/social-links";

import { Eyebrow } from "../eyebrow/eyebrow";
import styles from "./grid.module.scss";

export type GridProps = {
    as?: ElementType;
    children: ReactNode;
    className?: string;
};

export const SmallGrid: FC<GridProps> = ({
    as: Tag = "div",
    children,
    className,
}: GridProps) => {
    return <Tag className={clsx(styles.contacts, className)}>{children}</Tag>;
};
