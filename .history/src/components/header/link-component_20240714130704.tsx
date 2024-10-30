"use client";
import { forwardRef, HTMLAttributes, ReactNode } from "react";

import { isFilled, LinkField } from "@prismicio/client";
import { PrismicNextLink, PrismicNextLinkProps } from "@prismicio/next";
import { usePathname } from "next/navigation";

type LinkComponentProps = {
    children: ReactNode;
    field: Required<LinkField>;
    className?: string;
} & Partial<Omit<PrismicNextLinkProps, "href" | "field">>;

export const LinkComponent = forwardRef<HTMLAnchorElement, LinkComponentProps>(
    ({ children, className, field, ...rest }, ref) => {
        const path = usePathname();

        if (isFilled.link(field))
            return (
                <PrismicNextLink
                    ref={ref}
                    className={className}
                    field={field}
                    aria-current={path === field.url ? "page" : undefined}
                    {...(rest as any)}
                >
                    {children}
                </PrismicNextLink>
            );
    }
);

LinkComponent.displayName = "LinkComponent";