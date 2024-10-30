import { FC, ReactNode } from "react";

import clsx from "clsx";

import styles from "./mega-hero.module.scss";

type MegaHeroCarouselProps = {
    children: ReactNode;
};

export const MegaHeroCarousel: FC<MegaHeroCarouselProps> = ({ children }) => {
    return <div className={clsx(styles.carousel)}>{children}</div>;
};