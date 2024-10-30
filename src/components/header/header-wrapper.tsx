"use client";
import { FC, ReactNode, useEffect, useRef } from "react";

import { useLayout } from "@/context/layout";

import styles from "./header.module.scss";

type HeaderProps = {
  children: ReactNode;
};

export const HeaderWrapper: FC<HeaderProps> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null);

  const { setHeader } = useLayout();

  useEffect(() => {
    if (ref.current) {
      setHeader(ref);
    }
  }, [setHeader, ref]);

  return (
    <header ref={ref} className={styles.header}>
      {children}
    </header>
  );
};
