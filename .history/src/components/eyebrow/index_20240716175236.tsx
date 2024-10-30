import { ElementType, FC, ReactNode } from "react";

type EyebrowProps = {
    as?: ElementType;
    children: ReactNode;
};

export const Eyebrow: FC<EyebrowProps> = ({ as: Tag = "div", children }) => {
    return <Tag>{children}</Tag>;
};
