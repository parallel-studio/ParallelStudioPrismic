import { FC, ReactNode } from "react";
type SpacerProps = {
    children: ReactNode;
};

export const Spacer: FC<SpacerProps> = ({ children }) => {
    return <div className={}>{children}</div>;
};
