"use client";

import { FC, ReactNode } from "react";

import clsx from "clsx";

import { useLayout } from "@/lib/mobile-layout";

import { ItemWithMuxData } from ".";
import styles from "./mega-hero.module.scss";
import { MegaHeroItemClient } from "./mega-hero-item-client";
import { useMegaHeroMotion } from "./useMegaHeroMotion";

import "swiper/scss";

type MegaHeroCarouselProps = {
    placeholder: ReactNode;
    items?: ItemWithMuxData[];
};

export const MegaHeroCarouselMotion: FC<MegaHeroCarouselProps> = ({
    placeholder,
    items,
}) => {
    const { scope } = useMegaHeroMotion({});
    const { isMobileLayoutActive } = useLayout();

    return (
        <div
            className={clsx(
                styles.carousel,
                isMobileLayoutActive
                    ? styles.carousel_mobile
                    : styles.carousel_desktop
            )}
        >
            <div className={clsx(styles.carousel_wrapper)} ref={scope}>
                {items?.map((item, index) => (
                    <MegaHeroItemClient
                        key={index}
                        item={item}
                        container={scope}
                    />
                ))}
            </div>
            {/* {!isMobileLayoutActive && (
                <div className={clsx(styles.carousel_wrapper)} ref={scope}>
                    {items?.map((item, index) => (
                        <MegaHeroItemClient
                            key={index}
                            item={item}
                            container={scope}
                        />
                    ))}
                </div>
            )} */}
            {placeholder}

            {isMobileLayoutActive && (
                <>
                    {items?.map((item, index) => (
                        <MegaHeroItemClient
                            container={scope}
                            key={index}
                            item={item}
                            variant="mobile"
                        />
                    ))}
                    {placeholder}
                </>
            )}
        </div>
    );
};
