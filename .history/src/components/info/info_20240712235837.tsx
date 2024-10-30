import { CSSProperties, FC, HTMLAttributes } from "react";

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
    propsFirstColumn?: HTMLAttributes<HTMLDivElement>;
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
    propsFirstColumn,
}) => {
    if (client || expertises)
        return (
            <div className={clsx(styles.wrapper, className)}>
                {client && (
                    <div {...propsFirstColumn}>
                        <div className={clsx(styles.tag)} style={{ color }}>
                            {tags.left}
                        </div>
                        <div className={styles.client}>{client}</div>
                    </div>
                )}
                {expertises && (
                    <div>
                        <div className={clsx(styles.tag)} style={{ color }}>
                            {tags.right}
                        </div>
                        <div>{expertises}</div>
                    </div>
                )}
            </div>
        );
};