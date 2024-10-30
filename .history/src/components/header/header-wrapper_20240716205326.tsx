import { FC, ReactNode } from "react";

import { asText } from "@prismicio/client";
import { PrismicText } from "@prismicio/react";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

import { createClient } from "@/prismicio";

import { LinkComponent } from "../link/link-component";
import styles from "./header.module.scss";
import { HeaderLogo } from "./header-logo";

type HeaderProps = {
    children: ReactNode;
};

export const HeaderWrapper: FC<HeaderProps> = ({ children }) => {
    return <header className={styles.header}>{children}</header>;
};
