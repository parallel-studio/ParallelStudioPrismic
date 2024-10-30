import { ElementType, FC, ReactNode } from "react";

import { RichTextField } from "@prismicio/client";
import clsx from "clsx";

type TextProps = {
    children: ReactNode;
    as?: ElementType;
    classname?: string;
};
export const Text: FC<TextProps> = ({
    children,
    as: Tag = "div",
    classname,
}) => {
    return <Tag className={clsx()}>{children}</Tag>;
};
