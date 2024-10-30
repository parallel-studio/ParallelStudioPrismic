"use client";
import { FC, ReactNode } from "react";

import { LinkField, isFilled } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { usePathname } from "next/navigation";

type LinkComponentProps = {
    children: ReactNode;
    field: Required<LinkField>;
    className?: string;
};

export const LinkComponent: FC<LinkComponentProps> = ({
    children,
    className,
    field,
}) => {
    const path = usePathname();

    if (isFilled.link(field))
        return (
            <PrismicNextLink
                className={className}
                field={field}
                aria-current={path === field}
                prefetch
            >
                {children}
            </PrismicNextLink>
        );
};
