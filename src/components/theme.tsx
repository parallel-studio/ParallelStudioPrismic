"use client";

import { useLayoutEffect } from "react";

import { useTheme } from "@/context/theme";

type ThemeComponentProps = {
  theme: string;
};

export const ThemeComponent = ({ theme }: ThemeComponentProps) => {
  const { setTheme } = useTheme();

  useLayoutEffect(() => {
    setTheme({ color: theme });
  }, [setTheme, theme]);

  return null;
};
