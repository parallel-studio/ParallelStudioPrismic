import { FC, ReactNode } from "react";

import { LinkField } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";

type LinkComponentProps = {
    children: ReactNode;
    field: LinkField;
    className?: string;
};

export const LinkComponent: FC<LinkComponentProps> = ({
    children,
    className,
    field,
}) => {
    return (
        <PrismicNextLink className={className} field={field} prefetch>
            {children}
        </PrismicNextLink>
    );
};
