import { ElementType, FC, ReactNode } from "react";

import styles from "./text-with-image.module.scss";
type TextWithImageProps = {
    children: ReactNode;
    as?: ElementType;
    classname?: string;
    variant?: "hero";
};

export const TextWithImageComponent: FC<TextWithImageProps> = ({}) => {
    return <div className={styles.wrapper}></div>;
};
