/**
 * Adds a wrapper around children if a condition is true.
 */

import { ComponentType, ReactNode } from "react";

type ConditionalWrapProps = {
    condition: boolean;
    wrap: any;
    children: ReactNode;
};

export function ConditionalWrap({
    condition,
    wrap: Wrap,
    children,
}: ConditionalWrapProps) {
    return condition ? <Wrap>{children}</Wrap> : children;
}
