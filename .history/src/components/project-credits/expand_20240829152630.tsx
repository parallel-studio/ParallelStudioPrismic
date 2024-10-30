"use client";
import { FC, ReactElement, ReactNode, useEffect } from "react";

type ExpandProps = {
    element: HTMLElement;
};

export const useExpand = ({ element }: ExpandProps) => {
    useEffect(() => {
        if (element) {
            element.addEventListener("click", () => {
                console.log("Expand clicked");
            });
        }

        return () => {
            element.removeEventListener("click", () => {
                console.log("Expand clicked");
            });
        };
    }, [element]);
};
