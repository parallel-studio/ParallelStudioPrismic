"use client";
import { forwardRef, ReactNode } from "react";

import { isFilled } from "@prismicio/client";
import { PrismicNextLink, PrismicNextLinkProps } from "@prismicio/next";
import clsx from "clsx";
import { usePathname } from "next/navigation";

type LinkComponentProps = {
    children: ReactNode;
} & PrismicNextLinkProps;

export const LinkComponent = forwardRef<HTMLAnchorElement, LinkComponentProps>(
    ({ children, field, className, ...rest }, ref) => {
        const path = usePathname();

        if (isFilled.link(field))
            return (
                <PrismicNextLink
                    ref={ref}
                    className={clsx(className)}
                    field={field}
                    aria-current={path === field.url ? "page" : undefined}
                    type={field.link_type}
                    {...(rest as any)}
                >
                    {children}
                </PrismicNextLink>
            );
    }
);

LinkComponent.displayName = "LinkComponent";
