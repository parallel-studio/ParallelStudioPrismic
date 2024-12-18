"use client";

import { useEffect } from "react";

import { useTheme } from "@/context/theme";

type ThemeComponentProps = {
    theme: string;
};

export const ThemeComponent = ({ theme }: ThemeComponentProps) => {
    const { setTheme } = useTheme();

    useEffect(() => {
        setTheme({ color: theme });
    }, [setTheme, theme]);
};
