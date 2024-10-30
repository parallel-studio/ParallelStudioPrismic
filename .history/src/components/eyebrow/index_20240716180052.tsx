import { ElementType, FC, ReactNode } from "react";

import clsx from "clsx";

import styles from "./eyebrow.module.scss";

type EyebrowProps = {
    as?: ElementType;
    children: ReactNode;
    className?: string;
    theme?: "light" | "dark";
};

export const Eyebrow: FC<EyebrowProps> = ({
    as: Tag = "div",
    children,
    className,
}) => {
    return (
        <Tag className={clsx(styles.links_title, className)}>{children}</Tag>
    );
};
