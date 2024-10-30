import { FC, ReactNode } from "react";

import clsx from "clsx";

import styles from "./container.module.scss";

type ContainerProps = {
  children: ReactNode;
  variant?: "double_column" | "screen_height";
  className?: string;
};

export const Container: FC<ContainerProps> = ({
  children,
  variant,
  className,
}) => {
  return (
    <div
      className={clsx(
        styles.wrapper,
        variant ? styles[variant] : undefined,
        className,
      )}
    >
      {children}
    </div>
  );
};
