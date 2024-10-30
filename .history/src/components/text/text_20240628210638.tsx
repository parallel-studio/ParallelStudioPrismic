import { ElementType, FC, ReactNode } from "react";

import { RichTextField } from "@prismicio/client";

type TextProps = {
    children: ReactNode;
    as?: ElementType;
};
export const Text: FC<TextProps> = ({ children, as: Tag = "div" }) => {
    <Tag></Tag>;
};
