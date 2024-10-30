import { FC } from "react";

import clsx from "clsx";

import styles from "./info.module.scss";

type InfoProps = {
    expertises?: string;
    client?: string;
    color?: string;
    className?: string;
};

export const Info: FC<InfoProps> = ({
    color,
    client,
    expertises,
    className,
}) => {
    return (
        <div className={clsx(styles.wrapper, className)}>
            <div>
                <div className={clsx(styles.tag)} style={{ color }}>
                    Client
                </div>
                <div className={styles.client}>{client}</div>
            </div>
            <div>
                <div className={clsx(styles.tag)} style={{ color }}>
                    Expertise
                </div>
                <div>{expertises}</div>
            </div>
        </div>
    );
};
