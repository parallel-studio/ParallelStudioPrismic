"use client";
import { forwardRef, HTMLAttributes, ReactNode } from "react";

import { isFilled, LinkField } from "@prismicio/client";
import { PrismicNextLink, PrismicNextLinkProps } from "@prismicio/next";
import { usePathname } from "next/navigation";

type LinkComponentProps = {
    children: ReactNode;
    field: Required<LinkField>;
    className?: string;
    props?: PrismicNextLinkProps;
};

export const LinkComponent = forwardRef<HTMLAnchorElement, LinkComponentProps>(
    ({ children, className, field, props }, ref) => {
        const path = usePathname();

        if (isFilled.link(field))
            return (
                <PrismicNextLink
                    ref={ref}
                    className={className}
                    field={field}
                    aria-current={path === field.url ? "page" : undefined}
                    {...props}
                >
                    {children}
                </PrismicNextLink>
            );
    }
);

LinkComponent.displayName = "LinkComponent";
