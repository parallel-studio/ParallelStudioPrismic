import { FC } from "react";

import { Content } from "@prismicio/client";
import Link from "next/link";

import styles from "./header.module.scss";
type HeaderProps = {
    navigation: Content.NavigationDocument;
    settings: Content.SettingsDocument;
};

export const Header: FC<HeaderProps> = ({ navigation, settings }) => {
    return (
        <header className={styles.header}>
            <svg
                width="117"
                height="15"
                viewBox="0 0 117 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g clip-path="url(#clip0_784_325)">
                    <path
                        d="M2.58649 7.31834H3.64453C5.2485 7.31834 6.05048 6.68425 6.05048 5.41605C6.05048 4.04099 5.27507 3.45677 3.4851 3.45677H2.58649V7.31834ZM2.58649 14.5H0.013855V1.19824H3.97064C5.52871 1.19824 6.86938 1.5331 7.70277 2.57331C8.36301 3.38005 8.71665 4.3878 8.70283 5.42318C8.70283 7.89544 7.20998 9.56974 4.25326 9.56974H2.58649V14.5Z"
                        fill="#000105"
                    />
                    <path
                        d="M21.9211 9.44148L19.9572 4.52545L17.9208 9.44148H21.9211ZM22.769 11.5789H17.0729L15.7975 14.5H12.8987L18.9571 0.5H20.9935L26.8707 14.5H23.9719L22.769 11.5789Z"
                        fill="#000105"
                    />
                    <path
                        d="M35.4437 7.31834H36.1684C37.8497 7.31834 38.6903 6.64862 38.6903 5.28781C38.6903 3.927 37.8642 3.2929 36.1974 3.2929H35.4437V7.31834ZM42.5239 14.5H39.386L35.7626 9.15651H35.4292V14.5H32.8638V1.19824H36.7047C39.8788 1.19824 41.3861 2.82267 41.3861 5.13107C41.3861 7.23285 40.3861 8.47967 38.3714 8.88577L42.5239 14.5Z"
                        fill="#000105"
                    />
                    <path
                        d="M56.6625 9.44148L54.6986 4.52545L52.6622 9.44148H56.6625ZM57.5104 11.5789H51.8143L50.5389 14.5H47.6401L53.6985 0.5H55.7349L61.6193 14.5H58.7206L57.5104 11.5789Z"
                        fill="#000105"
                    />
                    <path
                        d="M101.47 3.46385H96.4622V6.40634H101.281V8.65061H96.4622V12.2628H101.47V14.5071H93.7374V1.20532H101.47V3.46385Z"
                        fill="#000105"
                    />
                    <path
                        d="M112.789 1.20532V12.2628H116.927V14.5071H110.166V1.20532H112.789Z"
                        fill="#000105"
                    />
                    <path
                        d="M67.6487 14.5L70.8881 1.20532H73.4462L70.2069 14.5071L67.6487 14.5Z"
                        fill="black"
                    />
                    <path
                        d="M79.2582 14.5L82.8526 1.35498H85.6861L82.0917 14.5071L79.2582 14.5Z"
                        fill="black"
                    />
                </g>
                <defs>
                    <clipPath id="clip0_784_325">
                        <rect
                            width="116.941"
                            height="14"
                            fill="white"
                            transform="translate(0 0.5)"
                        />
                    </clipPath>
                </defs>
            </svg>
            <ul className={styles.nav}>
                {navigation.data.links.map((link, index) => {
                    return (
                        <li key={index}>
                            <Link url={link.link}>
                                {link.label as any as string}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </header>
    );
};