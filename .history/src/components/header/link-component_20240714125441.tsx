"use client";
import { FC, ReactNode } from "react";

import { isFilled, LinkField } from "@prismicio/client";
import { PrismicNextLink, PrismicNextLinkProps } from "@prismicio/next";
import { usePathname } from "next/navigation";

type LinkComponentProps = {
    children: ReactNode;
    field: Required<LinkField>;
    className?: string;
    props?: Omit<Partial<PrismicNextLinkProps>, "field">;
};

export const LinkComponent: FC<LinkComponentProps> = ({
    children,
    className,
    field,
    props,
}) => {
    const path = usePathname();

    if (isFilled.link(field))
        return (
            <PrismicNextLink
                className={className}
                field={field}
                aria-current={path === field.url ? "page" : undefined}
                {...props}
            >
                {children}
            </PrismicNextLink>
        );
};
