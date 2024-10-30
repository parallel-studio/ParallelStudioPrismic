"client only";

import { FC, ReactNode } from "react";

import { useMegaHeroApi } from "./context";
import styles from "./mega-hero.module.scss";

type MegaHeroWrapperProps = {
    children: ReactNode;
};
export const MegaHeroWrapper: FC<MegaHeroWrapperProps> = ({ children }) => {
    const { setIsContainerTouched, showMobileVersion } = useMegaHeroApi();
    return <div className={styles.mega}>{children}</div>;
};
