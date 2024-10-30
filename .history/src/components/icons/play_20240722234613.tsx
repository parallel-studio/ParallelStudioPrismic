import * as React from "react";
import { SVGProps } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgComponent = ({
    title,
    titleId,
    ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 2.2360000610351562 8.25 9.527999877929688"
            preserveAspectRatio="xMidYMid meet"
            fill="none"
            aria-labelledby={titleId}
            {...props}
        >
            {title ? <title id={titleId}>{title}</title> : null}
            <path fill="currentColor" d="m11 7-8.25 4.764V2.236L11 7Z" />
        </svg>
    );
};
export { SvgComponent as Play };
