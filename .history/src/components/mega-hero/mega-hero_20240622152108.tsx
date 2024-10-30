"use client";

import { FC, useRef } from "react";

import clsx from "clsx";

import { MegaHeroSlice } from "../../../prismicio-types";
import { MegaHeroProvider } from "./context-hero";
import styles from "./mega-hero.module.scss";
import { MegaHeroHeader } from "./mega-hero-header";
import { MegaHeroInfo } from "./mega-hero-info";
import { MegaHeroItem } from "./mega-hero-item";
import { useMegaHero } from "./useMegaHero";

type MegaHeroProps = {
    slice: MegaHeroSlice;
};

  export  const MegaHeroComponent: FC<MegaHeroProps> = ({ slice }) => {
        const {
            primary: { slogan, items },
        } = slice;
        const wrapperRef = useRef<HTMLUListElement>(null);
       
       const {isMounted} = useMegaHero({ wrapperRef });
        console.log(slice);

        return (
            <MegaHeroProvider>
                <div className={styles.mega}>
                    <MegaHeroHeader slogan={slogan} />
                    <div>
                        <MegaHeroInfo />
                        <div className={styles.carousel}>
                            <ul
                                className={styles.carousel_wrapper}
                                ref={wrapperRef}
                                style={{ opacity: isMounted ? 1 : 0 }}
                            >
                                {items.map((item, index) => (
                                    <MegaHeroItem key={index} item={item} />
                                ))}
                                <li className={clsx(styles.end)}>
                                    <a href="/#">
                                        <span>{"SEE ALL"}</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </MegaHeroProvider>
        );
    };
};
