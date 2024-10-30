import { FC } from "react";

type MegaHeroInfoProps = {};
export const MegaHeroInfo: FC<MegaHeroInfoProps> = ({ title, description }) => (
    <div>
        <h2>{title}</h2>
        <p>{description}</p>
    </div>
);
