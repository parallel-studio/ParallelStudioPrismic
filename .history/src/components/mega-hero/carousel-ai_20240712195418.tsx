"use client";

import React, { useRef, useEffect, FC } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ItemWithMuxData } from ".";
import { MegaHeroItemClient } from "./mega-hero-item-client";
import { MegaHeroItemClientMobile } from "./mega-hero-item-client-mobile";
import Draggable from "gsap/Draggable";

import styles from "./mega-hero.module.scss";
import { MegaHeroItemClientGsap } from "./mega-hero-item-client-gsap";
gsap.registerPlugin(ScrollTrigger, Draggable);

type CarouselAiProps = {
    items: ItemWithMuxData[];
};

export const CarouselAi: FC<CarouselAiProps> = ({ items }) => {
    const carouselRef = useRef<HTMLDivElement>(null);

    return (
        <div className={styles.carousel}>
            <div ref={carouselRef} className={styles.carousel_wrapper}>
                {items.map((item, index) => (
                    <MegaHeroItemClientGsap
                        key={index}
                        item={item}
                        container={carouselRef}
                    />
                ))}
            </div>
        </div>
    );
};
