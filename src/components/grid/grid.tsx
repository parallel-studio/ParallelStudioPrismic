import { ElementType, FC, ReactNode } from "react";

import clsx from "clsx";

import styles from "./grid.module.scss";

export type GridProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  variant?: "small";
};

export const SmallGrid: FC<GridProps> = ({
  as: Tag = "div",
  children,
  className,
  variant = "small",
}) => {
  return <Tag className={clsx(styles[variant], className)}>{children}</Tag>;
};
