import React from "react";

type MegaHeroProps = {
    title: string;
    subtitle: string;
    image: string;
};

const MegaHero: React.FC<MegaHeroProps> = ({ title, subtitle, image }) => {
    return (
        <div className="mega-hero">
            <img src={image} alt="Mega Hero" className="mega-hero__image" />
            <div className="mega-hero__content">
                <h1 className="mega-hero__title">{title}</h1>
                <p className="mega-hero__subtitle">{subtitle}</p>
            </div>
        </div>
    );
};

export default MegaHero;
