import { FC } from "react";

import clsx from "clsx";

import styles from "./info.module.scss";

type InfoProps = {
    expertises?: string;
    client?: string;
    color?: string;
    className?: string;
    tags?: {
        left?: string;
        right?: string;
    };
};

export const Info: FC<InfoProps> = ({
    color,
    client,
    expertises,
    className,
    tags = {
        left: "Client",
        right: "Expertise",
    },
}) => {
    return (
        <div className={clsx(styles.wrapper, className)}>
            <div>
                <div className={clsx(styles.tag)} style={{ color }}>
                    {tags.left}
                </div>
                <div className={styles.client}>{client}</div>
            </div>
            <div>
                <div className={clsx(styles.tag)} style={{ color }}>
                    {tags.right}
                </div>
                <div>{expertises}</div>
            </div>
        </div>
    );
};
