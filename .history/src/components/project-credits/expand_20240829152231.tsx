"use client";
import { FC, ReactElement, ReactNode, useEffect } from "react";

type ExpandProps = {
    element: ReactElement;
};

export const Expand: FC<ExpandProps> = ({ element }) => {
    useEffect(() => {
        console.log("Expand component mounted");

        return () => {
            console.log("Expand component unmounted");
        };
    }, []);

    return <></>;
};
