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
}: SVGProps<SVGSVGElement> & SVGRProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="-3 0 28 28"
        aria-labelledby={titleId}
        {...props}
    >
        {title === undefined ? (
            <title id={titleId}>{"play"}</title>
        ) : title ? (
            <title id={titleId}>{title}</title>
        ) : null}
        <path
            fill="currentColor"
            fillRule="evenodd"
            d="M21.415 12.554 2.418.311C1.291-.296 0-.233 0 1.946v24.108c0 1.992 1.385 2.306 2.418 1.635l18.997-12.243a2.076 2.076 0 0 0 0-2.892"
        />
    </svg>
);
export { SvgComponent as Play };
