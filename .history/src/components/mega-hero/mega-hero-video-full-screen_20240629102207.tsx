"use client";

import { FC } from "react";

import { Popup } from "../popup/popup";
import { useMegaHeroApi } from "./context-hero";
type MegaHeroVideoFullScreenProps = {};
export const MegaHeroVideoFullScreen: FC<MegaHeroVideoFullScreenProps> = () => {
    const { setIsPopupOpen, isPopupOpen } = useMegaHeroApi();
    return (
        <Popup setIsOpen={setIsPopupOpen} isOpen={isPopupOpen}>
            MegaHeroVideoFullScreen
        </Popup>
    );
};
