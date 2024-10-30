import { FC } from "react";

import styles from "./text-with-image.module.scss";
type TextWithImageProps = {};

export const TextWithImageComponent: FC<TextWithImageProps> = ({}) => {
    return <div className={styles.wrapper}></div>;
};
