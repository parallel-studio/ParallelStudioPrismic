import { ElementType, FC, ReactNode } from "react";

import clsx from "clsx";

import styles from "./spacer.module.scss";

type Spacing = "small" | "medium" | "big";

type SpacerProps = {
  children?: ReactNode;
  as?: ElementType;
  spacing?: Spacing;
};

export const Spacer: FC<SpacerProps> = ({
  children,
  as: Tag = "div",
  spacing,
}) => {
  return (
    <Tag
      className={clsx(styles.wrapper, spacing ? styles[spacing] : undefined)}
    >
      {children}
    </Tag>
  );
};
