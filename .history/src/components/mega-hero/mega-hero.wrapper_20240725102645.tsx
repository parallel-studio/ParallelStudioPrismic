"client only";

import { FC, ReactNode } from "react";

import styles from "./mega-hero.module.scss";

type MegaHeroProps = {
    children: ReactNode;
};
export const MegaHeroComponent: FC<MegaHeroProps> = ({ children }) => {
    return <div className={styles.mega}>{children}</div>;
};
