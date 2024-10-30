"use client";

import { FC } from "react";

import { useMegaHeroApi } from "./context-hero";

type MegaHeroInfoProps = {};

export const MegaHeroInfo: FC<MegaHeroInfoProps> = ({}) => {
    const { item } = useMegaHeroApi();
    return <div>balbalba</div>;
};
