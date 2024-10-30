"client only";

import { FC, ReactNode } from "react";

import styles from "./mega-hero.module.scss";

type MegaHeroWrapperProps = {
    children: ReactNode;
};
export const MegaHeroWrapper: FC<MegaHeroWrapperProps> = ({ children }) => {
    return <div className={styles.mega}>{children}</div>;
};
